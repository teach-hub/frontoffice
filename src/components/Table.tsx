import { ReactNode } from 'react';
import { TableContainer, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';

import { theme } from 'theme';

type Props = {
  headers: string[];
  cellsContent: ReactNode[][];
};

export default (props: Props) => {
  // TODO. Parametrizar estilos, etc.

  return (
    <TableContainer borderRadius="10px">
      <Table colorScheme="black" variant="simple">
        <Thead
          textColor="white"
          background={theme.colors.teachHub.primaryLight}
          fontWeight="bold"
        >
          {props.headers.map(h => (
            <Td textAlign="center">{h}</Td>
          ))}
        </Thead>
        <Tbody>
          {props.cellsContent.map(cellContent => (
            <Tr>
              {cellContent.map(cell => (
                <Td textAlign={'center'}>{cell}</Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
