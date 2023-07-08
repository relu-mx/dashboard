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
import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    where

} from "firebase/firestore";
import {db} from "../firebaseConfig";

import RequestsTable from "../components/tables/RequestsTable";
import Iconify from "../components/iconify";


export default function RequestsPage() {
    const [open, setOpen] = useState(null);
    //const [snapShot, setSnapShot] = useState(null);

    const [selected, setSelected] = useState([]);
    const [rows, setRows] = useState([]);


    useEffect(() => {
        // ask permission to send notifications
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') {
                console.log('Notification permission granted.');
            } else {
                console.log('Unable to get permission to notify.');
            }
        });

        const q = query(
            collection(db, "messages"), where("completed", "==", false));

        const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
            let messages = [];
            QuerySnapshot.forEach((doc) => {
                // if notification allowed, send notification with doc.data() as message
                if (Notification.permission === 'granted') {
                    navigator.serviceWorker.getRegistration().then((reg) => {
                        reg.showNotification(doc.data().message);
                    });
                }
                
                messages.push({ ...doc.data(), id: doc.id });
            });
            setRows(messages);
        });
        return () => {
            unsubscribe()
        };
    }, []);

        

    const handleCloseMenu = () => {
        setOpen(null);
    };

   

    // mark seleted rows as completed, remove them from the table
    const completeSelected =  () => {
        let newRows = rows.filter((row) => !selected.includes(row.id));
        // update database, set each request "completed" field to true
        selected.forEach(async (id) => {
            await updateDoc(doc(db, "messages", id), {
                completed: true
            });
        });


        setRows(newRows);
        setSelected([]);
    };

    


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
                        <Button variant="contained" onClick={completeSelected} startIcon={<Iconify icon="uil:check"/>}>
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
