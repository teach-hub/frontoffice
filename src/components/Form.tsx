import { Formik, FormikErrors, FormikValues } from 'formik';
import { Flex, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';

import Box from 'components/Box';
import Button from 'components/Button';

import { theme } from 'theme';
import { FormErrors } from 'types';

export interface FormInputFieldData {
  label: string;
  readError: (errors: FormikErrors<FormikValues>) => string | undefined;
  isFieldEnabled?: boolean;
  inputComponent: (
    values: FormikValues,
    handleChange: (event: React.ChangeEvent<any>) => void
  ) => JSX.Element;
  nextToLabel?: boolean;
}

export interface OnSubmitFormData {
  text: string;
  onClick: (values: any) => void;
}

export interface OnCancelFormData {
  text: string;
  onClick: () => void;
}

export interface FormData<T> {
  initialValues: T;
  validateForm: (values: T) => FormErrors<T>;
  inputFields: FormInputFieldData[];
  onSubmitForm: OnSubmitFormData;
  onCancelForm: OnCancelFormData;
  buttonsEnabled: boolean;
}

export const Form = (formData: FormData<any>) => {
  const {
    initialValues,
    inputFields,
    validateForm,
    onCancelForm,
    onSubmitForm,
    buttonsEnabled,
  } = formData;
  return (
    <Formik
      initialValues={initialValues}
      validate={validateForm}
      onSubmit={onSubmitForm.onClick}
      onReset={onCancelForm.onClick}
    >
      {({
        values,
        errors,
        handleChange,
        handleReset,
        isSubmitting,
        isValid,
        handleSubmit,
      }) => (
        <Flex direction={'column'} justifyContent={'space-evenly '} gap={'20px'}>
          {inputFields
            .filter(({ isFieldEnabled }) => isFieldEnabled ?? true)
            .map(({ readError, label, inputComponent, nextToLabel }) => (
              <FormControl
                style={nextToLabel ? { display: 'flex', alignItems: 'center' } : {}}
                isInvalid={!!readError(errors)}
                key={label}
              >
                <FormLabel fontWeight="bold" fontSize={theme.styles.global.body.fontSize}>
                  {label}
                </FormLabel>
                {inputComponent(values, handleChange)}
                <FormErrorMessage>{readError(errors)}</FormErrorMessage>
              </FormControl>
            ))}

          {buttonsEnabled && (
            <Box my={15} display={'flex'} justifyContent={'flex-end'}>
              <Button
                variant="ghost"
                w={'full'}
                mr={'10%'}
                onClick={handleReset}
                disabled={isSubmitting}
                borderColor={theme.colors.teachHub.black}
                borderWidth="1px"
              >
                {onCancelForm.text}
              </Button>
              <Button
                w={'full'}
                disabled={isSubmitting || !isValid}
                onClick={() => handleSubmit()}
              >
                {onSubmitForm.text}
              </Button>
            </Box>
          )}
        </Flex>
      )}
    </Formik>
  );
};
