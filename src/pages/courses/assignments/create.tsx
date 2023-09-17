import { Suspense } from 'react';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import CreateAssignmentMutationDef from 'graphql/CreateAssignmentMutation';

import useToast from 'hooks/useToast';
import { useUserContext } from 'hooks/useUserCourseContext';
import { formatDateAsLocaleIsoString } from 'utils/dates';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';

import AssignmentForm, { InitialValues } from 'layout/AssignmentForm';

import type { FormErrors } from 'types';
import type {
  CreateAssignmentMutation,
  CreateAssignmentMutation$data,
} from '__generated__/CreateAssignmentMutation.graphql';

type Props = {
  courseId: string;
};

const CreateAssignmentPage = ({ courseId }: Props) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [commitCreateAssignment] = useMutation<CreateAssignmentMutation>(
    CreateAssignmentMutationDef
  );

  const validateForm = (values: InitialValues): FormErrors<InitialValues> => {
    const errors: FormErrors<InitialValues> = {};

    if (!values?.title) {
      errors.title = 'Obligatorio';
    }

    return errors;
  };

  const onCancel = () => navigate(`..`);

  const onSubmit = (values: InitialValues) => {
    commitCreateAssignment({
      variables: {
        ...values,
        courseId: courseId,
        startDate: values.startDate
          ? formatDateAsLocaleIsoString(values.startDate)
          : undefined,
        endDate: values.endDate ? formatDateAsLocaleIsoString(values.endDate) : undefined,
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
              `No se pudo crear el trabajo práctico` +
              (errorMessage ? `: ${errorMessage}` : ''),
            status: 'error',
          });
        }
      },
    });
  };

  return (
    <PageDataContainer>
      <Heading>Crear Trabajo Práctico</Heading>
      <AssignmentForm
        validateForm={validateForm}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </PageDataContainer>
  );
};

const PageContainer = () => {
  const courseContext = useUserContext();

  if (!courseContext.courseId) {
    return null;
  }

  return (
    <Suspense>
      <CreateAssignmentPage courseId={courseContext.courseId} />
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