import { Formik, FormikConfig, FormikErrors, FormikProps, FormikValues } from 'formik';
import {
  Flex,
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/react';

import Box from 'components/Box';
import Button from 'components/Button';

import { theme } from 'theme';

type FormInputFieldData<T> = {
  label: string;
  readError: (errors: FormikErrors<T>) => string;
  isFieldEnabled?: boolean;
  inputComponent: (
    values: FormikValues,
    handleChange: FormikProps<T>['handleChange'],
    setFieldValue: FormikProps<T>['setFieldValue']
  ) => FormControlProps['children'];
  nextToLabel?: boolean;
};

type OnSubmitFormData<T> = {
  text: string;
  onClick: FormikConfig<T>['onSubmit'];
};

type OnCancelFormData<T> = {
  text: string;
  onClick: FormikConfig<T>['onReset'];
};

type Props<T> = {
  initialValues: FormikProps<T>['initialValues'];
  validateForm: FormikConfig<T>['validate'];
  inputFields: FormInputFieldData<T>[];
  onSubmitForm: OnSubmitFormData<T>;
  onCancelForm: OnCancelFormData<T>;
  buttonsEnabled: boolean;
};

const Form = <T extends FormikValues>(props: Props<T>) => {
  const {
    initialValues,
    inputFields,
    validateForm,
    onCancelForm,
    onSubmitForm,
    buttonsEnabled,
  } = props;

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
        setFieldValue,
        setSubmitting,
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
                {inputComponent(values, handleChange, setFieldValue)}
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
                onClick={() => {
                  handleSubmit();
                  setSubmitting(false);
                }}
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

export default Form;
