import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react';
import { theme } from 'theme';

type Props = TooltipProps;

const Tooltip = (props: Props) => {
  return (
    <ChakraTooltip hasArrow fontSize={theme.styles.global.body.fontSize} {...props}>
      {props.children}
    </ChakraTooltip>
  );
};

export default Tooltip;
