import { Suspense, useState } from 'react';
import { useMutation } from 'react-relay';
import { useNavigate } from 'react-router-dom';

import CreateAssignmentMutationDef from 'graphql/CreateAssignmentMutation';

import useToast, { showErrorToast, showSuccessToast } from 'hooks/useToast';
import { useUserContext } from 'hooks/useUserCourseContext';
import { formatDateAsLocaleIsoString } from 'utils/dates';
import { buildAssignmentRoute, buildAssignmentsRoute } from 'routes';

import Navigation from 'components/Navigation';
import Heading from 'components/Heading';
import PageDataContainer from 'components/PageDataContainer';
import TeacherPage from 'components/TeacherOnlyPage';

import AssignmentForm, { InitialValues } from 'layout/AssignmentForm';

import type { FormErrors } from 'types';
import type {
  CreateAssignmentMutation,
  CreateAssignmentMutation$data,
} from '__generated__/CreateAssignmentMutation.graphql';
import Spinner from 'components/Spinner';

type Props = {
  courseId: string;
};

const CreateAssignmentPage = ({ courseId }: Props) => {
  const navigate = useNavigate();
  const toast = useToast();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

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

  const onCancel = () => navigate(buildAssignmentsRoute(courseId));

  const onSubmit = (values: InitialValues) => {
    setShowSpinner(true);
    commitCreateAssignment({
      variables: {
        ...values,
        courseId,
        startDate: values.startDate
          ? formatDateAsLocaleIsoString(values.startDate)
          : undefined,
        endDate: values.endDate ? formatDateAsLocaleIsoString(values.endDate) : undefined,
      },
      onCompleted: (response: CreateAssignmentMutation$data, errors) => {
        setShowSpinner(false);
        const data = response.createAssignment;
        if (!errors?.length && data) {
          showSuccessToast({
            toast,
            title: 'Trabajo práctico creado!',
          });
          navigate(buildAssignmentRoute(courseId, data.id));
        } else {
          const errorMessage = errors ? errors[0].message : null;
          showErrorToast({
            toast,
            title: 'Error',
            description:
              `No se pudo crear el trabajo práctico` +
              (errorMessage ? `: ${errorMessage}` : ''),
          });
        }
      },
      updater: store => {
        const newAssignment = store.getRootField('createAssignment');
        const courseKey = 'course(id:"' + courseId + '")';

        const courseRef = store
          .getRoot()
          .getLinkedRecord('viewer')
          ?.getLinkedRecord(courseKey);

        const assignments = courseRef?.getLinkedRecords('assignments') || [];
        courseRef?.setLinkedRecords(assignments.concat(newAssignment), 'assignments');
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
      <TeacherPage>
        <CreateAssignmentPage courseId={courseContext.courseId} />
      </TeacherPage>
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
