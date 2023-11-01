import { Flex, Textarea } from '@chakra-ui/react';

import { theme } from 'theme';

import Form from 'components/Form';
import DateInputField from 'components/DateInputField';
import InputField from 'components/InputField';
import { Checkbox } from 'components/Checkbox';

import type { FormErrors, Nullable } from 'types';

export type InitialValues = {
  title: string;
  description: Nullable<string>;
  startDate: Nullable<string>;
  endDate: Nullable<string>;
  link: Nullable<string>;
  allowLateSubmissions: Nullable<boolean>;
  isGroup: Nullable<boolean>;
};

type Props = {
  validateForm: (values: InitialValues) => FormErrors<InitialValues>;
  onCancel: () => void;
  onSubmit: (values: InitialValues) => void;
  initialValues?: InitialValues;
};

export default ({ validateForm, onSubmit, onCancel, initialValues }: Props) => {
  return (
    <Flex direction={'column'} gap={'30px'} width={'400px'} paddingY={'20px'}>
      <Form
        buttonsEnabled
        initialValues={{
          title: initialValues?.title || '',
          description: initialValues?.description || '',
          startDate: initialValues?.startDate || null,
          endDate: initialValues?.endDate || null,
          link: initialValues?.link || '',
          allowLateSubmissions: initialValues?.allowLateSubmissions || false,
          isGroup: initialValues?.isGroup || false,
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
  );
};
