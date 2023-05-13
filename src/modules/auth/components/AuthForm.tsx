import { Avatar, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import * as React from 'react';
import { FormEvent, useState } from 'react';
import MUILink from '../../../ui-kit/MUILink/MUILink';
import useAuthService from '../hooks/useAuthService';

const AuthForm = () => {
  const authService = useAuthService();
  const [loginError, setLoginError] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email: string = formData.get('email')?.toString() || '';
    const password: string = formData.get('password')?.toString() || '';
    const dataAreValid = email.length > 0 && password.length > 0;

    if (dataAreValid) {
      const successLogin = await authService.login(email, password);

      if (successLogin) {
        // todo: действия после авторизации
      } else {
        setLoginError(true);
      }
    }
  };

  const createHandlerInputChange = (inputName: 'email' | 'password') => {
    return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setLoginError(false);

      switch (inputName) {
        case 'email':
          setEmail(e.target.value);
          break;
        case 'password':
          setPassword(e.target.value);
          break;
      }
    };
  }


  return (
    <Box>
      <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
        <LockOutlinedIcon/>
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Box component="form" onSubmit={ handleSubmit } noValidate
           sx={ { mt: 1 } }>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="off"
          autoFocus
          value={email}
          error={loginError}
          onChange={createHandlerInputChange('email')}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="off"
          value={password}
          error={loginError}
          onChange={createHandlerInputChange('password')}
        />
        <FormControlLabel
          control={ <Checkbox value="remember" color="primary"/> }
          label="Remember me"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={ { mt: 3, mb: 2 } }
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <MUILink href="#">
              <Typography variant="body2">
                Forgot password?
              </Typography>
            </MUILink>
          </Grid>

          <Grid item>
            <MUILink href="#">
              <Typography variant="body2">{ `
                Don't have an account? Sign Up
              ` }</Typography>
            </MUILink>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AuthForm;
