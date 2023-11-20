import React, { Suspense } from 'react';
import { useLazyLoadQuery } from 'react-relay';
import { useNavigate, useParams } from 'react-router-dom';

import { Flex, Grid, GridItem, Stack } from '@chakra-ui/react';
import { AlertIcon, PencilIcon, PeopleIcon, PersonIcon } from '@primer/octicons-react';

import { Permission, useUserContext } from 'hooks/useUserCourseContext';

import Navigation from 'components/Navigation';
import Button from 'components/Button';
import PageDataContainer from 'components/PageDataContainer';
import Heading from 'components/Heading';
import List from 'components/list/List';
import Text from 'components/Text';
import Skeleton from 'components/Skeleton';

import AssignmentQueryDef from 'graphql/AssignmentQuery';

import type {
  AssignmentQuery,
  AssignmentQuery$data,
} from '__generated__/AssignmentQuery.graphql';
import { DateListItem } from 'components/list/DateListItem';
import { TextListItem } from 'components/list/TextListItem';
import { LinkListItem } from 'components/list/LinkListItem';
import { buildAssignmentUrlFilter } from 'queries';
import BoxWithTopAndBottomBorders from 'components/BoxWithTopAndBottomBorders';
import { ButtonWithIcon } from 'components/ButtonWithIcon';
import CreateRepositoryIcon from 'icons/CreateRepositoryIcon';
import GroupIcon from 'icons/GroupIcon';
import SubmissionIcon from 'icons/SubmissionIcon';
import ReviewerIcon from 'icons/ReviewerIcon';
import { Icon as OcticonsIcon } from '@primer/octicons-react/dist/icons';
import RRLink from 'components/RRLink';
import Divider from 'components/Divider';
import {
  getAssignmentSubmissionReviewersDataset,
  getAssignmentSubmissionStatusDataset,
} from 'statistics/submissions';
import { StackedBarChart } from 'components/charts/StackedBarChart';
import Box from 'components/Box';
import { Pie } from 'components/charts/Pie';
import {
  buildAssignmentGroups,
  buildAssignmentRoute,
  buildSubmissionRoute,
  buildSubmissionsRoute,
} from 'routes';

type Course = NonNullable<NonNullable<AssignmentQuery$data['viewer']>['course']>;
type Assignment = NonNullable<Course['assignment']>;

const LIST_ITEM_ICON_COLOR = 'teachHub.primary';

function AssignmentDetails({ assignment }: { assignment: Assignment }) {
  const courseContext = useUserContext();

  return (
    <List justifyItems={'left'} alignItems={'flex-start'}>
      <TextListItem
        iconProps={{
          color: LIST_ITEM_ICON_COLOR,
          icon: assignment.isGroup ? PeopleIcon : PersonIcon,
        }}
        text={assignment.isGroup ? 'Entrega grupal' : 'Entrega individual'}
        listItemKey={'isGroup'}
      />
      <DateListItem
        date={assignment.startDate}
        label={'Inicio de entregas: '}
        listItemKey={'startDate'}
        iconColor={LIST_ITEM_ICON_COLOR}
      />
      <DateListItem
        date={assignment.endDate}
        label={'Fecha límite de entregas: '}
        listItemKey={'endDate'}
        iconColor={LIST_ITEM_ICON_COLOR}
      />
      {courseContext.userIsTeacher && (
        <TextListItem
          listItemKey={'allowLateSubmissions'}
          iconProps={{
            color: LIST_ITEM_ICON_COLOR,
            icon: AlertIcon,
          }}
          text={assignment.allowLateSubmissions ? 'Permitidas' : 'No Permitidas'}
          label={'Entregas fuera de fecha: '}
        />
      )}
      {assignment.link ? (
        <LinkListItem
          listItemKey={'link'}
          iconColor={LIST_ITEM_ICON_COLOR}
          link={assignment.link}
          text={'Ir a enunciado'}
          external={true}
        />
      ) : (
        <></>
      )}
    </List>
  );
}

type NavigationActionData = {
  icon: OcticonsIcon;
  text: string;
  link: string;
  disabled?: boolean;
};

const AssignmentNavigationActions = ({ assignment }: { assignment: Assignment }) => {
  const courseContext = useUserContext();
  const viewerCanSubmit = assignment.isOpenForSubmissions && !assignment.viewerSubmission;

  if (!courseContext.courseId) {
    return null;
  }

  const actions: NavigationActionData[] = [];

  if (courseContext.userIsTeacher) {
    actions.push({
      icon: SubmissionIcon,
      text: 'Ver entregas',
      link: `${buildSubmissionsRoute(courseContext.courseId)}?${buildAssignmentUrlFilter(
        assignment.id
      )}`,
    });
  } else {
    actions.push({
      icon: SubmissionIcon,
      text: 'Ver entrega',
      link: buildSubmissionRoute(
        courseContext.courseId,
        assignment.viewerSubmission?.id || ''
      ),
      disabled: !assignment.viewerSubmission?.id,
    });
  }

  if (courseContext.userHasPermission(Permission.AssignReviewer)) {
    actions.push({
      icon: ReviewerIcon,
      text: 'Asignar correctores',
      link: `${buildAssignmentRoute(
        courseContext.courseId,
        assignment.id
      )}/assign-reviewers`,
    });
  }

  if (courseContext.userHasPermission(Permission.SubmitAssignment)) {
    actions.push({
      icon: SubmissionIcon,
      text: assignment.viewerSubmission ? 'Entrega realizada' : 'Realizar nueva entrega',
      disabled: !viewerCanSubmit,
      link: `${buildAssignmentRoute(
        courseContext.courseId,
        assignment.id
      )}/add-submission`,
    });
  }

  if (courseContext.userHasPermission(Permission.CreateRepository)) {
    actions.push({
      icon: CreateRepositoryIcon,
      text: 'Crear repositorios',
      link: `${buildAssignmentRoute(courseContext.courseId, assignment.id)}/new-repo/${
        assignment.isGroup ? 'groups' : 'students'
      }`,
    });
  }

  if (courseContext.userHasPermission(Permission.ManageGroups) && assignment.isGroup) {
    actions.push({
      icon: GroupIcon,
      text: 'Ver grupos',
      link: buildAssignmentGroups(courseContext.courseId, assignment.id),
    });
  }

  return (
    <Stack gap={'10px'} direction="row">
      {actions.map(({ icon, text, link, disabled }, index) => (
        <RRLink to={link} key={index} disabled={disabled}>
          <ButtonWithIcon
            key={index}
            icon={icon}
            variant={'ghostBorder'}
            text={text}
            disabled={disabled || false}
          />
        </RRLink>
      ))}
    </Stack>
  );
};

function AssignmentPersistActions() {
  const courseContext = useUserContext();
  const navigate = useNavigate();

  const actions = [];

  if (courseContext.userHasPermission(Permission.EditAssignment)) {
    actions.push(
      <Button leftIcon={<PencilIcon />} onClick={() => navigate(`edit`)} key={'edit'}>
        Editar
      </Button>
    );
  }

  return (
    <Flex gap="5px" direction={'row'}>
      {actions}
    </Flex>
  );
}

const AssignmentCharts = ({ assignment }: { assignment: Assignment }) => {
  const assignmentSubmissionStatisticsData = {
    title: assignment.title,
    submissions: assignment.submissions?.map(submission => ({
      grade: submission.review?.grade,
      revisionRequested: submission.review?.revisionRequested,
      reviewer: submission.reviewer?.reviewer,
    })),
    nonExistentSubmissions: assignment.nonExistentSubmissions?.map(s => ({
      reviewer: s.reviewer?.reviewer,
    })),
  };

  const submissionsStatusDataset = getAssignmentSubmissionStatusDataset([
    assignmentSubmissionStatisticsData,
  ]);
  const reviewerStatusDataset = getAssignmentSubmissionReviewersDataset(
    assignmentSubmissionStatisticsData
  );

  return (
    <Stack gap={'20px'}>
      <Stack alignItems={'center'} flexDirection={'column'}>
        <Box width={'50%'}>
          <Pie
            labels={submissionsStatusDataset.map(item => item.label)}
            data={{
              label: 'Cantidad',
              data: submissionsStatusDataset.map(item => item.data[0]),
              backgroundColors: submissionsStatusDataset.map(
                item => item.backgroundColor
              ),
            }}
            title={'Estado de Entregas'}
            legendPosition={'right'}
          />
        </Box>
        <StackedBarChart
          labels={reviewerStatusDataset.labels}
          data={reviewerStatusDataset.datasets}
          title={'Estado de Entregas según Corrector'}
          horizontal={true}
        />
      </Stack>
    </Stack>
  );
};

const AssignmentDashboardPage = ({
  assignmentId,
  courseId,
}: {
  assignmentId: string;
  courseId: string;
}) => {
  const courseContext = useUserContext();
  const data = useLazyLoadQuery<AssignmentQuery>(AssignmentQueryDef, {
    id: assignmentId,
    courseId,
    includeSubmissions: courseContext.userIsTeacher || false, // Include for charts
  });

  const assignment = data.viewer?.course?.assignment;

  if (!assignment) {
    return null;
  }

  return (
    <>
      <Grid gap="30px" templateRows="auto auto 90%" templateColumns="3fr auto 2fr">
        <GridItem rowSpan={1} colSpan={3}>
          <Flex gap="20px" alignItems={'center'}>
            <Heading textOverflow={'ellipsis'} overflow={'hidden'} whiteSpace="nowrap">
              {assignment.title}
            </Heading>
            <AssignmentPersistActions />
          </Flex>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3}>
          <AssignmentNavigationActions assignment={assignment} />
        </GridItem>
        <GridItem rowSpan={1} colSpan={1}>
          <Stack gap={'20px'} width={'100%'}>
            {assignment.description && (
              <BoxWithTopAndBottomBorders>
                <Text>{assignment.description}</Text>
              </BoxWithTopAndBottomBorders>
            )}
            <AssignmentDetails assignment={assignment} />
          </Stack>
        </GridItem>
        {courseContext.userHasPermission(Permission.ViewCourseCharts) && (
          <>
            <GridItem rowSpan={1} colSpan={1}>
              <Divider h="95%" />
            </GridItem>
            <GridItem rowSpan={1} colSpan={1}>
              <AssignmentCharts assignment={assignment} />
            </GridItem>
          </>
        )}
      </Grid>
    </>
  );
};

const EmptyState = () => {
  return (
    <>
      <Skeleton h="35px" />
      <Skeleton h="35px" />
      <Skeleton h="35px" />
      <Skeleton h="35px" />
    </>
  );
};

const AssignmentPageContainer = () => {
  const { assignmentId } = useParams();
  const courseContext = useUserContext();
  const courseId = courseContext.courseId;

  if (!assignmentId || !courseId) {
    return null;
  }

  return (
    <PageDataContainer gap="25px">
      <Suspense fallback={<EmptyState />}>
        <AssignmentDashboardPage assignmentId={assignmentId} courseId={courseId} />
      </Suspense>
    </PageDataContainer>
  );
};

export default () => {
  return (
    <Navigation>
      <AssignmentPageContainer />
    </Navigation>
  );
};
