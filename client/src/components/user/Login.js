import { Send } from '@mui/icons-material';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
  Box
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { login, register } from '../../actions/user';
import { useValue } from '../../context/ContextProvider';
import PasswordField from './PasswordField';


const Login = () => {
  const {
    state: { openLogin },
    dispatch,
  } = useValue();
  const [title, setTitle] = useState('Login');
  const [isRegister, setIsRegister] = useState(false);
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();


  const handleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!isRegister) {
      return login({ email, password }, dispatch)
    }
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;
    if (password !== confirmPassword) {
      return dispatch({
        type: 'UPDATE_ALERT',
        payload: {
          open: true,
          severity: 'error',
          message: 'Passwords do not match',
        },
      });
    }
    register({ firstName, lastName, email, password }, dispatch);
  };

  useEffect(() => {
    isRegister ? setTitle('Register') : setTitle('Login');
  }, [isRegister]);
  return (
    <Dialog open={openLogin}>
      <DialogTitle>
        {title}
        <IconButton
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <DialogContentText>
            Please fill your information in the fields below:
          </DialogContentText>
          {isRegister && (
            <Box>
              <TextField
                autoFocus
                margin="normal"
                variant="standard"
                id="firstName"
                label="First Name"
                type="text"
                fullWidth
                inputRef={firstNameRef}
                inputProps={{ minLength: 2 }}
                required
              />
              <TextField
                autoFocus
                margin="normal"
                variant="standard"
                id="lastName"
                label="Last Name"
                type="text"
                fullWidth
                inputRef={lastNameRef}
                inputProps={{ minLength: 2 }}
                required
              />
            </Box>
          )}
          <TextField
            autoFocus={!isRegister}
            margin="normal"
            variant="standard"
            id="email"
            label="Email"
            type="email"
            fullWidth
            inputRef={emailRef}
            required
          />
          <PasswordField {...{ passwordRef }} />
          {isRegister && (
            <PasswordField
              passwordRef={confirmPasswordRef}
              id="confirmPassword"
              label="Confirm Password"
            />
          )}
        </DialogContent>
        <DialogActions sx={{ px: '19px' }}>
          <Button type="submit" variant="contained" endIcon={<Send />}>
            Submit
          </Button>
        </DialogActions>
      </form>
      <DialogActions sx={{ justifyContent: 'left', p: '5px 24px' }}>
        {isRegister
          ? 'Do you have an account? Sign in now '
          : "Don't you have an account? Create one now "}
        <Button onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? 'Login' : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Login;
