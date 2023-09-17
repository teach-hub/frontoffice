import { Suspense } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import UpdateAssignmentMutationDef from 'graphql/UpdateAssignmentMutation';
import AssignmentQueryDef from 'graphql/AssignmentQuery';

import useToast from 'hooks/useToast';
import { useUserContext } from 'hooks/useUserCourseContext';
import { formatDateAsLocaleIsoString } from 'utils/dates';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';

import AssignmentForm from 'layout/AssignmentForm';

import type { InitialValues } from 'layout/AssignmentForm';
import type { FormErrors } from 'types';

import type {
  UpdateAssignmentMutation,
  UpdateAssignmentMutation$data,
} from '__generated__/UpdateAssignmentMutation.graphql';
import type { AssignmentQuery } from '__generated__/AssignmentQuery.graphql';

type UpdatePageProps = {
  assignmentId: string;
  courseId: string;
};

const UpdateAssignmentPage = ({ assignmentId, courseId }: UpdatePageProps) => {
  const navigate = useNavigate();
  const toast = useToast();

  const [commitUpdateAssignment] = useMutation<UpdateAssignmentMutation>(
    UpdateAssignmentMutationDef
  );

  const data = useLazyLoadQuery<AssignmentQuery>(AssignmentQueryDef, {
    id: assignmentId,
    courseId: courseId || '',
  });

  const assignment = data.viewer?.course?.assignment;

  if (!assignment) {
    return null;
  }

  const initialValues: InitialValues = {
    title: assignment?.title,
    description: assignment?.description,
    startDate: assignment?.startDate,
    endDate: assignment?.endDate,
    link: assignment?.link,
    allowLateSubmissions: assignment?.allowLateSubmissions,
    isGroup: assignment?.isGroup,
  };

  const validateForm = (values: InitialValues): FormErrors<InitialValues> => {
    const errors: FormErrors<InitialValues> = {};

    if (!values?.title) {
      errors.title = 'Obligatorio';
    }

    return errors;
  };

  const onCancel = () => navigate(`..`);

  const onSubmit = (values: InitialValues) => {
    commitUpdateAssignment({
      variables: {
        ...values,
        courseId: courseId,
        id: assignmentId,
        startDate: values.startDate
          ? formatDateAsLocaleIsoString(values.startDate)
          : undefined,
        endDate: values.endDate ? formatDateAsLocaleIsoString(values.endDate) : undefined,
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
  };

  return (
    <PageDataContainer>
      <Heading>Editar Trabajo Práctico</Heading>
      <AssignmentForm
        initialValues={initialValues}
        onSubmit={onSubmit}
        onCancel={onCancel}
        validateForm={validateForm}
      />
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
