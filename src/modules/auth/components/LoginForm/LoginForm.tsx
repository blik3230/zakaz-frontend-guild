import {Box, Button, TextField, Typography} from '@mui/material';
import * as React from 'react';
import {FormEvent, useState} from 'react';
import useAuthService from '../../hooks/useAuthService';
import Link from "@mui/material/Link";
import {useRouter} from "next/router";

interface LoginFormProps {
  onClickToSignUp(): void;
}

const LoginForm = ({onClickToSignUp}: LoginFormProps) => {
  const router = useRouter();
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
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{mt: 1}}
    >
      <Typography variant={'h5'} mb={2}>
        Please sign-in to your account <Typography component={'span'} sx={{fontSize: '26px'}}>🚀</Typography>
      </Typography>

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
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{mt: 3, mb: 2}}
        size={'large'}
      >
        Login
      </Button>

      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant={'body2'}>
          New on our guild?
        </Typography>
        <Link
          component="button"
          type={'button'}
          variant="body2"
          sx={{ml: 'auto'}}
          onClick={onClickToSignUp}
        >
          Create an account
        </Link>
      </Box>
    </Box>
  );
};

export default LoginForm;
