import { Helmet } from 'react-helmet-async';
import {useEffect, useState} from 'react';
// @mui
import {
    Card,
    Stack,

    Button,
    Popover,

    MenuItem,

    Container,
    Typography,

} from '@mui/material';

import RequestsTable from "../components/tables/RequestsTable";
import Iconify from "../components/iconify";


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
