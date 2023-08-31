import { Stack } from '@chakra-ui/react';

import {
  getGradeConfiguration,
  getSubmissionReviewStatusConfiguration,
} from 'app/submissions';
import { getGithubRepoUrlFromPullRequestUrl } from 'utils/github';

import { theme } from 'theme';
import RepositoryIcon from 'icons/RepositoryIcon';
import PullRequestIcon from 'icons/PullRequestIcon';

import Link from 'components/Link';
import Tooltip from 'components/Tooltip';
import { ReviewStatusBadge } from 'components/review/ReviewStatusBadge';
import { ReviewGradeBadge } from 'components/review/ReviewGradeBadge';
import IconButton from 'components/IconButton';
import Table from 'components/Table';

import type { Nullable, Optional } from 'types';

enum ColumnWidth {
  Student = '20%',
  GroupName = '20%',
  Assignment = '20%',
  SubmissionStatus = '10%',
  Reviewer = '20%',
  Grade = '5%',
  Actions = '5%',
}

type ColumnData = {
  header: string;
  width: ColumnWidth;
};

export type SubjectRowData = {
  id: Optional<Nullable<string>>;
  name: Optional<Nullable<string>>;
};

export type SubmitterRowData = SubjectRowData & {
  isGroup: boolean;
};

export type GroupSubmitterRowData = SubmitterRowData & {
  participants: SubjectRowData[];
};

export type ReviewerRowData = SubjectRowData;

export type SubmissionRowData = {
  id?: Optional<Nullable<string>>;
  grade: Optional<Nullable<number>>;
  revisionRequested: Nullable<boolean>;
  pullRequestUrl?: Optional<Nullable<string>>;
  submittedAt: Optional<Nullable<string>>;
  submittedAgainAt: Optional<Nullable<string>>;
  reviewedAt: Optional<Nullable<string>>;
  reviewedAgainAt: Optional<Nullable<string>>;
};

export interface RowData {
  submitter: SubmitterRowData;
  reviewer?: ReviewerRowData;
  assignmentTitle: Optional<Nullable<string>>;
  submission?: SubmissionRowData;
}

export const SubmissionsTable = ({
  rowDataList,
  onRowClick,
  updateSelectedStudentCallback,
  updateSelectedReviewerCallback,
  groupParticipantsGetter,
}: {
  rowDataList: RowData[];
  onRowClick: (rowData: RowData) => void;
  updateSelectedStudentCallback: (submitterId: Optional<Nullable<string>>) => void;
  updateSelectedReviewerCallback: (submitterId: Optional<Nullable<string>>) => void;
  groupParticipantsGetter?: (rowData: RowData) => SubjectRowData[];
}) => {
  const isGroupTable = !!groupParticipantsGetter;

  const columns: ColumnData[] = [
    {
      header: isGroupTable ? 'Grupo' : 'Alumno',
      width: isGroupTable ? ColumnWidth.GroupName : ColumnWidth.Student,
    },
    isGroupTable
      ? {
          header: 'Alumnos',
          width: ColumnWidth.Student,
        }
      : null,
    {
      header: 'Trabajo Práctico',
      width: ColumnWidth.Assignment,
    },
    {
      header: 'Corrector',
      width: ColumnWidth.Reviewer,
    },
    {
      header: 'Estado',
      width: ColumnWidth.SubmissionStatus,
    },
    {
      header: 'Nota',
      width: ColumnWidth.Grade,
    },
    {
      header: '',
      width: ColumnWidth.Actions,
    },
  ].filter(Boolean) as ColumnData[];

  return (
    <Table
      headers={columns.map(column => column.header)}
      headersWidths={columns.map(column => column.width)}
      rowOptions={rowDataList.map(rowData => {
        const reviewStatusConfiguration = getSubmissionReviewStatusConfiguration({
          submission: rowData.submission,
          review: rowData.submission,
          missingSubmission: !rowData.submission?.id,
        });
        const gradeConfiguration = getGradeConfiguration(rowData.submission?.grade);

        const pullRequestUrl = rowData.submission?.pullRequestUrl;

        const content = [
          /* If group table, show as simple string */
          !isGroupTable ? (
            <Link // Link without redirect
              onClick={event => {
                event.stopPropagation(); // This prevents the click from propagating to the parent row
                updateSelectedStudentCallback(rowData.submitter.id);
              }}
            >
              {rowData.submitter.name}
            </Link>
          ) : (
            rowData.submitter.name
          ),
          isGroupTable ? (
            <Stack>
              {groupParticipantsGetter(rowData).map(participant => (
                <Link // Link without redirect
                  onClick={event => {
                    event.stopPropagation(); // This prevents the click from propagating to the parent row
                    updateSelectedStudentCallback(participant.id);
                  }}
                >
                  {participant.name}
                </Link>
              ))}
            </Stack>
          ) : null,
          rowData.assignmentTitle,
          <Link // Link without redirect
            onClick={event => {
              event.stopPropagation(); // This prevents the click from propagating to the parent row
              updateSelectedReviewerCallback(rowData.reviewer?.id);
            }}
          >
            {rowData.reviewer ? rowData.reviewer.name : '-'}
          </Link>,
          <ReviewStatusBadge reviewStatusConfiguration={reviewStatusConfiguration} />,
          <ReviewGradeBadge
            grade={rowData.submission?.grade}
            gradeConfiguration={gradeConfiguration}
          />,
          <Stack direction={'row'}>
            <Tooltip label={'Ir a repositorio'}>
              <Link
                href={
                  pullRequestUrl
                    ? getGithubRepoUrlFromPullRequestUrl(pullRequestUrl)
                    : undefined
                }
                isExternal
                onClick={event => event.stopPropagation()} // Avoid row click behaviour
              >
                <IconButton
                  variant={'ghost'}
                  aria-label="repository-link"
                  icon={<RepositoryIcon />}
                  disabled={!rowData.submission?.pullRequestUrl}
                />
              </Link>
            </Tooltip>
            <Tooltip label={'Ir a pull request'}>
              <Link
                href={pullRequestUrl ? pullRequestUrl : undefined}
                isExternal
                onClick={event => event.stopPropagation()} // Avoid row click behaviour
              >
                <IconButton
                  variant={'ghost'}
                  aria-label="pull-request-link"
                  icon={<PullRequestIcon />}
                  disabled={!rowData.submission?.pullRequestUrl}
                />
              </Link>
            </Tooltip>
          </Stack>,
        ].filter(Boolean);

        return {
          rowProps: {
            style: {
              cursor: 'pointer',
              transition: 'background-color 0.8s',
            },
            _hover: { bg: theme.colors.teachHub.gray },
            onClick: () => onRowClick(rowData),
          },
          content,
        };
      })}
    />
  );
};
