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
import { useNavigate, useParams } from 'react-router-dom';
import Form from 'components/Form';
import { FormErrors, Mutable } from 'types';
import React, { Suspense, useState } from 'react';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import InputField from 'components/InputField';
import useToast from 'hooks/useToast';
import PageDataContainer from 'components/PageDataContainer';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import Table from 'components/Table';
import { theme } from 'theme';
import { FormikValues } from 'formik';
import { Checkbox } from 'components/Checkbox';
import CourseCreateRepositoryQueryDef from 'graphql/CourseCreateRepositoryQuery';
import CreateRepositoryMutationDef from 'graphql/CreateRepositoryMutation';
import { CourseCreateRepositoryQuery } from '__generated__/CourseCreateRepositoryQuery.graphql';
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

type RepositoryData = {
  organization?: string;
  reposBaseName?: string;
  useLastNameOnTemplate?: boolean;
  useFileOnTemplate?: boolean;
};

const enum TeacherRepositoryRole {
  Admin = 'Admin',
  Maintain = 'Maintain',
}

interface SelectedRoles {
  [userId: string]: TeacherRepositoryRole;
}

/**
 * Value of the params to configure the page
 * for student or group repository
 * */
export enum RepositoryTypeParam {
  Students = 'students',
  Groups = 'groups',
}

/**
 * Props required for a row in the table
 * to select repositories to create
 *
 * @param id: unique id of the row
 * @param rowData: data to display in the row, does not include checkbox
 * @param checked: whether the checkbox is checked or not
 * */
interface SelectionTableRowProps {
  id: string;
  rowData: string[];
  checked: boolean;
}

/**
 * Props required for a row in the table
 * to select repositories to create for students
 * */
interface StudentSelectionTableRowProps extends SelectionTableRowProps {
  userId: string;
  lastName: string;
  file: string;
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
  // FIXME. No copiar
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  students: any[]; // todo: FIX TYPE!
}): RepositoriesTypePageConfiguration => {
  return {
    title: 'Crear Repositorios (Individuales)',
    description:
      'Indicar la configuración de los repositorios a crear y seleccionar los alumnos a ' +
      'quienes se les crearán sus repositorios en la organización del curso.',
    tableHeaders: ['Alumno', 'Padrón'],
    tableRowData: students.map(student => ({
      id: student.user.file,
      rowData: [
        student.user.lastName + `, ${student.user.name}`, // FullName
        student.user.file, // File
      ],
      checked: true,
      userId: student.user.id, // todo: ver bien que hacer con esto y como usarlo
      userLastName: student.user.lastName,
      userFile: student.user.file,
    })),
  };
};

const CreateRepositoryPage = () => {
  const { type } = useParams();
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

  type FormValues = Mutable<NonNullable<RepositoryData>>;

  const validateForm = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};

    if (!values.organization)
      errors.organization = 'Aún no se ha configurado la organización del curso';

    if (!buildStudentRepositoryName({ values }))
      errors.reposBaseName = 'Es necesario configurar el nombre de los repositorios';

    return errors;
  };

  /* todo: limpieza de espacios, tildes, apostrofes etc., llevar a la base*/
  /* todo: sumar comportamiento para grupos */
  const buildStudentRepositoryName = ({
    values,
    lastName = 'lopez',
    file = '12345',
  }: {
    values: FormikValues;
    lastName?: string;
    file?: string;
  }) => {
    const {
      reposBaseName,
      useLastNameOnTemplate,
      useFileOnTemplate: userFileOnTemplate,
    } = values;
    return [
      reposBaseName || null,
      useLastNameOnTemplate ? lastName.toLowerCase() : null,
      userFileOnTemplate ? file : null,
    ]
      .filter(item => item !== null)
      .join('_');
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

  const [selectedRoles, setSelectedRoles] = useState<SelectedRoles>(getInitialRoles);

  const handleRoleChange = (userId: string, value: TeacherRepositoryRole) => {
    setSelectedRoles(prevState => ({
      ...prevState,
      [userId]: value,
    }));
  };

  /* todo: elegir basado en tipo */
  const studentsPageConfiguration = buildStudentRepositoryPageConfiguration({ students });
  const [tableData, setTableData] = useState<SelectionTableRowProps[]>(
    studentsPageConfiguration.tableRowData
  );

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

    /* todo: actualizar para generalizar en caso de alumno y grupo */
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
          ...studentsPageConfiguration.tableHeaders, // todo: manejar bien esto
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
    const studentsRepositoryData = tableData
      .filter(row => row.checked)
      .map(row => {
        /* TODO: choose based on type */
        const studentData = row as StudentSelectionTableRowProps;

        return {
          students: [studentData.userId],
          name: buildStudentRepositoryName({
            values,
            lastName: studentData.lastName,
            file: studentData.file,
          }),
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
          repositoriesData: studentsRepositoryData,
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
      <Heading>{studentsPageConfiguration.title}</Heading>{' '}
      {/* todo: choose based on type */}
      <Flex justifyContent={'space-between'}>
        <Flex direction={'column'} gap={'30px'} width={'500px'} paddingY={'20px'}>
          <Text whiteSpace="pre-wrap">
            {studentsPageConfiguration.description} {/* todo: choose based on type */}
          </Text>

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
                readError: e => e.organization as string,
              },
              {
                inputComponent: (values, handleChange) => (
                  <Stack flexDirection={'column'}>
                    <InputField
                      id={'reposBaseName'}
                      value={values?.reposBaseName}
                      onChange={handleChange}
                      placeholder={'curso_2023_1'}
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
                label: 'Nombre repositorios',
                readError: e => e.reposBaseName as string,
              },
              {
                inputComponent: (values, _) => (
                  <InputField
                    id={'exampleName'}
                    value={buildStudentRepositoryName({
                      values,
                    })}
                    type={'text'}
                    isReadOnly={true}
                  />
                ),
                label: 'Ejemplo',
                // @ts-expect-error: FIXME
                readError: e => e.reposNameExample as string,
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

export default () => {
  return (
    <Navigation>
      <Suspense fallback={<div> Cargando... </div>}>
        <CreateRepositoryPage />
      </Suspense>
    </Navigation>
  );
};
