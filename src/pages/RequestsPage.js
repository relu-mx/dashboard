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

                
                messages.push({ ...doc.data(), id: doc.id });
            });

            
            // remove any row in which time is not present
            messages = messages.filter((message) => message.time !== undefined);
            
            setRows(messages);

        });
        return () => {
            unsubscribe()
        };
    }, []);

    // get message with id
    const getMessageWithId =  (id) => {
        
        return rows.find((message) => message.id === id);

    }
        

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

    const errorSelected = async () => {

        const url = "https://concierge-ai-app.onrender.com/request-failed"

        // send cancelled request to server
        selected.forEach(async (request) => {
            const document = getMessageWithId(request);
            console.log(request);
                let options = {
                    method: 'POST',
                    headers: {
                    Accept: '*/*',
                    'User-Agent': 'Thunder Client (https://www.thunderclient.com)',
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        from: document.from,
                    })
                };

                fetch(url, options)
                .then(res => res.json())
                .then(json => console.log(json))
                .catch(err => console.error('error:' + err));

                // update document, add completed: true
                await updateDoc(doc(db, "messages", request), {
                    completed: true
                });
                
        }
        );

    }

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
                        <Stack direction={"row"} columnGap={5}>
                        <Button variant="contained" onClick={completeSelected} startIcon={<Iconify icon="uil:check"/>}>
                            Marcar completada
                        </Button>
                        <Button variant="contained" onClick={errorSelected} startIcon={<Iconify icon="basil:cross-outline"/>} color={"error"}>
                        Rechazar
                        </Button>
                        </Stack>
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
