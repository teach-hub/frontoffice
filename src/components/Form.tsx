import { Formik, FormikErrors, FormikValues } from 'formik';
import Box from './Box';
import { Flex, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react';
import InputField from './InputField';
import Button from './Button';
import { FormErrors } from '../types';

export interface FormInputFieldData<T> {
  id: string;
  label: string;
  readValue: (values: FormikValues) => T;
  readError: (errors: FormikErrors<FormikValues>) => string | undefined;
  placeholder: T;
  type: string;
  pattern?: string;
  inputMode?:
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | 'search'
    | undefined;
  isFieldEnabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isReadOnly?: boolean;
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
  inputFields: FormInputFieldData<any>[];
  onSubmitForm: OnSubmitFormData;
  onCancelForm: OnCancelFormData;
  areReadOnly: boolean;
  buttonsEnabled: boolean;
}

export const Form = (formData: FormData<any>) => {
  const {
    initialValues,
    inputFields,
    validateForm,
    onCancelForm,
    onSubmitForm,
    areReadOnly,
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
            .map(
              ({
                id,
                readValue,
                placeholder,
                type,
                pattern,
                inputMode,
                onChange,
                readError,
                isReadOnly,
                label,
              }) => (
                <FormControl isInvalid={!!readError(errors)}>
                  <FormLabel fontWeight="bold">{label}</FormLabel>
                  <InputField
                    id={id}
                    value={readValue(values)}
                    onChange={onChange ?? handleChange}
                    placeholder={placeholder}
                    type={type}
                    pattern={pattern}
                    inputMode={inputMode}
                    isReadOnly={isReadOnly ? isReadOnly : areReadOnly}
                  />
                  <FormErrorMessage>{readError(errors)}</FormErrorMessage>
                </FormControl>
              )
            )}

          {buttonsEnabled && (
            <Box my={15} display={'flex'} justifyContent={'flex-end'}>
              <Button
                variant="ghost"
                w={'full'}
                mr={'10%'}
                onClick={handleReset}
                disabled={isSubmitting}
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
