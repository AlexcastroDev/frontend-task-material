import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { FunctionComponent } from 'react';
import { Row } from './components/Row';
import { StyledContainer } from './Home.styles';
import { useAppContext } from '@root/contexts/AppProvider';

export const Home: FunctionComponent = () => {
  const { cities } = useAppContext()
  
  return (
    <StyledContainer>
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table" >
          <TableHead>
            <TableRow>
              <TableCell width={68} />
              <TableCell>City</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cities.data.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledContainer>
  );
}
