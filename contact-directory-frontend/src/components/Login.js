// src/components/Login.js
import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Paper, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#e0f7fa', // Light background color
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '2rem',
    borderRadius: '8px',
    width: '100%',
    maxWidth: '400px', // Max width for the paper
    boxShadow: theme.shadows[5],
}));

const StyledButton = styled(Button)(({ theme }) => ({
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: 'scale(1.05)',
        transition: 'background-color 0.3s, transform 0.3s',
    },
}));

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message
        setSuccess(''); // Reset success message

        try {
            const response = await login({ username, password });
            const { access_token } = response;
            const { username: yourusername } = response;
            localStorage.setItem('token', access_token);
            localStorage.setItem('username', yourusername);
            setSuccess("Login successful!");
            setTimeout(() => {
                navigate('/dashboard'); // Redirect after success message
            }, 1000); // Delay for 1 second
        } catch (error) {
            if (error.message.includes("Bad username or password")) {
                setError("Invalid Username or Password");
            } else {
                setError("Login failed. Please try again.");
            }
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <Typography variant="h4" gutterBottom align="center" style={{ color: '#f44336' }}>
                    Login
                </Typography>
                <form onSubmit={handleLogin} style={{ width: '100%' }}>
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        error={!!error}
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        error={!!error}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowPassword}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    {error && (
                        <Typography color="error" style={{ margin: '10px 0', textAlign: 'center' }}>
                            {error}
                        </Typography>
                    )}
                    {success && (
                        <Typography color="primary" style={{ margin: '10px 0', textAlign: 'center' }}>
                            {success}
                        </Typography>
                    )}
                    <StyledButton type="submit" variant="contained" color="error" fullWidth>
                        Login
                    </StyledButton>
                    <StyledButton onClick={() => navigate('/register')} variant="contained" color='success' fullWidth style={{ marginTop: '10px' }}>
                        Register
                    </StyledButton>
                </form>
            </StyledPaper>
        </StyledContainer>
    );
};

export default Login;
