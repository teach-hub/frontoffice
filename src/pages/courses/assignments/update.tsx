import React, { Suspense, useState } from 'react';
import { useLazyLoadQuery, useMutation } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import UpdateAssignmentMutationDef from 'graphql/UpdateAssignmentMutation';
import AssignmentUpdateQueryDef from 'graphql/AssignmentUpdateQuery';

import useToast, { showErrorToast, showSuccessToast } from 'hooks/useToast';
import { useUserContext } from 'hooks/useUserCourseContext';
import { formatDateAsLocaleIsoString } from 'utils/dates';
import { buildAssignmentRoute } from 'routes';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import TeacherPage from 'components/TeacherOnlyPage';

import type { InitialValues } from 'layout/AssignmentForm';
import AssignmentForm from 'layout/AssignmentForm';
import type { FormErrors } from 'types';

import type {
  UpdateAssignmentMutation,
  UpdateAssignmentMutation$data,
} from '__generated__/UpdateAssignmentMutation.graphql';
import type { AssignmentUpdateQuery } from '__generated__/AssignmentUpdateQuery.graphql';
import Spinner from 'components/Spinner';

type UpdatePageProps = {
  assignmentId: string;
  courseId: string;
};

const UpdateAssignmentPage = ({ assignmentId, courseId }: UpdatePageProps) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  const [commitUpdateAssignment] = useMutation<UpdateAssignmentMutation>(
    UpdateAssignmentMutationDef
  );

  const data = useLazyLoadQuery<AssignmentUpdateQuery>(AssignmentUpdateQueryDef, {
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

  const onCancel = () => navigate(buildAssignmentRoute(courseId, assignmentId));

  const onSubmit = (values: InitialValues) => {
    setShowSpinner(true);
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
        setShowSpinner(false);
        const data = response.updateAssignment;
        if (!errors?.length && data) {
          showSuccessToast({
            toast,
            title: 'Trabajo práctico guardado!',
          });
          navigate(buildAssignmentRoute(courseId, assignmentId));
        } else {
          const errorMessage = errors ? errors[0].message : null;
          showErrorToast({
            toast,
            title: 'Error',
            description:
              `No se pudo editar el trabajo práctico` +
              (errorMessage ? `: ${errorMessage}` : ''),
          });
        }
      },
    });
  };

  return (
    <PageDataContainer>
      <Spinner
        isOpen={showSpinner}
        onClose={() => {
          setShowSpinner(false);
        }}
      />
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
    <TeacherPage>
      <Suspense>
        <UpdateAssignmentPage
          courseId={courseContext.courseId}
          assignmentId={assignmentId}
        />
      </Suspense>
    </TeacherPage>
  );
};
export default () => {
  return (
    <Navigation>
      <PageContainer />
    </Navigation>
  );
};
