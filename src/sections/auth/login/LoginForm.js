import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import {useSignInWithEmailAndPassword} from "react-firebase-hooks/auth";
import {auth} from "../../../firebaseConfig";

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [showPassword, setShowPassword] = useState(false);
    const [
        signInWithEmailAndPassword,

    ] = useSignInWithEmailAndPassword(auth);



  const handleClick = () => {

      signInWithEmailAndPassword(email, password)
          .then((credentials) => {

              if (credentials.user && credentials.user.uid === "3eDTJC7YwASH2wLX21dD3dEfpwj1") {
                  navigate('/dashboard', { replace: true });
              } else {
                  navigate('/dashboard/requests', { replace: true });
              }
        })
          .catch((err) => {
              console.log(err)
          })
  };

  const handleEmailChange = (event) => {
      setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
      setPassword(event.target.value)
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField name="email" label="Correo electronico" onChange={handleEmailChange} />

        <TextField
          name="password"
          label="Contraseña"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
          onChange={handlePasswordChange}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Link variant="subtitle2" underline="hover">
          Restablecer contraseña
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Iniciar Sesion
      </LoadingButton>
    </>
  );
}
