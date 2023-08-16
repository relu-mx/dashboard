import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';


export default function RequestInformationTable({ jsonData }) {
    const keys = Object.keys(jsonData);

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Asunto</TableCell>
                        <TableCell>Valor</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {keys.map(key => (
                        <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{jsonData[key]}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};