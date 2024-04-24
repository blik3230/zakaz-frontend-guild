import * as React from "react";
import {ReactNode, useState} from "react";
import Box from "@mui/material/Box";
import {Button, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import useAuthService from "../../hooks/useAuthService";

interface SingUpFormProps {
  children?: ReactNode;

  onClickToLogin(): void;
}

type SignInFields = {
  email: string;
  password: string;
  confirmPassword?: string;
  error: boolean;
};

const useFieldsStorage = <Fields extends {}>(initialFields: Fields) => {
  const [signInFields, setSignInFields] = useState<Fields>(initialFields);

  const updateFields = <Name extends keyof SignInFields>(name: Name, value: SignInFields[Name]) => {
    setSignInFields(current => ({
      ...current,
      [name]: value
    }))
  };

  const getUpdateValueFn = <Name extends keyof SignInFields>(name: Name) => (value: SignInFields[Name]) => updateFields(name, value);

  return {
    fields: signInFields,
    getUpdateValueFn,
    updateFields,
  };
};

const signUpFormInitFields: SignInFields = {
  email: '',
  password: '',
  confirmPassword: '',
  error: false,
}

const SignUpForm = ({onClickToLogin}: SingUpFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUpError, setSignUpError] = useState(false);
  const {
    fields,
    getUpdateValueFn,
    updateFields,
  } = useFieldsStorage(signUpFormInitFields);
  const authService = useAuthService();

  function handleSubmit() {

  }

  const createHandlerInputChange = (inputName: keyof Omit<SignInFields, 'error'>) => {
    return (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      updateFields('error', false);

      updateFields(inputName, e.target.value);
    };
  }


  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{mt: 1}}
    >
      <Typography variant={'h4'} mb={2}>Welcome to <br/>Zakaz Frontend Guild 👋🏻</Typography>
      <Typography variant={'body1'} mb={2}>
        Your path starts here <Typography component={'span'} sx={{fontSize: '26px'}}>👣</Typography>
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
        error={signUpError}
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
        error={fields.error}
        onChange={createHandlerInputChange('password')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="confirmPassword"
        id="confirmPassword"
        autoComplete="off"
        value={password}
        error={fields.error}
        onChange={createHandlerInputChange('password')}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{mt: 3, mb: 2}}
        size={'large'}
      >
        Sign Up
      </Button>

      <Box display={'flex'} justifyContent={'center'}>
        <Typography variant={'body2'}>
          Already have an account?
        </Typography>
        <Link
          component="button"
          type={'button'}
          variant="body2"
          sx={{ml: 'auto'}}
          onClick={onClickToLogin}
        >
          Sign in instead
        </Link>
      </Box>
    </Box>
  );
}

export default SignUpForm;