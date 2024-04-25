import * as React from "react";
import {FormEvent, ReactNode, useState} from "react";
import Box from "@mui/material/Box";
import {Button, TextField, Typography} from "@mui/material";
import Link from "@mui/material/Link";
import useAuthService from "../../hooks/useAuthService";

interface SingUpFormProps {
  children?: ReactNode;

  onClickToLogin(): void;
  onSuccessFirstStep(): void;
}

type SignInFields = {
  firstName: string;
  lastName: string;
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

  return {
    fields: signInFields,
    updateFields,
  };
};

const signUpFormInitFields: SignInFields = {
  email: '',
  password: '',
  confirmPassword: '',
  error: false,
  firstName: '',
  lastName: '',
}

const SignUpForm = ({onClickToLogin}: SingUpFormProps) => {
  const {
    fields,
    updateFields,
  } = useFieldsStorage(signUpFormInitFields);
  const authService = useAuthService();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const {
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
    } = fields;
    const dataAreValid = email.length > 0 && password.length > 0 && password === confirmPassword;

    if (dataAreValid) {
      const signUpIsSuccessfully = await authService.signUp(email, password, firstName, lastName);

      if (signUpIsSuccessfully) {
        // todo: действия после
        onClickToLogin();
      } else {
        // setLoginError(true);
      }
    }
  };

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
      <Typography variant={'h5'} mb={2}>
        Your path starts here <Typography component={'span'} sx={{fontSize: '26px'}}>👣</Typography>
      </Typography>

      <TextField
        autoFocus
        margin="normal"
        required
        fullWidth
        id="firstName"
        label="Firlst Name"
        name="firstName"
        autoComplete="off"
        value={fields.firstName}
        error={fields.error}
        onChange={createHandlerInputChange('firstName')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="lastName"
        label="Last Name"
        name="lastName"
        autoComplete="off"
        value={fields.lastName}
        error={fields.error}
        onChange={createHandlerInputChange('lastName')}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="off"
        value={fields.email}
        error={fields.error}
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
        value={fields.password}
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
        value={fields.confirmPassword}
        error={fields.error}
        onChange={createHandlerInputChange('confirmPassword')}
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