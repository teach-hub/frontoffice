import { GroupSubmitterRowData, RowData } from 'components/SubmissionsTable';
import useToast from 'hooks/useToast';
import React, { useState } from 'react';
import { useMutation } from 'react-relay';
import { SendAssignmentNotificationMutation } from '__generated__/SendAssignmentNotificationMutation.graphql';
import SendAssignmentNotificationMutationDef from 'graphql/SendAssignmentNotificationMutation';
import { Flex, SimpleGrid, Stack } from '@chakra-ui/react';
import Spinner from 'components/Spinner';
import Textarea from 'components/Textarea';
import Button from 'components/Button';
import CheckboxGroup from 'components/CheckboxGroup';
import { Checkbox } from 'components/Checkbox';

type NotifyData = {
  name: string;
  mail: string;
};

const NotifyModalContent = ({
  rowToNotify,
  onCompleted,
  courseId,
}: {
  rowToNotify: RowData;
  onCompleted: () => void;
  courseId: string;
}) => {
  const toast = useToast();
  const [mailBody, setMailBody] = useState<string>('');
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  const notifyData: NotifyData[] = (
    rowToNotify?.submitter && rowToNotify.submitter.isGroup
      ? (rowToNotify.submitter as GroupSubmitterRowData).participants.map(p => ({
          name: p.name,
          mail: p.notificationEmail,
        }))
      : [
          {
            name: rowToNotify?.submitter?.name,
            mail: rowToNotify?.submitter?.notificationEmail,
          },
        ]
  ).filter(Boolean) as NotifyData[];

  const [selectedMails, setSelectedMails] = useState<string[]>(
    notifyData.map(x => x.mail).filter(Boolean) as string[]
  );

  const [commitSendAssignmentNotificationMutation] =
    useMutation<SendAssignmentNotificationMutation>(
      SendAssignmentNotificationMutationDef
    );

  const handleSendNotification = () => {
    setShowSpinner(true);
    commitSendAssignmentNotificationMutation({
      variables: {
        recipients: selectedMails,
        body: mailBody,
        assignmentId: rowToNotify.assignmentId,
        courseId: courseId,
      },
      onCompleted: (result, errors) => {
        setShowSpinner(false);
        if (errors?.length) {
          toast({
            title: 'Error',
            description: 'No se pudo enviar la notificación',
            status: 'error',
          });
        } else {
          onCompleted();
          toast({
            title: 'Notificación enviada',
            status: 'success',
          });
        }
      },
    });
  };

  return (
    <Stack gap={10}>
      <Spinner
        isOpen={showSpinner}
        onClose={() => {
          setShowSpinner(false);
        }}
      />
      ;
      <NotifyStudentsCheckboxGroup
        notifyData={notifyData}
        checkedValues={selectedMails}
        handleAddUsersCheckboxGroupChange={setSelectedMails}
      />
      <Textarea
        value={mailBody}
        onChange={event => {
          setMailBody(event.target.value);
        }}
        rows={10}
        width={'40vw'}
        placeholder={'Mensaje a enviar'}
      />
      <Flex justifyContent={'flex-end'}>
        <Button disabled={!selectedMails.length} onClick={handleSendNotification}>
          Enviar
        </Button>
      </Flex>
    </Stack>
  );
};

const NotifyStudentsCheckboxGroup = ({
  notifyData,
  checkedValues,
  handleAddUsersCheckboxGroupChange,
}: {
  notifyData: NotifyData[];
  checkedValues: string[];
  handleAddUsersCheckboxGroupChange: (checkedValues: string[]) => void;
}) => {
  return (
    <CheckboxGroup value={checkedValues} onChange={handleAddUsersCheckboxGroupChange}>
      <SimpleGrid columns={1} spacingY={4} alignItems="center">
        {notifyData.map(
          student =>
            student.mail && (
              <Checkbox key={student.mail} id={student.mail} value={student.mail}>
                {`${student.name} (${student.mail})`}
              </Checkbox>
            )
        )}
      </SimpleGrid>
    </CheckboxGroup>
  );
};

export default NotifyModalContent;
