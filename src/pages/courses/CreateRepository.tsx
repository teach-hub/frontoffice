import {
  Flex,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import InputField from 'components/InputField';
import useToast from 'hooks/useToast';
import PageDataContainer from 'components/PageDataContainer';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import Table from 'components/Table';
import { theme } from 'theme';
import { Checkbox } from 'components/Checkbox';
import CourseCreateRepositoryQueryDef from 'graphql/CourseCreateRepositoryQuery';
import CreateRepositoryMutationDef from 'graphql/CreateRepositoryMutation';
import {
  CourseCreateRepositoryQuery,
  CourseCreateRepositoryQuery$data,
} from '__generated__/CourseCreateRepositoryQuery.graphql';
import { filterUsers, UserRoleFilter } from 'app/users';
import { useUserContext } from 'hooks/useUserCourseContext';
import {
  CreateRepositoryMutation,
  CreateRepositoryMutation$data,
} from '__generated__/CreateRepositoryMutation.graphql';
import { IdBadgeIcon, MortarBoardIcon } from '@primer/octicons-react';
import Button from 'components/Button';
import Text from 'components/Text';
import { removeAccentsAndSpecialCharacters } from 'utils/strings';
import { Modal } from 'components/Modal';
import { FormControl } from 'components/FormControl';
import CheckboxGroup from 'components/CheckboxGroup';
import { ButtonWithIcon } from 'components/ButtonWithIcon';

type RepositoriesNameConfiguration = {
  prefix: string;
  useLastName: boolean;
  useFile: boolean;
  useGroupName: boolean;
};

const enum TeacherRepositoryRole {
  Admin = 'Admin',
  Maintain = 'Maintain',
}

interface SelectedRoles {
  [userId: string]: TeacherRepositoryRole;
}

/**
 * Value of the type of repositories to configure
 * the page for
 * */
export enum RepositoryType {
  Students = 'students',
  Groups = 'groups',
}

/**
 * Props required for a row in the table
 * to select repositories to create
 *
 * @param id: unique id of the row
 * @param rowData: data to display in the row, does not include checkbox.
 * May either be a string or any react component
 * @param checked: whether the checkbox is checked or not
 * @param getStudentIds: function to get the ids of the students to create the repositories for
 * @param getRepoName: function to get the name that the repository will have, based
 * on the given configuration
 * */
interface SelectionTableRowProps {
  id: string;
  rowData: (React.JSX.Element | string)[];
  checked: boolean;
  getStudentIds: () => string[];
  getRepoName: (repositoryConfiguration: RepositoriesNameConfiguration) => string;
}

/**
 * Props required for a row in the table
 * to select repositories to create for students
 * */
interface StudentSelectionTableRowProps extends SelectionTableRowProps {
  userId: string;
  name: string;
  lastName: string;
  file: string;
}

interface GroupParticipantData {
  userId: string;
  name: string;
  lastName: string;
  file: string;
}

/**
 * Props required for a row in the table
 * to select repositories to create for groups
 * */
interface GroupSelectionTableRowProps extends SelectionTableRowProps {
  groupName: string;
  groupId: string;
  participants: GroupParticipantData[];
}

type CourseType = NonNullable<
  NonNullable<CourseCreateRepositoryQuery$data['viewer']>['course']
>;
type UserRoleType = NonNullable<CourseType['userRoles']>[number];
type AssignmentType = NonNullable<CourseType['assignments']>[number];
type GroupUserType = NonNullable<
  NonNullable<AssignmentType['groupParticipants']>[number]['user']
>;

interface GroupUsersData {
  groupId: string;
  groupName: string;
  users: GroupUserType[];
}

/**
 * Configuration for the page to create repositories.
 * May differ from students or groups, so a different configuration
 * should be created for each
 *
 * @param tableHeaders: headers of the table, must not include checkbox
 * @param tableRowData: data for each row of the table
 * */
interface RepositoriesTypePageConfiguration {
  tableHeaders: string[];
  tableRowData: SelectionTableRowProps[];
}

const buildStudentRepositoryPageConfiguration = ({
  students,
}: {
  students: UserRoleType[];
}): RepositoriesTypePageConfiguration => {
  return {
    tableHeaders: ['Alumno', 'Padrón'],
    tableRowData: students
      .map(
        (student): StudentSelectionTableRowProps => ({
          id: student.user.file,
          rowData: [
            student.user.lastName + `, ${student.user.name}`, // FullName
            student.user.file, // File
          ],
          checked: true,
          userId: student.user.id,
          lastName: student.user.lastName,
          name: student.user.name,
          file: student.user.file,
          getStudentIds: () => [student.user.id],
          getRepoName: (repositoryData: RepositoriesNameConfiguration) => {
            const { prefix, useLastName, useFile } = repositoryData;

            const repoName = [
              prefix || null,
              useLastName ? student.user.lastName : null,
              useFile ? student.user.file : null,
            ]
              .filter(item => item !== null)
              .join('_')
              .toLowerCase();

            return removeAccentsAndSpecialCharacters(repoName);
          },
        })
      )
      .sort((a, b) => a.lastName.localeCompare(b.lastName)), // Sort alphabetically
  };
};

const buildGroupRepositoryPageConfiguration = ({
  groupUsersDataList,
}: {
  groupUsersDataList: GroupUsersData[];
}): RepositoriesTypePageConfiguration => {
  const tableRowData: GroupSelectionTableRowProps[] = groupUsersDataList
    .map(groupUsersData => {
      const { groupId, groupName, users } = groupUsersData;

      /* Create stack to view better spaced */
      const usersRowData = (
        <Stack>
          {users
            .map((user): string => `${user.lastName}, ${user.name} (${user.file})`)
            .sort((a: string, b: string) => a.localeCompare(b)) // Sort users alphabetically
            .map((userData: string) => (
              <Text>{userData}</Text>
            ))}
        </Stack>
      );

      return {
        groupId: groupId,
        groupName: groupName,
        participants: users.map(user => ({
          userId: user.id,
          name: user.name,
          lastName: user.lastName,
          file: user.file,
        })),
        rowData: [groupName, usersRowData],
        checked: true,
        id: groupId,
        getStudentIds: () => users.map(user => user.id),
        getRepoName: (repositoryData: RepositoriesNameConfiguration) => {
          const { prefix, useLastName, useFile, useGroupName } = repositoryData;

          const lastNames = useLastName
            ? users.map(user => user.lastName).join('_')
            : null;
          const files = useFile ? users.map(user => user.file).join('_') : null;
          const repoName = [
            prefix || null,
            useGroupName ? groupName : null,
            lastNames,
            files,
          ]
            .filter(item => item !== null)
            .join('_')
            .toLowerCase();

          return removeAccentsAndSpecialCharacters(repoName);
        },
      };
    })
    .sort((a: GroupSelectionTableRowProps, b: GroupSelectionTableRowProps) =>
      a.groupName.localeCompare(b.groupName)
    ); // Sort by group names

  return {
    tableHeaders: ['Grupo', 'Alumnos'],
    tableRowData,
  };
};

const CreateRepositoryPage = ({ type }: { type: RepositoryType }) => {
  const { courseId } = useUserContext();
  const { assignmentId } = useParams();

  const navigate = useNavigate();
  const toast = useToast();
  const {
    isOpen: isOpenTeachersModal,
    onOpen: onOpenTeachersModal,
    onClose: onCloseTeachersModal,
  } = useDisclosure();

  const {
    isOpen: isOpenRepoNamesConfigurationModal,
    onOpen: onOpenRepoNamesConfigurationModal,
    onClose: onCloseRepoNamesConfigurationModal,
  } = useDisclosure();

  const courseQueryData = useLazyLoadQuery<CourseCreateRepositoryQuery>(
    CourseCreateRepositoryQueryDef,
    {
      courseId: courseId || '',
      assignmentId: assignmentId || '',
    }
  );

  const [commitCreateRepositoryMutation] = useMutation<CreateRepositoryMutation>(
    CreateRepositoryMutationDef
  );

  const course = courseQueryData.viewer?.course;
  const courseOrganization = course?.organization;
  const selectedAssignment = course?.assignments[0]; // Expect only one assignment

  const students = filterUsers({
    users: course?.userRoles || [],
    roleFilter: UserRoleFilter.Student,
  });

  const teachers = filterUsers({
    users: course?.userRoles || [],
    roleFilter: UserRoleFilter.Teacher,
  });

  const getInitialRoles = (): SelectedRoles => {
    const initialRoles: SelectedRoles = {};

    teachers.forEach(teacher => {
      initialRoles[teacher.user.id] = TeacherRepositoryRole.Admin;
    });

    return initialRoles;
  };

  const [selectedRoles, setSelectedRoles] = useState<SelectedRoles>(getInitialRoles());

  const groupDataById = new Map<string, GroupUsersData>();
  selectedAssignment?.groupParticipants?.forEach(participant => {
    const groupId = participant.group?.id;
    const groupData = groupDataById.get(groupId);
    if (!groupData) {
      groupDataById.set(groupId, {
        groupId: groupId,
        groupName: participant.group.name || '-',
        users: [],
      });
    }
    groupDataById.get(groupId)?.users.push(participant.user);
  });

  const getPageConfiguration = (): RepositoriesTypePageConfiguration => {
    return type === RepositoryType.Students
      ? buildStudentRepositoryPageConfiguration({ students })
      : buildGroupRepositoryPageConfiguration({
          groupUsersDataList: Array.from(groupDataById.values()),
        });
  };

  const [pageConfiguration, setPageConfiguration] =
    useState<RepositoriesTypePageConfiguration>(getPageConfiguration());

  const [tableData, setTableData] = useState<SelectionTableRowProps[]>(
    pageConfiguration.tableRowData
  );

  const initialRepositoryNameConfiguration: RepositoriesNameConfiguration = {
    prefix: '',
    useLastName: true,
    useGroupName: true,
    useFile: true,
  };
  const [repositoryNameConfiguration, setRepositoryNameConfiguration] =
    useState<RepositoriesNameConfiguration>(initialRepositoryNameConfiguration);

  const exampleRepositoryName = (): string => {
    return tableData.length > 0
      ? tableData[0].getRepoName(repositoryNameConfiguration) // Use first item of the table as example
      : '';
  };
  const errorInRepositoryName = exampleRepositoryName() === '';

  /**
   * When type changes (go from students to groups or vice-versa)
   * state of the page must be cleared, in order to view configuration
   * as if it was the first time the page is loaded
   * */
  useEffect(() => {
    const newPageConfiguration = getPageConfiguration();
    setPageConfiguration(newPageConfiguration);
    setTableData(newPageConfiguration.tableRowData);
    setRepositoryNameConfiguration(initialRepositoryNameConfiguration);
    setSelectedRoles(getInitialRoles());
  }, [type]);

  const handleRoleChange = (userId: string, value: TeacherRepositoryRole) => {
    setSelectedRoles(prevState => ({
      ...prevState,
      [userId]: value,
    }));
  };

  const SelectionTable = () => {
    const allChecked = tableData.map(i => i.checked).every(Boolean);
    const isIndeterminate = tableData.map(i => i.checked).some(Boolean) && !allChecked;

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      const updatedData = tableData.map(row => ({
        ...row,
        checked,
      }));
      setTableData(updatedData);
    };

    const handleRowCheck = (rowId: string, checked: boolean) => {
      const updatedData = tableData.map(row =>
        row.id === rowId ? { ...row, checked } : row
      );
      setTableData(updatedData);
    };

    return (
      <Table
        tableHeight={'70vh'}
        tableWidth={'50vw'}
        headers={[
          ...pageConfiguration.tableHeaders,
          <Checkbox
            id={'allChecked'}
            size={'lg'}
            borderColor={theme.colors.teachHub.white}
            bg={undefined} // Use default
            isChecked={allChecked}
            isIndeterminate={isIndeterminate}
            onChange={handleCheckAll}
          />,
        ]}
        rowOptions={tableData.map(({ checked, id, rowData }) => ({
          content: [
            ...rowData,
            <Checkbox
              id={'id'}
              isChecked={checked}
              onChange={() => handleRowCheck(id, !checked)}
            />,
          ],
        }))}
      />
    );
  };

  const onCancel = () => {
    navigate(`/courses/${courseId}`);
  };

  const onSubmit = () => {
    const repositoriesData = tableData
      .filter(row => row.checked)
      .map(row => {
        /* Check if row has group id in order to add it to request variables */
        const hasGroupId = (
          row: SelectionTableRowProps
        ): row is GroupSelectionTableRowProps => {
          return 'groupId' in row;
        };

        return {
          students: row.getStudentIds(),
          name: row.getRepoName(repositoryNameConfiguration),
          groupId: hasGroupId(row) ? row.groupId : null,
        };
      });

    if (courseId) {
      const userIds = Object.keys(selectedRoles);
      const adminUserIds = userIds.filter(
        userId => selectedRoles[userId] === TeacherRepositoryRole.Admin
      );
      const maintainUserIds = userIds.filter(
        userId => selectedRoles[userId] === TeacherRepositoryRole.Maintain
      );

      commitCreateRepositoryMutation({
        variables: {
          organization: courseOrganization || '',
          courseId,
          repositoriesData,
          admins: adminUserIds,
          maintainers: maintainUserIds,
        },
        onCompleted: (response: CreateRepositoryMutation$data, errors) => {
          if (!errors?.length) {
            const failedRepositoriesNames =
              response.createRepositories?.failedRepositoriesNames;
            if (!failedRepositoriesNames?.length) {
              // TODO: TH-136 Define what to do on success (redirect to course page?)
              toast({
                title: 'Repositorios creados!',
                status: 'info',
              });
            } else {
              toast({
                title: 'Error',
                description: `Se encontraron errores creando los repositorios: ${failedRepositoriesNames.join(
                  ', '
                )}`,
                status: 'error',
              });
            }
          } else {
            toast({
              title: 'Error',
              description: `No ha sido posible crear los repositorios`,
              status: 'error',
            });
          }
        },
      });
    } else {
      throw new Error('No courseId');
    }
  };

  const createButtonIsDisabled = () => {
    return (
      !courseOrganization ||
      errorInRepositoryName ||
      tableData.map(row => row.checked).every(checked => !checked)
    );
  };

  return (
    <PageDataContainer>
      <Heading>{`Crear Repositorios | ${selectedAssignment?.title}`}</Heading>{' '}
      <Flex justifyContent={'space-between'} paddingY={'20px'}>
        <Flex direction={'column'} gap={'30px'} width={'500px'}>
          <Text whiteSpace="pre-wrap">
            {'Indicar la configuración de los repositorios a crear y seleccionar a ' +
              'quienes se les crearán sus repositorios en la organización del curso para ' +
              'el trabajo práctico elegido.\n\n'}
          </Text>

          <ButtonWithIcon
            onClick={onOpenTeachersModal}
            text={'Configurar rol de profesores'}
            icon={MortarBoardIcon}
          />

          <ButtonWithIcon
            onClick={onOpenRepoNamesConfigurationModal}
            text={'Configurar nombre repositorios'}
            icon={IdBadgeIcon}
          />

          <FormControl
            label={'Ejemplo nombre repositorio'}
            isInvalid={errorInRepositoryName}
            errorMessage={
              'No es posible crear repositorios sin nombre, revisar configuración'
            }
          >
            <InputField
              id={'exampleRepositoryName'}
              value={exampleRepositoryName()}
              type={'text'}
              isReadOnly={true}
            />
          </FormControl>

          <FormControl
            label={'Organización de GitHub'}
            isInvalid={!courseOrganization}
            errorMessage={'Aún no se ha configurado la organización del curso'}
          >
            <InputField
              id={'organization'}
              value={courseOrganization ?? undefined}
              type={'text'}
              isReadOnly={true}
            />
          </FormControl>

          <Flex>
            <Button
              variant="ghost"
              w={'full'}
              mr={'10%'}
              onClick={onCancel}
              disabled={false}
              borderColor={theme.colors.teachHub.black}
              borderWidth="1px"
            >
              Cancelar
            </Button>
            <Button w={'full'} disabled={createButtonIsDisabled()} onClick={onSubmit}>
              Crear
            </Button>
          </Flex>
        </Flex>
        <SelectionTable />
      </Flex>
      <Modal
        isOpen={isOpenTeachersModal}
        onClose={onCloseTeachersModal}
        isCentered
        headerText={
          'Seleccione el rol que tendrá cada profesor en los repositorios a crear'
        }
      >
        <SimpleGrid columns={2} spacing={2} marginTop={'20px'}>
          {teachers.map(teacher => (
            <React.Fragment key={teacher.user.id}>
              <Text>{`${teacher.user.name} ${teacher.user.lastName}`}</Text>
              <RadioGroup
                value={selectedRoles[teacher.user.id] || ''}
                onChange={value =>
                  handleRoleChange(teacher.user.id, value as TeacherRepositoryRole)
                }
              >
                <SimpleGrid columns={2} spacing={2} alignItems="center">
                  <Radio value={TeacherRepositoryRole.Admin}>
                    {TeacherRepositoryRole.Admin}
                  </Radio>
                  <Radio value={TeacherRepositoryRole.Maintain}>
                    {TeacherRepositoryRole.Maintain}
                  </Radio>
                </SimpleGrid>
              </RadioGroup>
            </React.Fragment>
          ))}
        </SimpleGrid>
      </Modal>
      <Modal
        isOpen={isOpenRepoNamesConfigurationModal}
        onClose={onCloseRepoNamesConfigurationModal}
        isCentered
        headerText={'Configurar nombres de repositorios'}
      >
        <Stack gap={'20px'}>
          <FormControl
            helperText={'Se agregará al inicio del nombre para cada repositorio'}
            label={'Prefijo'}
          >
            <InputField
              id={'reposPrefix'}
              value={repositoryNameConfiguration.prefix}
              onChange={event =>
                setRepositoryNameConfiguration({
                  ...repositoryNameConfiguration,
                  prefix: event.target.value,
                })
              }
              placeholder={'texto_prefijo'}
              type={'text'}
            />
          </FormControl>
          <FormControl label={'Datos a incluir'}>
            <CheckboxGroup>
              <Stack spacing={[1, 5]} direction={['column', 'row']}>
                {type === RepositoryType.Groups && (
                  <Checkbox
                    id={'useGroupName'}
                    isChecked={repositoryNameConfiguration.useGroupName}
                    onChange={() =>
                      setRepositoryNameConfiguration({
                        ...repositoryNameConfiguration,
                        useGroupName: !repositoryNameConfiguration.useGroupName,
                      })
                    }
                  >
                    Nombre Grupo
                  </Checkbox>
                )}
                <Checkbox
                  id={'useLastName'}
                  isChecked={repositoryNameConfiguration.useLastName}
                  onChange={() =>
                    setRepositoryNameConfiguration({
                      ...repositoryNameConfiguration,
                      useLastName: !repositoryNameConfiguration.useLastName,
                    })
                  }
                  bg={'transparent'}
                >
                  Apellido/s
                </Checkbox>
                <Checkbox
                  id={'useFile'}
                  isChecked={repositoryNameConfiguration.useFile}
                  onChange={() =>
                    setRepositoryNameConfiguration({
                      ...repositoryNameConfiguration,
                      useFile: !repositoryNameConfiguration.useFile,
                    })
                  }
                >
                  Padrón
                </Checkbox>
              </Stack>
            </CheckboxGroup>
          </FormControl>
        </Stack>
      </Modal>
    </PageDataContainer>
  );
};

export default ({ type }: { type: RepositoryType }) => {
  return (
    <Navigation>
      <Suspense fallback={<div> Cargando... </div>}>
        <CreateRepositoryPage type={type} />
      </Suspense>
    </Navigation>
  );
};
