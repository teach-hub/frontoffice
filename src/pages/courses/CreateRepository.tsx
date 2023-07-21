import {
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Form from 'components/Form';
import { FormErrors, Mutable } from 'types';
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
import { Icon } from '@chakra-ui/icons';
import { MortarBoardIcon } from '@primer/octicons-react';
import Button from 'components/Button';
import Text from 'components/Text';
import { removeAccentsAndSpecialCharacters } from 'utils/strings';

type RepositoryConfiguration = {
  organization?: string;
  reposBaseName?: string;
  useLastNameOnTemplate?: boolean;
  useFileOnTemplate?: boolean;
};

type FormValues = Mutable<NonNullable<RepositoryConfiguration>>;

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
 * TODO:
 *  - if there are repeated names, add a number to the end, or make a difference to each name
 *    - perhaps warn about repetitions?
 * */

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
  getRepoName: (repositoryConfiguration: RepositoryConfiguration) => string;
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

interface GroupAssignmentData {
  id: string;
  title: string;
}

/**
 * Groups will be displayed in a table, joining the cases where
 * different assignments have the same participants.
 *
 * If a group has different participants for different assignments,
 * then each one will be a different object associated to this interface
 * */
interface GroupSelectionTableRowProps extends SelectionTableRowProps {
  groupName: string;
  groupId: string;
  assignments: GroupAssignmentData[];
  participants: GroupParticipantData[];
}

type CourseType = NonNullable<
  NonNullable<CourseCreateRepositoryQuery$data['viewer']>['course']
>;
type UserRoleType = NonNullable<CourseType['userRoles']>[number];
type AssignmentType = NonNullable<CourseType['assignments']>[number];
type GroupType = NonNullable<CourseType['groups'][number]>;
type UsersByAssignmentType = NonNullable<GroupType['usersByAssignments']>;

interface GroupUsersData {
  group: GroupType;
  usersByAssigment: UsersByAssignmentType;
}

/**
 * Configuration for the page to create repositories.
 * May differ from students or groups, so a different configuration
 * should be created for each
 *
 * @param title: title of the page
 * @param description: description of the page
 * @param tableHeaders: headers of the table, must not include checkbox
 * @param tableRowData: data for each row of the table
 * */
interface RepositoriesTypePageConfiguration {
  title: string;
  description: string;
  tableHeaders: string[];
  tableRowData: SelectionTableRowProps[];
}

const buildStudentRepositoryPageConfiguration = ({
  students,
}: {
  students: UserRoleType[];
}): RepositoriesTypePageConfiguration => {
  return {
    title: 'Crear Repositorios (Individuales)',
    description:
      'Indicar la configuración de los repositorios a crear y seleccionar los alumnos a ' +
      'quienes se les crearán sus repositorios en la organización del curso.',
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
          getRepoName: (repositoryData: RepositoryConfiguration) => {
            const { reposBaseName, useLastNameOnTemplate, useFileOnTemplate } =
              repositoryData;

            const repoName = [
              reposBaseName || null,
              useLastNameOnTemplate ? student.user.lastName.toLowerCase() : null,
              useFileOnTemplate ? student.user.file : null,
            ]
              .filter(item => item !== null)
              .join('_');

            return removeAccentsAndSpecialCharacters(repoName);
          },
        })
      )
      .sort((a, b) => a.lastName.localeCompare(b.lastName)), // Sort alphabetically
  };
};

const buildGroupRepositoryPageConfiguration = ({
  groupUsersData,
  courseAssignments,
}: {
  groupUsersData: GroupUsersData[];
  courseAssignments: readonly AssignmentType[];
}): RepositoriesTypePageConfiguration => {
  const tableRowData: GroupSelectionTableRowProps[] = groupUsersData
    .reduce((result: GroupSelectionTableRowProps[], currentGroupUsersData) => {
      const { group, usersByAssigment } = currentGroupUsersData;

      usersByAssigment.forEach(currentUsersByAssignment => {
        const assignments = currentUsersByAssignment.assignmentIds
          .map(assignmentId =>
            courseAssignments.find(
              courseAssignment => courseAssignment.id === assignmentId
            )
          )
          .filter(assignment => assignment !== undefined) as AssignmentType[];
        const users = currentUsersByAssignment.users;

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

        /* Create stack to view better spaced */
        const assignmentTitles = (
          <Stack>
            {assignments.map(assignment => (
              <Text>{assignment.title}</Text>
            ))}
          </Stack>
        );
        const groupName = group.name || '';
        const groupId = group.id;

        result.push({
          groupId: groupId,
          groupName: groupName,
          assignments: assignments.map(assignment => ({
            id: assignment.id || '',
            title: assignment.title || '',
          })),
          participants: users.map(user => ({
            userId: user.id,
            name: user.name,
            lastName: user.lastName,
            file: user.file,
          })),
          rowData: [groupName, assignmentTitles, usersRowData],
          checked: true,
          id: `${groupId}-${assignments.map(a => a.id).join('-')}`,
          getStudentIds: () => users.map(user => user.id),
          getRepoName: (repositoryData: RepositoryConfiguration) => {
            const { reposBaseName, useLastNameOnTemplate, useFileOnTemplate } =
              repositoryData;

            const lastNames = useLastNameOnTemplate
              ? users.map(user => user.lastName.toLowerCase()).join('_')
              : null;
            const files = useFileOnTemplate
              ? users.map(user => user.file).join('_')
              : null;

            const repoName = [reposBaseName || null, lastNames, files]
              .filter(item => item !== null)
              .join('_');
            return removeAccentsAndSpecialCharacters(repoName);
          },
        });
      });

      return result;
    }, [])
    .sort((a: GroupSelectionTableRowProps, b: GroupSelectionTableRowProps) =>
      a.groupName.localeCompare(b.groupName)
    ); // Sort by group names

  return {
    title: 'Crear Repositorios (Grupales)',
    description:
      'Indicar la configuración de los repositorios a crear y seleccionar los grupos a ' +
      'quienes se les crearán sus repositorios en la organización del curso.\n\n' +
      'En caso de que un grupo tenga distintos integrantes en distintos trabajos prácticos se podrá ' +
      'seleccionar a quienes crear el repositorio.',
    tableHeaders: ['Grupo', 'Trabajo/s Práctico/s', 'Alumnos'],
    tableRowData,
  };
};

const CreateRepositoryPage = ({ type }: { type: RepositoryType }) => {
  const { courseId } = useUserContext();
  const navigate = useNavigate();
  const toast = useToast();
  const {
    isOpen: isOpenTeachersModal,
    onOpen: onOpenTeachersModal,
    onClose: onCloseTeachersModal,
  } = useDisclosure();

  const courseQueryData = useLazyLoadQuery<CourseCreateRepositoryQuery>(
    CourseCreateRepositoryQueryDef,
    {
      courseId: courseId || '',
    }
  );

  const [commitCreateRepositoryMutation] = useMutation<CreateRepositoryMutation>(
    CreateRepositoryMutationDef
  );

  const course = courseQueryData.viewer?.course;
  const courseOrganization = course?.organization;
  const courseAssignments = course?.assignments || [];
  const groupUsersData: GroupUsersData[] =
    course?.groups?.map(group => ({
      group,
      usersByAssigment: group.usersByAssignments,
    })) || [];

  const validateForm = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};

    if (!values.organization)
      errors.organization = 'Aún no se ha configurado la organización del curso';

    /* todo: update conditions with group data, or if same names are autogenerated (if repeated) */
    if (!values.useFileOnTemplate && !values.useLastNameOnTemplate)
      errors.reposBaseName =
        'Es necesario configurar un dato que permita diferenciar el nombre de los repositorios';

    return errors;
  };

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

  const getPageConfiguration = (): RepositoriesTypePageConfiguration => {
    return type === RepositoryType.Students
      ? buildStudentRepositoryPageConfiguration({ students })
      : buildGroupRepositoryPageConfiguration({
          groupUsersData,
          courseAssignments,
        });
  };

  const [pageConfiguration, setPageConfiguration] =
    useState<RepositoriesTypePageConfiguration>(getPageConfiguration());

  const [tableData, setTableData] = useState<SelectionTableRowProps[]>(
    pageConfiguration.tableRowData
  );

  useEffect(() => {
    const newPageConfiguration = getPageConfiguration();
    setPageConfiguration(newPageConfiguration);
    setTableData(newPageConfiguration.tableRowData);
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

  const onSubmit = (values: FormValues) => {
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
          name: row.getRepoName(values),
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

  return (
    <PageDataContainer>
      <Heading>{pageConfiguration.title}</Heading>{' '}
      <Flex justifyContent={'space-between'}>
        <Flex direction={'column'} gap={'30px'} width={'500px'} paddingY={'20px'}>
          <Text whiteSpace="pre-wrap">{pageConfiguration.description}</Text>

          <Button onClick={onOpenTeachersModal} width={'fit-content'}>
            <Flex align="center">
              <Icon as={MortarBoardIcon} boxSize={6} marginRight={2} />
              <Text>Configurar rol de profesores</Text>
            </Flex>
          </Button>

          <Form
            buttonsEnabled={true} // In this page always can use buttons
            initialValues={{
              organization: courseOrganization ?? undefined,
              useLastNameOnTemplate: true,
              useFileOnTemplate: true,
            }}
            validateForm={validateForm}
            onCancelForm={{
              text: 'Cancelar',
              onClick: onCancel,
            }}
            onSubmitForm={{
              text: 'Crear',
              onClick: onSubmit,
            }}
            inputFields={[
              {
                inputComponent: (values, _) => (
                  <InputField
                    id={'organization'}
                    value={values.organization}
                    type={'text'}
                    isReadOnly={true}
                  />
                ),
                label: 'Organización de GitHub',
                readError: e => e.organization as string, // TODO: Remove from form
              },
              {
                inputComponent: (values, handleChange) => (
                  <Stack flexDirection={'column'}>
                    <InputField
                      id={'reposBaseName'}
                      value={values?.reposBaseName}
                      onChange={handleChange}
                      placeholder={'texto_prefijo'}
                      type={'text'}
                    />
                    {[
                      {
                        id: 'useLastNameOnTemplate',
                        isChecked: values?.useLastNameOnTemplate,
                        value: values?.useLastNameOnTemplate,
                        text: 'Incluir apellido',
                      },
                      {
                        id: 'useFileOnTemplate',
                        isChecked: values?.useFileOnTemplate,
                        value: values?.useFileOnTemplate,
                        text: 'Incluir padrón',
                      },
                    ].map(item => (
                      <Flex alignItems={'center'} gap={'10px'}>
                        <Checkbox
                          id={item.id}
                          isChecked={item.isChecked}
                          value={item.value}
                          onChange={handleChange}
                        />
                        <Text>{item.text}</Text>
                      </Flex>
                    ))}
                  </Stack>
                ),
                label: 'Configuración nombre repositorios',
                readError: e => e.reposBaseName as string,
              },
              {
                inputComponent: (values, _) => (
                  <InputField
                    id={'exampleName'}
                    value={tableData.length > 0 ? tableData[0].getRepoName(values) : ''} // Use first item of the table as example
                    type={'text'}
                    isReadOnly={true}
                  />
                ),
                label: 'Ejemplo',
                // @ts-expect-error: FIXME
                readError: e => e.reposNameExample as string, // TODO: Remove from form
              },
            ]}
          />
        </Flex>
        <SelectionTable />
      </Flex>
      <Modal isOpen={isOpenTeachersModal} onClose={onCloseTeachersModal} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Seleccione el rol que tendrá cada profesor en los repositorios a crear.
          </ModalHeader>
          <ModalBody>
            <Text></Text>
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
          </ModalBody>
          <ModalFooter />
        </ModalContent>
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
