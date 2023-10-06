import { Tooltip as ChakraTooltip, TooltipProps } from '@chakra-ui/react';
import { theme } from 'theme';

type Props = TooltipProps;

const Tooltip = (props: Props) => {
  return (
    <ChakraTooltip hasArrow fontSize={theme.styles.global.body.fontSize} {...props}>
      {/* Wrap children in span in case of it not using forwardRef */}
      <span>{props.children}</span>
    </ChakraTooltip>
  );
};

export default Tooltip;
