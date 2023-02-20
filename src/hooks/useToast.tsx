import { useToast as chakraUseToast } from '@chakra-ui/react';

import type { UseToastOptions } from '@chakra-ui/react';

const useToast = (opts?: UseToastOptions) => {
  return chakraUseToast({ duration: 3000, isClosable: true, ...opts });
};

export default useToast;
