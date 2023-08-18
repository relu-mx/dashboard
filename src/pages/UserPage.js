import { Helmet } from 'react-helmet-async';

import {useEffect, useState} from 'react';
// @mui
import {

  Stack,

  Container,
  Typography,

} from '@mui/material';
// components

import axios from "axios";
import PaginatedTable from "../components/tables/UsersTable";


export default function UserPage() {

  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const url = `https://concierge-ai-app.onrender.com/guests`;

    axios.get(url)
        .then(response => {
          const res = response.data.map((guest) => {
            return {
              guestId: guest.guest_id,
              guestName: guest.guest_name,
              phoneNumber: guest.guest_phone_number,
              nightsStaying: guest.nights_staying,
              isActive: guest.status,
            }
          })
          setUsers(res)
        })
        .catch((error) => console.log(error))

  }, [page, rowsPerPage])



  const handleChangePage = (_, newPage) => {
    const url = `https://concierge-ai-app.onrender.com/guests`;

    axios.get(url)
        .then(response => {
          const res = response.data.map((guest) => {
            return {
              guestId: guest.guest_id,
              guestName: guest.guest_name,
              phoneNumber: guest.guest_phone_number,
              nightsStaying: guest.nights_staying,
              isActive: guest.status,
            }
          })
          setUsers(res)
        })
        .catch((error) => console.log(error))
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Helmet>
        <title> Users | Concierge Ai </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>

        </Stack>

        <PaginatedTable rows={users} page={page} handleChangeRowsPerPage={handleChangeRowsPerPage} rowsPerPage={rowsPerPage} handleChangePage={handleChangePage} />


      </Container>


    </>
  );
}
