import Markdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';

/**
 * ChakraUIRenderer required for rendering markdown with ChakraUI components,
 * due to styling conflicts
 * */
export default ({ markdown }: { markdown: string }) => {
  return (
    <Markdown components={ChakraUIRenderer()} skipHtml>
      {markdown}
    </Markdown>
  );
};
