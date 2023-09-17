import { Suspense } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { Flex, Textarea } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { FormErrors, Mutable, Nullable } from 'types';
import { theme } from 'theme';

import UpdateAssignmentMutationDef from 'graphql/UpdateAssignmentMutation';
import AssignmentQueryDef from 'graphql/AssignmentQuery';

import useToast from 'hooks/useToast';
import { useUserContext } from 'hooks/useUserCourseContext';
import { formatDateAsLocaleIsoString } from 'utils/dates';

import Form from 'components/Form';
import DateInputField from 'components/DateInputField';
import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import InputField from 'components/InputField';
import PageDataContainer from 'components/PageDataContainer';

import type {
  UpdateAssignmentMutation,
  UpdateAssignmentMutation$data,
} from '__generated__/UpdateAssignmentMutation.graphql';
import type { AssignmentQuery } from '__generated__/AssignmentQuery.graphql';
import { Checkbox } from 'components/Checkbox';

type AssignmentData = {
  id?: Nullable<string>;
  title?: Nullable<string>;
  description?: Nullable<string>;
  startDate?: Nullable<string>;
  endDate?: Nullable<string>;
  link?: Nullable<string>;
  allowLateSubmissions?: Nullable<boolean>;
  active?: Nullable<boolean>;
  isGroup?: Nullable<boolean>;
};

type UpdatePageProps = {
  assignmentId: string;
  courseId: string;
};

type FormValues = Mutable<NonNullable<AssignmentData>>;

const UpdateAssignmentPage = ({ assignmentId, courseId }: UpdatePageProps) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [commitUpdateAssignment] = useMutation<UpdateAssignmentMutation>(
    UpdateAssignmentMutationDef
  );

  const initialValues: AssignmentData = {};

  const data = useLazyLoadQuery<AssignmentQuery>(AssignmentQueryDef, {
    id: assignmentId,
    courseId: courseId || '',
  });

  const assignment = data.viewer?.course?.assignment;

  initialValues.id = assignmentId;
  initialValues.title = assignment?.title;
  initialValues.description = assignment?.description;
  initialValues.startDate = assignment?.startDate;
  initialValues.endDate = assignment?.endDate;
  initialValues.link = assignment?.link;
  initialValues.allowLateSubmissions = assignment?.allowLateSubmissions;
  initialValues.isGroup = assignment?.isGroup;

  const validateForm = (values: FormValues): FormErrors<FormValues> => {
    const errors: FormErrors<FormValues> = {};

    if (!values?.title) {
      errors.title = 'Obligatorio';
    }

    return errors;
  };

  const onCancel = () => navigate(`..`);

  const onSubmit = (values: FormValues) => {
    if (courseId && assignmentId) {
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
                `No se pudo editar el trabajo práctico` +
                (errorMessage ? `: ${errorMessage}` : ''),
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
      {assignmentId ? (
        <Heading>Editar Trabajo Práctico</Heading>
      ) : (
        <Heading>Crear Trabajo Práctico</Heading>
      )}
      <Flex direction={'column'} gap={'30px'} width={'400px'} paddingY={'20px'}>
        <Form
          buttonsEnabled // In this page always can use buttons
          initialValues={{
            title: initialValues.title || undefined,
            description: initialValues.description || undefined,
            startDate: initialValues.startDate || undefined,
            endDate: initialValues.endDate || undefined,
            link: initialValues.link || undefined,
            allowLateSubmissions: initialValues.allowLateSubmissions || false,
            isGroup: initialValues.isGroup || false,
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
                  isChecked={values?.allowLateSubmissions}
                  value={values?.allowLateSubmissions}
                  onChange={handleChange}
                />
              ),
              label: 'Aceptar entregas fuera de fecha',
              readError: e => e.allowLateSubmissions as string,
              nextToLabel: true,
            },
            {
              inputComponent: (values, handleChange) => (
                <Checkbox
                  id={'isGroup'}
                  isChecked={values?.isGroup}
                  value={values?.isGroup}
                  onChange={handleChange}
                />
              ),
              label: 'Es grupal',
              readError: e => e.isGroup as string,
              nextToLabel: true,
            },
          ]}
        />
      </Flex>
    </PageDataContainer>
  );
};

const PageContainer = () => {
  const courseContext = useUserContext();
  const { assignmentId } = useParams();

  if (!courseContext.courseId || !assignmentId) {
    return null;
  }

  return (
    <Suspense>
      <UpdateAssignmentPage
        courseId={courseContext.courseId}
        assignmentId={assignmentId}
      />
    </Suspense>
  );
};
export default () => {
  return (
    <Navigation>
      <PageContainer />
    </Navigation>
  );
};
