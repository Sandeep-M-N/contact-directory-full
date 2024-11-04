import React, { useState } from 'react';
import {
    Container,
    Typography,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Snackbar,
    Alert
} from '@mui/material';
import ContactList from './ContactList';
import GroupList from './GroupList';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    height: '100vh',
    background: '#e0f7fa',
    width: '100%',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: '2rem',
    borderRadius: '8px',
    flexGrow: 1,
    marginLeft: '16px',
    textAlign: 'center',
    boxShadow: theme.shadows[4],
    overflowY: 'auto', // Enable vertical scrolling
    height: '100vh', // Full height of the screen
}));

const Dashboard = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState('');
    const [message, setMessage] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        localStorage.clear();
        setMessage('Logged out successfully!'); // Set the logout message
        setTimeout(() => navigate('/'), 2000); // Redirect after 2 seconds
    };

    const handleSelectGroup = (group) => {
        setSelectedGroup(group);
    };

    return (
        <StyledContainer maxWidth="lg">
            <GroupList selectedGroup={selectedGroup} onSelectGroup={handleSelectGroup} />
            <StyledPaper elevation={4}>
                <Typography variant="h4" gutterBottom style={{ color: '#3f51b5' }}>
                    Contact Dashboard
                </Typography>
                
                <Button variant="contained" color="error" onClick={handleClickOpen} style={{ position: 'absolute', top: 20, right: 20 }}>
                    Logout
                </Button>
                
                <ContactList selectedGroup={selectedGroup} />
            </StyledPaper>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Logout Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to logout?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleLogout} color="error">Logout</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Logout Message */}
            <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage('')}>
                <Alert onClose={() => setMessage('')} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </StyledContainer>
    );
};

export default Dashboard;
