import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { IRow } from "./Row.interface";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Skeleton from '@mui/material/Skeleton';
import { Alert } from "@mui/material";
import { useMutation } from "react-query";
import { IGetCityResponse } from "@root/interfaces/useCities.interface";
import useCities from "@root/hooks/useCities";

export const Row: FunctionComponent<IRow> = ({ row }) => {
  const cities = useCities()
  const [open, setOpen] = useState(false);

  const { isLoading, data, mutate: fetchCity } = useMutation(async (id: number) => {
    const response: IGetCityResponse = await cities.getCity({ id })
    return response
  })

  const handleClickAction = useCallback(() => {
    setOpen(!open)
    fetchCity(row.id)
  }, [open])

    const renderLazyTable = useMemo(() => {
      if(isLoading) {
        return <Skeleton animation="pulse" variant="rectangular" width="100%" height={100}></Skeleton>
      }

      if(!data && !isLoading) {
        return <Alert severity="info"> No data found</Alert>
      }

      return (
          <Table aria-label="purchases">
            <TableHead>
              <TableRow>
                <TableCell>Country</TableCell>
                <TableCell>Subcountry</TableCell>
                <TableCell>Geonameid</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    { data?.country }
                  </TableCell>
                  <TableCell>{ data?.subcountry || "" }</TableCell>
                  <TableCell>{ data?.id }</TableCell>
                </TableRow>
            </TableBody>
          </Table>
      )
    }, [data, isLoading])

    return (
      <>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              data-testid="action-button-row"
              aria-label="expand row"
              size="small"
              onClick={handleClickAction}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  Details
                </Typography>

                { renderLazyTable }
                
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
        </>
    );
}