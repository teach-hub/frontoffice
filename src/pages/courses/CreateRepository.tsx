import { Flex, Stack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { Form } from 'components/Form';
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

type RepositoryData = {
  baseRepo?: string;
  organization?: string;
  reposBaseName?: string;
  useLastNameOnTemplate?: boolean;
  useFileOnTemplate?: boolean;
};

interface TableRowData {
  userId: string;
  name: string;
  lastName: string;
  file: string;
  checked: boolean;
}

const CreateRepositoryPage = () => {
  const { courseId } = useUserContext();
  const navigate = useNavigate();
  const toast = useToast();
  const courseQueryData = useLazyLoadQuery<CourseCreateRepositoryQuery>(
    CourseCreateRepositoryQueryDef,
    {
      courseId: courseId || '',
    }
  );
  const [commitCreateRepositoryMutation, isCreateRepositoryMutationInFlight] =
    useMutation<CreateRepositoryMutation>(CreateRepositoryMutationDef);

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

  const buildStudentRepositoryName = ({
    values,
    lastName = 'lópez',
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

  const [tableData, setTableData] = useState<TableRowData[]>(
    students.map(student => ({
      lastName: student.user.lastName,
      name: student.user.name,
      file: student.user.file,
      checked: true,
      userId: student.user.id,
    }))
  );

  const StudentsTable = () => {
    const allChecked = tableData.map(i => i.checked).every(Boolean);
    const isIndeterminate = tableData.map(i => i.checked).some(Boolean) && !allChecked;

    const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      const updatedData = tableData.map(row => ({ ...row, checked }));
      setTableData(updatedData);
    };

    const handleRowCheck = (file: string, checked: boolean) => {
      const updatedData = tableData.map(row =>
        row.file === file ? { ...row, checked } : row
      );
      setTableData(updatedData);
    };

    return (
      <Table
        tableHeight={'70vh'}
        tableWidth={'50vw'}
        headers={[
          'Alumno',
          'Padrón',
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
        cellsContent={tableData.map(({ checked, userId, lastName, name, file }) => [
          lastName + `, ${name}`, // FullName
          file, // File
          <Checkbox
            id={'file'}
            isChecked={checked}
            onChange={() => handleRowCheck(file, !checked)}
          />,
        ])}
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
        return {
          students: [row.userId],
          name: buildStudentRepositoryName({
            values,
            lastName: row.lastName,
            file: row.file,
          }),
        };
      });

    if (courseId) {
      commitCreateRepositoryMutation({
        variables: {
          organization: courseOrganization || '',
          courseId,
          repositoriesData: studentsRepositoryData,
          admins: [], // TODO: TH-130 Add admins
          maintainers: [], // TODO: TH-130 Add maintainers
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
      <Heading>Crear Repositorios</Heading>

      <Flex justifyContent={'space-between'}>
        <Flex direction={'column'} gap={'30px'} width={'400px'} paddingY={'20px'}>
          <Text whiteSpace="pre-wrap">
            Indicar la configuración de los repositorios a crear y seleccionar los alumnos
            a quienes se les crearán sus repositorios en la organización del curso.
          </Text>
          <Form
            buttonsEnabled={true} // In this page always can use buttons
            initialValues={{
              organization: courseOrganization,
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
                  <InputField
                    id={'baseRepo'}
                    value={values?.baseRepo}
                    onChange={handleChange}
                    placeholder={'https://github.com/usr/repo'}
                    type={'text'}
                  />
                ),
                label: 'Repositorio base',
                readError: e => e.baseRepo as string,
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
                readError: e => e.reposNameExample as string,
              },
            ]}
          />
        </Flex>
        <StudentsTable />
      </Flex>
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
