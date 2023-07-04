import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import {useEffect, useState} from 'react';
// @mui
import {
    Card,
    Table,
    Stack,
    Paper,
    Avatar,
    Button,
    Popover,
    Checkbox,
    TableRow,
    MenuItem,
    TableBody,
    TableCell,
    Container,
    Typography,
    IconButton,
    TableContainer,
    TablePagination,
} from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';
import RequestsTable from "../components/tables/RequestsTable";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'guestName', label: 'Huésped', alignRight: false },
    { id: 'roomNumber', label: 'Habitacion', alignRight: false },
    { id: 'requestType', label: 'Solicitud', alignRight: false },
    { id: 'time', label: 'Hora', alignRight: false },
    { id: 'data', label: 'Informacion', alignRight: false },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    if (query) {
        return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
}

export default function RequestsPage() {
    const [open, setOpen] = useState(null);

    const [selected, setSelected] = useState([]);

    useEffect(() => {
        console.log(selected)
    }, [selected]);


    const handleCloseMenu = () => {
        setOpen(null);
    };

    const rows = [
        {
            id: 1,
            guest_name: 'John Doe',
            room_number: '101',
            request_type: 'Maintenance',
            time: '9:30 AM',
            information: 'Need assistance with the air conditioning.',
        },
        // Add more rows as needed
    ];

    return (
        <>
            <Helmet>
                <title> Solicitudes </title>
            </Helmet>


            <Container>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                    <Typography variant="h4" gutterBottom>
                        Administrar solicitudes
                    </Typography>
                    {   !(selected.length === 0) &&
                        <Button variant="contained" startIcon={<Iconify icon="uil:check"/>}>
                            Marcar completada
                        </Button>
                    }
                </Stack>

                <Card>
                    <RequestsTable rows={rows}  selected={selected} setSelected={setSelected}/>
                </Card>
            </Container>

            <Popover
                open={Boolean(open)}
                anchorEl={open}
                onClose={handleCloseMenu}
                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                PaperProps={{
                    sx: {
                        p: 1,
                        width: 140,
                        '& .MuiMenuItem-root': {
                            px: 1,
                            typography: 'body2',
                            borderRadius: 0.75,
                        },
                    },
                }}
            >
                <MenuItem>
                    <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                    Edit
                </MenuItem>

                <MenuItem sx={{ color: 'error.main' }}>
                    <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                    Delete
                </MenuItem>
            </Popover>
        </>
    );
}
