import {
  getGradeConfiguration,
  getSubmissionMissingStatusConfiguration,
  getSubmissionReviewStatusConfiguration,
} from 'app/submissions';
import { theme } from 'theme';
import Link from 'components/Link';
import { ReviewStatusBadge } from 'components/review/ReviewStatusBadge';
import { ReviewGradeBadge } from 'components/review/ReviewGradeBadge';
import { Stack } from '@chakra-ui/react';
import Tooltip from 'components/Tooltip';
import { getGithubRepoUrlFromPullRequestUrl } from 'utils/github';
import IconButton from 'components/IconButton';
import RepositoryIcon from 'icons/RepositoryIcon';
import PullRequestIcon from 'icons/PullRequestIcon';
import Table from 'components/Table';
import React, { ReactNode } from 'react';
import { RowData } from 'pages/courses/assignments/submissions';
import { Nullable, Optional } from 'types';

type ExtraColumn = {
  header: string;
  content: (rowData: RowData) => ReactNode;
  columnIndex: number;
};

export const SubmissionsTable = ({
  rowDataList,
  submitterNameHeader,
  onRowClick,
  updateSelectedSubmitterCallback,
  updateSelectedReviewerCallback,
  extraColumn,
}: {
  rowDataList: RowData[];
  submitterNameHeader: string;
  onRowClick: (rowData: RowData) => void;
  updateSelectedSubmitterCallback?: (submitterId: Optional<Nullable<string>>) => void;
  updateSelectedReviewerCallback: (submitterId: Optional<Nullable<string>>) => void;
  extraColumn?: ExtraColumn;
}) => {
  const baseHeaders = [
    submitterNameHeader,
    'Trabajo Práctico',
    'Corrector',
    'Estado',
    'Nota',
    '',
  ];
  const headers = extraColumn
    ? [
        ...baseHeaders.slice(0, extraColumn.columnIndex),
        extraColumn.header,
        ...baseHeaders.slice(extraColumn.columnIndex),
      ]
    : baseHeaders;
  return (
    <Table
      headers={headers}
      rowOptions={rowDataList.map(rowData => {
        // FIXME
        const reviewStatusConfiguration = rowData.submission?.id
          ? getSubmissionReviewStatusConfiguration({
              grade: rowData.submission?.grade,
              revisionRequested: rowData.submission?.revisionRequested,
            })
          : getSubmissionMissingStatusConfiguration();
        const gradeConfiguration = getGradeConfiguration(rowData.submission?.grade);

        const baseContent = [
          /* If no callback set, show as simple string */
          updateSelectedSubmitterCallback ? (
            <Link // Link without redirect
              onClick={event => {
                event.stopPropagation(); // This prevents the click from propagating to the parent row
                updateSelectedSubmitterCallback(rowData.submitter.id);
              }}
            >
              {rowData.submitter.name}
            </Link>
          ) : (
            rowData.submitter.name
          ),
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
          rowData.submission?.pullRequestUrl && (
            <Stack direction={'row'}>
              <Tooltip label={'Ir a repositorio'}>
                <Link
                  href={getGithubRepoUrlFromPullRequestUrl(
                    rowData.submission?.pullRequestUrl
                  )}
                  isExternal
                  onClick={event => event.stopPropagation()} // Avoid row click behaviour
                >
                  <IconButton
                    variant={'ghost'}
                    aria-label="repository-link"
                    icon={<RepositoryIcon />}
                  />
                </Link>
              </Tooltip>
              <Tooltip label={'Ir a pull request'}>
                <Link
                  href={rowData.submission?.pullRequestUrl}
                  isExternal
                  onClick={event => event.stopPropagation()} // Avoid row click behaviour
                >
                  <IconButton
                    variant={'ghost'}
                    aria-label="pull-request-link"
                    icon={<PullRequestIcon />}
                  />
                </Link>
              </Tooltip>
            </Stack>
          ),
        ];
        const content = extraColumn
          ? [
              ...baseContent.slice(0, extraColumn.columnIndex),
              extraColumn.content(rowData),
              ...baseContent.slice(extraColumn.columnIndex),
            ]
          : baseContent;

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
