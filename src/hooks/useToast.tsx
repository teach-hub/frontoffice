import type { UseToastOptions } from '@chakra-ui/react';
import { useToast as chakraUseToast } from '@chakra-ui/react';

const useToast = (opts?: UseToastOptions) => {
  return chakraUseToast({ duration: 3000, isClosable: true, ...opts });
};

type ShowToastProps = {
  toast: ReturnType<typeof useToast>;
  title: string;
  description?: string;
};

export const showErrorToast = ({ toast, title, description }: ShowToastProps) => {
  toast({
    title,
    description,
    status: 'error',
  });
};

export const showInfoToast = ({ toast, title, description }: ShowToastProps) => {
  toast({
    title,
    description,
    status: 'info',
  });
};

export const showSuccessToast = ({ toast, title, description }: ShowToastProps) => {
  toast({
    title,
    description,
    status: 'success',
  });
};

export const showWarningToast = ({ toast, title, description }: ShowToastProps) => {
  toast({
    title,
    description,
    status: 'warning',
  });
};

export default useToast;
