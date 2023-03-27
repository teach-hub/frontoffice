import { Card as ChakraCard, CardBody as ChakraBody, CardProps } from '@chakra-ui/react'

const CardStyle = {
  shadow: 'md',
  margin: '10px',
  background: 'blue.50',
  variant: 'outline',
  borderColor: 'black',
  borderWidth: '1px',
} as const;

const CardBodyStyle = {
  display: 'flex',
  alignItems: 'center'
} as const;


type Props = CardProps;

export default ({ children, ...rest }: Props) => {
  return (
    <ChakraCard sx={CardStyle} {...rest}>
      <ChakraBody sx={CardBodyStyle}>
        {children}
      </ChakraBody>
    </ChakraCard>
  );
};
