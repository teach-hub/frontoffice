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
          <Tr>
            {props.headers.map((h, i) => (
              <Td key={`${i}`} textAlign="center">
                {h}
              </Td>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {props.cellsContent.map((cellContent, k) => (
            <Tr key={k}>
              {cellContent.map((cell, i) => (
                <Td key={`${i}`} textAlign={'center'}>
                  {cell}
                </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
