import { Avatar, Box, Typography, TextField, FormControlLabel, Checkbox, Button, Grid } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FormEvent } from 'react';
import MUILink from '../../../ui-kit/MUILink/MUILink';

const AuthForm = () => {
  const auth = getAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email: string = formData.get('email')?.toString() || '';
    const password: string = formData.get('password')?.toString() || '';

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => console.log('user signed in', userCredential))
      .catch(err => console.log('sing in error', err));

  };

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
