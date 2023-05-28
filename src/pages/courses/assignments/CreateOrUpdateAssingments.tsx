import { Suspense } from 'react';
import { useMutation } from 'react-relay';
import { Checkbox, Flex, Textarea } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { FormErrors, Mutable, Nullable } from 'types';
import { theme } from 'theme';

import CreateAssignmentMutationDef from 'graphql/CreateAssignmentMutation';
import UpdateAssignmentMutationDef from 'graphql/UpdateAssignmentMutation';
import { getAssignment } from 'graphql/utils/assignments';
import {
  CreateAssignmentMutation,
  CreateAssignmentMutation$data,
} from '__generated__/CreateAssignmentMutation.graphql';
import {
  UpdateAssignmentMutation,
  UpdateAssignmentMutation$data,
} from '__generated__/UpdateAssignmentMutation.graphql';

import useToast from 'hooks/useToast';
import { formatDateAsLocaleIsoString } from 'utils/dates';

import { Form } from 'components/Form';
import DateInputField from 'components/DateInputField';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import InputField from 'components/InputField';
import PageDataContainer from 'components/PageDataContainer';

type AssignmentData = {
  id?: Nullable<string>;
  title?: Nullable<string>;
  description?: Nullable<string>;
  startDate?: Nullable<string>;
  endDate?: Nullable<string>;
  link?: Nullable<string>;
  allowLateSubmissions?: Nullable<boolean>;
  active?: Nullable<boolean>;
};

const CreateOrUpdateAssignmentsPage = () => {
  const { assignmentId, courseId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const [commitCreateAssignment] = useMutation<CreateAssignmentMutation>(
    CreateAssignmentMutationDef
  );
  const [commitUpdateAssignment] = useMutation<UpdateAssignmentMutation>(
    UpdateAssignmentMutationDef
  );

  const initialValues: AssignmentData = {};

  if (assignmentId) {
    const assignment = getAssignment({
      assignmentId,
    });
    initialValues.id = assignmentId;
    initialValues.title = assignment?.title;
    initialValues.description = assignment?.description;
    initialValues.startDate = assignment?.startDate;
    initialValues.endDate = assignment?.endDate;
    initialValues.link = assignment?.link;
    initialValues.allowLateSubmissions = assignment?.allowLateSubmissions;
  }

  type FormValues = Mutable<NonNullable<AssignmentData>>;

  const validateForm = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};

    if (!values?.title) errors.title = 'Obligatorio';

    return errors;
  };

  const onCancel = () => {
    navigate(`..`);
  };

  const onSubmit = (values: FormValues) => {
    if (courseId) {
      if (assignmentId) {
        commitUpdateAssignment({
          variables: {
            ...values,
            courseId: courseId,
            id: assignmentId,
            startDate: values.startDate
              ? formatDateAsLocaleIsoString(values.startDate)
              : undefined,
            endDate: values.endDate
              ? formatDateAsLocaleIsoString(values.endDate)
              : undefined,
            active: true,
          },
          onCompleted: (response: UpdateAssignmentMutation$data, errors) => {
            const data = response.updateAssignment;
            if (!errors?.length && data) {
              toast({
                title: 'Trabajo práctico guardado!',
                status: 'info',
              });
              navigate(`..`);
            } else {
              const errorMessage = errors ? errors[0].message : null;
              toast({
                title: 'Error',
                description:
                  `No se pudo editar el trabajo práctico` + errorMessage
                    ? `: ${errorMessage}`
                    : '',
                status: 'error',
              });
            }
          },
        });
      } else {
        commitCreateAssignment({
          variables: {
            ...values,
            courseId: courseId,
            startDate: values.startDate
              ? formatDateAsLocaleIsoString(values.startDate)
              : undefined,
            endDate: values.endDate
              ? formatDateAsLocaleIsoString(values.endDate)
              : undefined,
          },
          onCompleted: (response: CreateAssignmentMutation$data, errors) => {
            const data = response.createAssignment;
            if (!errors?.length && data) {
              toast({
                title: 'Trabajo práctico guardado!',
                status: 'info',
              });
              navigate(`../${data.id}`);
            } else {
              const errorMessage = errors ? errors[0].message : null;
              toast({
                title: 'Error',
                description:
                  `No se pudo crear el trabajo práctico` + errorMessage
                    ? `: ${errorMessage}`
                    : '',
                status: 'error',
              });
            }
          },
        });
      }
    } else {
      throw new Error('No courseId');
    }
  };

  return (
    <PageDataContainer>
      {assignmentId ? (
        <Heading>Editar Trabajo Práctico</Heading>
      ) : (
        <Heading>Crear Trabajo Práctico</Heading>
      )}
      <Flex direction={'column'} gap={'30px'} width={'400px'} paddingY={'20px'}>
        <Form
          buttonsEnabled={true} // In this page always can use buttons
          initialValues={{
            title: initialValues.title || undefined,
            description: initialValues.description || undefined,
            startDate: initialValues.startDate || undefined,
            endDate: initialValues.endDate || undefined,
            link: initialValues.link || undefined,
            allowLateSubmissions: initialValues.allowLateSubmissions || false,
          }}
          validateForm={validateForm}
          onCancelForm={{
            text: 'Cancelar',
            onClick: onCancel,
          }}
          onSubmitForm={{
            text: 'Guardar',
            onClick: onSubmit,
          }}
          inputFields={[
            {
              inputComponent: (values, handleChange) => (
                <InputField
                  id={'title'}
                  value={values?.title}
                  onChange={handleChange}
                  placeholder={'Título'}
                  type={'text'}
                />
              ),
              label: 'Título',
              readError: e => e.title as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <Textarea
                  id={'description'}
                  value={values?.description}
                  onChange={handleChange}
                  placeholder={'Descripción'}
                  height={'200px'}
                  _placeholder={{ color: theme.colors.teachHub.gray }}
                  bg={theme.colors.teachHub.white}
                />
              ),
              label: 'Descripción',
              readError: e => e.description as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <InputField
                  id={'link'}
                  value={values?.link}
                  onChange={handleChange}
                  placeholder={'www.ejemplolink.com'}
                  type={'url'}
                />
              ),
              label: 'Link al enunciado',
              readError: e => e.link as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <DateInputField
                  id={'startDate'}
                  value={values?.startDate}
                  onChange={handleChange}
                />
              ),
              label: 'Fecha inicio de entregas',
              readError: e => e.startDate as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <DateInputField
                  id={'endDate'}
                  value={values?.endDate}
                  onChange={handleChange}
                />
              ),
              label: 'Fecha límite de entregas',
              readError: e => e.endDate as string,
            },
            {
              inputComponent: (values, handleChange) => (
                <Checkbox
                  id={'allowLateSubmissions'}
                  size={'lg'}
                  borderColor={theme.colors.teachHub.black}
                  bg={theme.colors.teachHub.white}
                  isChecked={values?.allowLateSubmissions}
                  value={values?.allowLateSubmissions}
                  onChange={handleChange}
                />
              ),
              label: 'Aceptar entregas fuera de fecha',
              readError: e => e.allowLateSubmissions as string,
              nextToLabel: true,
            },
          ]}
        />
      </Flex>
    </PageDataContainer>
  );
};

export default () => {
  return (
    <Suspense fallback={<div> Cargando... </div>}>
      <Navigation>
        <CreateOrUpdateAssignmentsPage />
      </Navigation>
    </Suspense>
  );
};
