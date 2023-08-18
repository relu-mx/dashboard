import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';



const columns = [
    { id: 'guestId', label: 'Guest ID' },
    { id: 'guestName', label: 'Guest Name' },
    { id: 'phoneNumber', label: 'Phone Number' },
    { id: 'nightsStaying', label: 'Nights Staying' },
    { id: 'isActive', label: 'Is Active' },
];

const PaginatedTable = (props) => {

    const {rows, page, rowsPerPage, handleChangePage, handleChangeRowsPerPage} = props;


    return (
        <TableContainer component={Paper}>
            <Table aria-label="guests table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell key={column.id}>{column.label}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {

                            return (<TableRow key={row.guestId}>
                                <TableCell>{row.guestId}</TableCell>
                                <TableCell>{row.guestName}</TableCell>
                                <TableCell>{row.phoneNumber}</TableCell>
                                <TableCell>{row.nightsStaying}</TableCell>
                                <TableCell>{`${row.isActive ? "Yes" :  "No"}`}</TableCell>
                            </TableRow>)
                    })}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    );
};

export default PaginatedTable;
