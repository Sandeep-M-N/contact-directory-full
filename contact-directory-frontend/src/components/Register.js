// src/components/Register.js
import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Paper, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { register } from '../api';
import { styled } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#e0f7fa', // Light background color
    width: '100%', // Full width
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
        backgroundColor: theme.palette.success.dark,
        transform: 'scale(1.05)',
        transition: 'background-color 0.3s, transform 0.3s',
    },
}));

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const validateUsername = (username) => {
        const usernameRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{1,}$/; // Must contain letters and numbers
        return usernameRegex.test(username);
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Minimum 8 characters, at least one uppercase, one lowercase, one number, and one special character
        return passwordRegex.test(password);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validation checks
        if (!validateUsername(username)) {
            setError("Username must contain letters and numbers and cannot be empty.");
            return;
        }
        if (!validatePassword(password)) {
            setError("Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            await register({ username, password });
            setSuccess("Registration successful! Redirecting to login...");
            setTimeout(() => {
                navigate('/'); // Redirect to login after successful registration
            }, 2000); // Delay for 2 seconds
        } catch (err) {
            setError(err.message);
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <StyledContainer>
            <StyledPaper elevation={3}>
                <Typography variant="h4" gutterBottom align="center" style={{ color: '#f44336' }}>
                    Register
                </Typography>
                <form onSubmit={handleRegister} style={{ width: '100%' }}>
                    {error && <Typography color="error" align="center">{error}</Typography>}
                    {success && <Typography color="primary" align="center">{success}</Typography>}
                    <TextField
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
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
                    <TextField
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        type={showConfirmPassword ? 'text' : 'password'}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handleClickShowConfirmPassword}
                                        onMouseDown={(e) => e.preventDefault()}
                                    >
                                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <StyledButton type="submit" variant="contained" color="success" fullWidth style={{ marginTop: '16px' }}>
                        Register
                    </StyledButton>
                </form>
            </StyledPaper>
        </StyledContainer>
    );
};

export default Register;
