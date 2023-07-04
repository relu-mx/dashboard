import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Checkbox} from "@mui/material";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function RequestsTable({ rows, selected, setSelected }) {
    const classes = useStyles();

    const handleRowSelect = (rowId) => {
        if (selected.includes(rowId)) {
            setSelected(selected.filter((id) => id !== rowId));
        } else {
            setSelected([...selected, rowId]);
        }
    };


    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Guest Request Table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>

                        <TableCell>Guest Name</TableCell>
                        <TableCell>Room Number</TableCell>
                        <TableCell>Request Type</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Information</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={selected.includes(row.id)}
                                    onChange={() => handleRowSelect(row.id)}
                                />
                            </TableCell>
                            <TableCell>{row.guest_name}</TableCell>
                            <TableCell>{row.room_number}</TableCell>
                            <TableCell>{row.request_type}</TableCell>
                            <TableCell>{row.time}</TableCell>
                            <TableCell>{row.information}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

RequestsTable.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            guest_name: PropTypes.string.isRequired,
            room_number: PropTypes.string.isRequired,
            request_type: PropTypes.string.isRequired,
            time: PropTypes.string.isRequired,
            information: PropTypes.string.isRequired,
        })
    ).isRequired,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired,
    setSelected: PropTypes.func.isRequired,
};

export default RequestsTable;
