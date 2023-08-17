import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Button, Checkbox} from "@mui/material";
import RequestInformationDialog from "../dialogs/RequestInformationDialog";

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function RequestsTable({ rows, selected, setSelected }) {
    const classes = useStyles();
    const [requestInformation, setRequestInformation] = useState({});
    const [open, setOpen] = useState(false);

    const onClose = () => {
        setOpen(false)
    }

    const sortedRows = rows.sort((a, b) => {
        if (a.time < b.time) {
            return -1;
        }
        if (a.time > b.time) {
            return 1;
        }
        return 0;
    })
    useEffect(() => {
        console.log(rows)
    }, [])
    const handleRowSelect = (rowId) => {
        if (selected.includes(rowId)) {
            setSelected(selected.filter((id) => id !== rowId));
        } else {
            setSelected([...selected, rowId]);
        }
    };

    const firebaseTimestampToDateString = (timestamp) => {
        const date = timestamp.toDate();
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };

    const handleOpenDialog = (information) => {
        setRequestInformation(information)
        setOpen(true);
    }

    return  (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Guest Request Table">
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>

                        <TableCell>Huesped</TableCell>
                        <TableCell>Habitacion</TableCell>
                        <TableCell>Solicitud</TableCell>
                        <TableCell>Fecha/Hora</TableCell>
                        <TableCell>Informacion adicional</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        sortedRows.map((row) => {
                            console.log(row)
                            return (
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
                                    <TableCell>{firebaseTimestampToDateString(row.time)}</TableCell>
                                    <TableCell><Button onClick={(() => {handleOpenDialog(row.information)})}>Ver informacion</Button></TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
            <RequestInformationDialog onClose={onClose} open={open} information={requestInformation}/>
        </TableContainer>
    );
}

RequestsTable.propTypes = {
    rows: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            guest_name: PropTypes.string.isRequired,
            room_number: PropTypes.string.isRequired,
            request_type: PropTypes.string.isRequired,
            time: PropTypes.object.isRequired,
            information: PropTypes.string.isRequired,
        })
    ).isRequired,
    selected: PropTypes.arrayOf(PropTypes.number).isRequired,
    setSelected: PropTypes.func.isRequired,
};

export default RequestsTable;
