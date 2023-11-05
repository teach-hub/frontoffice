import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
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
import useToast, { showErrorToast } from 'hooks/useToast';
import PageDataContainer from 'components/PageDataContainer';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import Table from 'components/Table';
import { theme } from 'theme';
import { Checkbox } from 'components/Checkbox';
import CreateRepositoryMutationDef from 'graphql/CreateRepositoryMutation';
import { filterUsers, UserRoleFilter } from 'app/users';
import { useUserContext } from 'hooks/useUserCourseContext';
import {
  CreateRepositoryMutation,
  CreateRepositoryMutation$data,
} from '__generated__/CreateRepositoryMutation.graphql';
import { DotFillIcon, IdBadgeIcon, MortarBoardIcon } from '@primer/octicons-react';
import Button from 'components/Button';
import Text from 'components/Text';
import { removeAccentsAndSpecialCharacters, removeWhitespace } from 'utils/strings';
import { Modal } from 'components/Modal';
import { FormControl } from 'components/FormControl';
import CheckboxGroup from 'components/CheckboxGroup';
import { ButtonWithIcon } from 'components/ButtonWithIcon';
import AssignmentGroupsAndUsersQueryDef from 'graphql/AssignmentGroupsAndUsersQuery';
import {
  AssignmentGroupsAndUsersQuery,
  AssignmentGroupsAndUsersQuery$data,
} from '__generated__/AssignmentGroupsAndUsersQuery.graphql';
import {
  getFirstAssignmentGroupsUsersData,
  GroupUsersData,
  mapToUserNames,
} from 'app/groups';
import { SearchIcon } from '@chakra-ui/icons';
import { Nullable } from 'types';
import Spinner from 'components/Spinner';
import List from 'components/list/List';
import { TextListItem } from 'components/list/TextListItem';
import { buildCourseRoute } from 'routes';
import TeacherPage from 'components/TeacherOnlyPage';

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
  showRow: (filter: Nullable<string>) => boolean;
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
  NonNullable<AssignmentGroupsAndUsersQuery$data['viewer']>['course']
>;
type UserRoleType = NonNullable<CourseType['userRoles']>[number];

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
  tableHeadersWidth: string[];
  tableRowData: SelectionTableRowProps[];
}

/**
 * Concatenates all non--null strings received
 * and cleans the resulting string so that is a valid
 * repository name.
 *
 * It will remove access and special characters, as well
 * as limiting the lenght of the string
 * */
const joinStringsAndBuildRepoName = (data: Nullable<string>[]) => {
  const repoName = data
    .filter(item => item !== null)
    .join('_')
    .toLowerCase();

  const START_INDEX = 0;
  const END_INDEX = 100;
  return removeAccentsAndSpecialCharacters(repoName).substring(START_INDEX, END_INDEX);
};

const buildStudentRepositoryPageConfiguration = ({
  students,
}: {
  students: UserRoleType[];
}): RepositoriesTypePageConfiguration => {
  return {
    tableHeaders: ['Alumno', 'Padrón'],
    tableHeadersWidth: ['70%', '30%'],
    tableRowData: students
      .sort((a, b) => a.user.lastName.localeCompare(b.user.lastName)) // Sort alphabetically
      .map((student): StudentSelectionTableRowProps => {
        const rowData = [
          student.user.lastName + `, ${student.user.name}`, // FullName
          student.user.file, // File
        ];
        return {
          id: student.user.file,
          rowData,
          showRow: filter => {
            return filter
              ? rowData.some(value =>
                  value.toString().toLowerCase().includes(filter.toLowerCase())
                )
              : true;
          },
          checked: true,
          userId: student.user.id,
          lastName: student.user.lastName,
          name: student.user.name,
          file: student.user.file,
          getStudentIds: () => [student.user.id],
          getRepoName: (repositoryData: RepositoriesNameConfiguration) => {
            const { prefix, useLastName, useFile } = repositoryData;

            return joinStringsAndBuildRepoName([
              prefix || null,
              useLastName ? student.user.lastName : null,
              useFile ? student.user.file : null,
            ]);
          },
        };
      })
      .sort((a, b) => a.lastName.localeCompare(b.lastName)), // Sort alphabetically
  };
};

const buildGroupRepositoryPageConfiguration = ({
  groupUsersDataList,
}: {
  groupUsersDataList: GroupUsersData[];
}): RepositoriesTypePageConfiguration => {
  const tableRowData: GroupSelectionTableRowProps[] = groupUsersDataList
    .sort((a, b) => a.groupName.localeCompare(b.groupName)) // Sort alphabetically
    .map(groupUsersData => {
      const { groupId, groupName, users } = groupUsersData;

      /* Create stack to view better spaced */
      const userData = mapToUserNames(users);
      const usersRowData = (
        <Stack>
          {userData.map((userData: string) => (
            <Text>{userData}</Text>
          ))}
        </Stack>
      );

      return {
        groupId: groupId,
        groupName: groupName,
        participants: users
          .sort((a, b) => a.user.lastName.localeCompare(b.user.lastName)) // Sort alphabetically
          .map(({ user }) => ({
            userId: user.id,
            name: user.name,
            lastName: user.lastName,
            file: user.file,
          })),
        rowData: [groupName, usersRowData],
        showRow: (filter: Nullable<string>) =>
          filter
            ? groupName.toLowerCase().includes(filter.toLowerCase()) ||
              userData.some((userData: string) =>
                userData.toLowerCase().includes(filter.toLowerCase())
              )
            : true,
        checked: true,
        id: groupId,
        getStudentIds: () => users.map(({ user }) => user.id),
        getRepoName: (repositoryData: RepositoriesNameConfiguration) => {
          const { prefix, useLastName, useFile, useGroupName } = repositoryData;

          const lastNames = useLastName
            ? users.map(({ user }) => user.lastName).join('_')
            : null;
          const files = useFile ? users.map(({ user }) => user.file).join('_') : null;
          return joinStringsAndBuildRepoName([
            prefix || null,
            useGroupName ? groupName : null,
            lastNames,
            files,
          ]);
        },
      };
    })
    .sort((a: GroupSelectionTableRowProps, b: GroupSelectionTableRowProps) =>
      a.groupName.localeCompare(b.groupName)
    ); // Sort by group names

  return {
    tableHeaders: ['Grupo', 'Alumnos'],
    tableHeadersWidth: ['30%', '70%'],
    tableRowData,
  };
};

const CreateRepositoryPage = ({ type }: { type: RepositoryType }) => {
  const { courseId } = useUserContext();
  const { assignmentId } = useParams();

  const navigate = useNavigate();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

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

  const {
    isOpen: isOpenRepoGeneralConfigurationModal,
    onOpen: onOpenRepoGeneralConfigurationModal,
    onClose: onCloseRepoGeneralConfigurationModal,
  } = useDisclosure();

  const {
    isOpen: isOpenCreationResultModal,
    onOpen: onOpenCreationResultModal,
    onClose: onCloseCreationResultModal,
  } = useDisclosure();

  /* Result after mutation is applied */
  const [creationResult, setCreationResult] =
    useState<Nullable<CreateRepositoryMutation$data>>(null);

  const [searchFilter, setSearchFilter] = useState<Nullable<string>>(null);

  const courseGroupsAndUsersData = useLazyLoadQuery<AssignmentGroupsAndUsersQuery>(
    AssignmentGroupsAndUsersQueryDef,
    {
      courseId: courseId || '',
      assignmentId: assignmentId || '',
    }
  );

  const [commitCreateRepositoryMutation] = useMutation<CreateRepositoryMutation>(
    CreateRepositoryMutationDef
  );

  const course = courseGroupsAndUsersData.viewer?.course;
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

  const assignmentGroupsData = getFirstAssignmentGroupsUsersData({
    groupAndUsersData: courseGroupsAndUsersData,
  });

  const getPageConfiguration = (): RepositoriesTypePageConfiguration => {
    return type === RepositoryType.Students
      ? buildStudentRepositoryPageConfiguration({ students })
      : buildGroupRepositoryPageConfiguration({
          groupUsersDataList: assignmentGroupsData.groupUsersData,
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
  const [generalRepositoryConfiguration, setGeneralRepositoryConfiguration] =
    useState<GeneralRepositoryConfiguration>({
      baseRepositoryName: undefined,
      privateRepos: true,
      includeAllBranches: false,
    });

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

  const onCancel = () => {
    courseId && navigate(buildCourseRoute(courseId));
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
      setShowSpinner(true);
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
          arePrivate: generalRepositoryConfiguration.privateRepos,
          baseRepositoryData: generalRepositoryConfiguration.baseRepositoryName
            ? {
                name: generalRepositoryConfiguration.baseRepositoryName,
                includeAllBranches: generalRepositoryConfiguration.includeAllBranches,
              }
            : undefined,
        },
        onCompleted: (response: CreateRepositoryMutation$data, errors) => {
          setShowSpinner(false);
          setCreationResult(response);
          if (!errors?.length) {
            /* There may be errors in the response, display them appart */
            onOpenCreationResultModal();
          } else {
            showErrorToast({
              toast,
              title: 'Error',
              description: `No ha sido posible crear los repositorios`,
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
          <ButtonWithIcon
            onClick={onOpenRepoGeneralConfigurationModal}
            text={'Configuración general de repositorios'}
            icon={IdBadgeIcon}
          />
          <FormControl
            label={'Ejemplo nombre repositorio'}
            isInvalid={errorInRepositoryName}
            errorMessage={
              'No es posible crear repositorios sin nombre, revisar configuración'
            }
            helperText={
              'Nota: la longitud máxima para el nombre de un repositorio es de 100 caracteres. En caso de que en algún repositorio se supere esa longitud, se recortará el mismo'
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
        <Stack>
          <Flex justifyContent={'flex-end'}>
            <InputGroup w="300px">
              <InputLeftElement pointerEvents="none">
                <SearchIcon />
              </InputLeftElement>
              <Input
                placeholder="Juan Perez"
                borderColor="black"
                bgColor="white"
                onChange={event => setSearchFilter(event.target.value)}
              />
            </InputGroup>
          </Flex>
          <SelectionTable
            tableData={tableData}
            setTableData={setTableData}
            tableHeaders={pageConfiguration.tableHeaders}
            tableHeadersWidth={pageConfiguration.tableHeadersWidth}
            searchFilter={searchFilter}
          />
        </Stack>
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
      <Modal
        isOpen={isOpenRepoGeneralConfigurationModal}
        onClose={onCloseRepoGeneralConfigurationModal}
        isCentered
        headerText={'Configuración general de repositorios'}
        contentProps={{
          minWidth: '30vw',
        }}
      >
        <GeneralRepositoryConfigurationModalContent
          generalRepositoryConfiguration={generalRepositoryConfiguration}
          updateGeneralRepositoryConfiguration={setGeneralRepositoryConfiguration}
        />
      </Modal>
      {creationResult && (
        <Modal
          isOpen={isOpenCreationResultModal}
          onClose={onCloseCreationResultModal}
          isCentered
          headerText={'Resultado de la creación de repositorios'}
          contentProps={{
            maxHeight: '80vh',
            overflowY: 'auto', // Make modal scrollable
            minWidth: '30vw',
          }}
        >
          <RepositoriesResultModalContent creationResult={creationResult} />
        </Modal>
      )}
      <Spinner
        isOpen={showSpinner}
        onClose={() => {
          setShowSpinner(false);
        }}
      />
    </PageDataContainer>
  );
};

const SelectionTable = ({
  tableHeaders,
  tableHeadersWidth,
  tableData,
  setTableData,
  searchFilter,
}: {
  tableHeaders: string[];
  tableHeadersWidth: string[];
  tableData: SelectionTableRowProps[];
  setTableData: (newTableData: SelectionTableRowProps[]) => void;
  searchFilter: Nullable<string>;
}) => {
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
        ...tableHeaders,
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
      headersWidths={[...tableHeadersWidth, '10px']}
      rowOptions={tableData
        .filter(data => data.showRow(searchFilter))
        .map(({ checked, id, rowData }) => ({
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

type GeneralRepositoryConfiguration = {
  baseRepositoryName?: string;
  privateRepos: boolean;
  includeAllBranches: boolean;
};

const GeneralRepositoryConfigurationModalContent = ({
  generalRepositoryConfiguration,
  updateGeneralRepositoryConfiguration,
}: {
  generalRepositoryConfiguration: GeneralRepositoryConfiguration;
  updateGeneralRepositoryConfiguration: (
    newConfig: GeneralRepositoryConfiguration
  ) => void;
}) => {
  return (
    <Stack gap={'20px'}>
      <Checkbox
        id={'privateRepos'}
        isChecked={generalRepositoryConfiguration.privateRepos}
        onChange={() =>
          updateGeneralRepositoryConfiguration({
            ...generalRepositoryConfiguration,
            privateRepos: !generalRepositoryConfiguration.privateRepos,
          })
        }
      >
        Privados
      </Checkbox>
      <Stack gap={0}>
        <FormControl
          helperText={
            'Crea cada repositorio con el contenido del repositorio seleccionado. IMPORTANTE: sólo indicar su nombre. Debe pertenecer a la organización del curso y estar habilitado como template.'
          }
          label={'Nombre del repositorio base (opcional)'}
        >
          <InputField
            id={'baseRepo'}
            value={generalRepositoryConfiguration.baseRepositoryName}
            onChange={event =>
              updateGeneralRepositoryConfiguration({
                ...generalRepositoryConfiguration,
                baseRepositoryName: removeWhitespace(event.target.value),
              })
            }
            placeholder={'nombre-repositorio-base'}
            type={'text'}
          />
        </FormControl>
        {generalRepositoryConfiguration.baseRepositoryName && (
          <Checkbox
            id={'includeAllBranches'}
            isChecked={generalRepositoryConfiguration.includeAllBranches}
            onChange={() =>
              updateGeneralRepositoryConfiguration({
                ...generalRepositoryConfiguration,
                includeAllBranches: !generalRepositoryConfiguration.includeAllBranches,
              })
            }
          >
            Incluir todas las ramas y no sólo la default
          </Checkbox>
        )}
      </Stack>
    </Stack>
  );
};

const RepositoriesResultModalContent = ({
  creationResult,
}: {
  creationResult: CreateRepositoryMutation$data;
}) => {
  const createdRepositoriesNames =
    creationResult?.createRepositories?.createdRepositoriesNames || [];
  const failedRepositoriesNames =
    creationResult?.createRepositories?.failedRepositoriesNames || [];
  const failedAddingCollaboratorRepositoriesNames =
    creationResult?.createRepositories?.failedAddingCollaboratorRepositoriesNames || [];

  /* Display different configuration for each type of result */
  const results = [
    {
      title: 'Repositorios fallidos:',
      items: failedRepositoriesNames,
      iconColor: theme.colors.teachHub.red,
    },
    {
      title: 'Repositorios creados, pero con error al agregar usuarios:',
      items: failedAddingCollaboratorRepositoriesNames,
      iconColor: theme.colors.teachHub.yellow,
    },
    {
      title: 'Repositorios creados:',
      items: createdRepositoriesNames,
      iconColor: theme.colors.teachHub.green,
    },
  ];

  return (
    <Stack>
      {results.map(
        (result, resultIndex) =>
          result.items.length && (
            <FormControl label={result.title} key={resultIndex}>
              <List>
                {result.items.map((repoName, index) => (
                  <TextListItem
                    iconProps={{
                      color: result.iconColor,
                      icon: DotFillIcon,
                    }}
                    text={repoName}
                    listItemKey={`${resultIndex}-${index}`}
                    key={`${resultIndex}-${index}`}
                  />
                ))}
              </List>
            </FormControl>
          )
      )}
    </Stack>
  );
};

export default ({ type }: { type: RepositoryType }) => {
  return (
    <Navigation>
      <Suspense>
        <TeacherPage>
          <CreateRepositoryPage type={type} />
        </TeacherPage>
      </Suspense>
    </Navigation>
  );
};
