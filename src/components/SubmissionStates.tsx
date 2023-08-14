import { Timeline, TimelineItem } from 'components/Timeline';
import { FiHome } from 'react-icons/fi';

import { formatAsSimpleDateTime } from 'utils/dates';
import { CheckIcon } from '@chakra-ui/icons';

export default function SubmissionStates() {
  return (
    <Timeline title="Eventos">
      <TimelineItem icon={CheckIcon} skipTrail>
        {`${formatAsSimpleDateTime(new Date().toISOString())}`} - Re-entregado
      </TimelineItem>
    </Timeline>
  );
}
