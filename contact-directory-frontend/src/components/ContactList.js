// import React, { useEffect, useState } from 'react';
// import {
//     List,
//     ListItem,
//     ListItemText,
//     Button,
//     TextField,
//     Dialog,
//     DialogActions,
//     DialogContent,
//     DialogTitle,
//     Snackbar,
//     Alert,
//     Select,
//     MenuItem,
//     InputLabel,
//     FormControl,
//     FormHelperText,
//     Typography,
//     IconButton,
//     Divider,
//     InputAdornment
// } from '@mui/material';
// import EditIcon from '@mui/icons-material/Edit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import SearchIcon from '@mui/icons-material/Search';
// import { getContacts, addContact, updateContact, deleteContact } from '../api';

// const ContactList = ({ selectedGroup }) => {
//     const [contacts, setContacts] = useState([]);
//     const [search, setSearch] = useState('');
//     const [dialogOpen, setDialogOpen] = useState(false);
//     const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//     const [currentContact, setCurrentContact] = useState({});
//     const [message, setMessage] = useState('');
//     const [group, setGroup] = useState('');
//     const [errors, setErrors] = useState({});
//     const [contactToDelete, setContactToDelete] = useState(null);
//     const token = localStorage.getItem('token');
//     const username = localStorage.getItem('username') || 'User';

//     useEffect(() => {
//         const fetchContacts = async () => {
//             try {
//                 const response = await getContacts(token);
//                 setContacts(response);
//             } catch (error) {
//                 console.error("Failed to fetch contacts", error);
//             }
//         };
//         fetchContacts();
//     }, [token]);

//     const validateContact = (contact) => {
//         const newErrors = {};
//         if (!contact.name || contact.name.trim() === '') {
//             newErrors.name = 'Name cannot be empty.';
//         } else if (!/^[a-zA-Z\s]+$/.test(contact.name)) {
//             newErrors.name = 'Name must contain only letters.';
//         }
//         if (!contact.email || !/\S+@\S+\.\S+/.test(contact.email)) {
//             newErrors.email = 'Email must be a valid email.';
//         }
//         if (!contact.phone || contact.phone.length !== 10 || !/^\d+$/.test(contact.phone)) {
//             newErrors.phone = 'Phone must contain exactly 10 digits.';
//         }
//         if (!group) {
//             newErrors.group = 'Group name cannot be empty.';
//         }

//         setErrors(newErrors);
//         return Object.keys(newErrors).length === 0;
//     };

//     const handleAddContact = async () => {
//         if (!validateContact(currentContact)) return;
//         try {
//             await addContact(token, { ...currentContact, group_name: group });
//             resetDialog();
//             setMessage('Contact added successfully!');
//             await refreshContacts();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleUpdateContact = async () => {
//         if (!validateContact(currentContact)) return;
//         try {
//             await updateContact(token, currentContact.id, { ...currentContact, group_name: group });
//             resetDialog();
//             setMessage('Contact updated successfully!');
//             await refreshContacts();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const handleDeleteContact = async () => {
//         if (contactToDelete) {
//             try {
//                 await deleteContact(token, contactToDelete);
//                 setMessage('Contact deleted successfully!');
//                 setContactToDelete(null);
//                 setDeleteDialogOpen(false);
//                 await refreshContacts();
//             } catch (error) {
//                 console.error(error);
//             }
//         }
//     };

//     const refreshContacts = async () => {
//         const response = await getContacts(token);
//         setContacts(response);
//     };

//     const resetDialog = () => {
//         setDialogOpen(false);
//         setCurrentContact({});
//         setGroup('');
//         setErrors({});
//     };

//     const filteredContacts = contacts.filter(contact => 
//         (selectedGroup ? contact.group_name === selectedGroup : true) &&
//         (contact.name.toLowerCase().includes(search.toLowerCase()) || 
//         contact.group_name.toLowerCase().includes(search.toLowerCase()))
//     );

//     return (
//         <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', textAlign: 'center' }}>
//             <Typography variant="h6" align="left" style={{ margin: '16px 0', color: '#424242' }}>
//                 Welcome {username}
//             </Typography>
//             <TextField
//                 label="Search Contacts"
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 fullWidth
//                 margin="normal"
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <SearchIcon />
//                         </InputAdornment>
//                     ),
//                 }}
//                 variant="outlined"
//                 style={{ backgroundColor: '#ffffff' }}
//             />
//             <Button variant="contained" onClick={() => { resetDialog(); setDialogOpen(true); }} style={{ marginBottom: '16px' }}>
//                 Add Contact
//             </Button>
//             <List style={{ backgroundColor: '#424242', borderRadius: '8px', padding: '16px' }}>
//                 {filteredContacts.map(contact => (
//                     <div key={contact.id}>
//                         <ListItem>
//                             <ListItemText
//                                 primary={<span style={{ color: '#ffffff' }}>{contact.name}</span>}
//                                 secondary={
//                                     <span style={{ color: '#b0bec5' }}>
//                                         Email: {contact.email} | Phone: {contact.phone} | Group: {contact.group_name}
//                                     </span>
//                                 }
//                             />
//                             <IconButton onClick={() => { setCurrentContact(contact); setGroup(contact.group_name); setDialogOpen(true); }} style={{ color: '#ffa726' }}>
//                                 <EditIcon />
//                             </IconButton>
//                             <IconButton onClick={() => { setContactToDelete(contact.id); setDeleteDialogOpen(true); }} style={{ color: '#e57373' }}>
//                                 <DeleteIcon />
//                             </IconButton>
//                         </ListItem>
//                         <Divider style={{ backgroundColor: '#ffffff' }} />
//                     </div>
//                 ))}
//             </List>

//             {/* Dialog for Add/Edit Contact */}
//             <Dialog open={dialogOpen} onClose={resetDialog}>
//                 <DialogTitle>{currentContact?.id ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
//                 <DialogContent>
//                     <TextField
//                         label="Name"
//                         value={currentContact?.name || ''}
//                         onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
//                         fullWidth
//                         margin="normal"
//                         error={!!errors.name}
//                         helperText={errors.name || ''}
//                     />
//                     <TextField
//                         label="Email"
//                         value={currentContact?.email || ''}
//                         onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
//                         fullWidth
//                         margin="normal"
//                         error={!!errors.email}
//                         helperText={errors.email || ''}
//                     />
//                     <TextField
//                         label="Phone"
//                         value={currentContact?.phone || ''}
//                         onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
//                         fullWidth
//                         margin="normal"
//                         error={!!errors.phone}
//                         helperText={errors.phone || ''}
//                     />
//                     <FormControl fullWidth margin="normal" error={!!errors.group}>
//                         <InputLabel>Group Name</InputLabel>
//                         <Select
//                             value={group}
//                             onChange={(e) => setGroup(e.target.value)}
//                         >
//                             <MenuItem value="Electrical">Electrical</MenuItem>
//                             <MenuItem value="Finance">Finance</MenuItem>
//                             <MenuItem value="Marketing">Marketing</MenuItem>
//                             <MenuItem value="Software">Software</MenuItem>
//                         </Select>
//                         {errors.group && <FormHelperText>{errors.group}</FormHelperText>}
//                     </FormControl>
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={resetDialog}>Cancel</Button>
//                     <Button onClick={currentContact?.id ? handleUpdateContact : handleAddContact}>
//                         {currentContact?.id ? 'Update' : 'Add'}
//                     </Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Dialog for Delete Confirmation */}
//             <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
//                 <DialogTitle>Delete Confirmation</DialogTitle>
//                 <DialogContent>
//                     Are you sure you want to delete this contact?
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
//                     <Button onClick={handleDeleteContact} color="secondary">Delete</Button>
//                 </DialogActions>
//             </Dialog>

//             {/* Snackbar for Success Messages */}
//             <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage('')}>
//                 <Alert onClose={() => setMessage('')} severity="success">
//                     {message}
//                 </Alert>
//             </Snackbar>
//         </div>
//     );
// };

// export default ContactList;



import React, { useEffect, useState } from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Button,
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    Alert,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    FormHelperText,
    Typography,
    IconButton,
    Divider,
    InputAdornment
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { getContacts, addContact, updateContact, deleteContact } from '../api';

const ContactList = ({ selectedGroup }) => {
    const [contacts, setContacts] = useState([]);
    const [search, setSearch] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [currentContact, setCurrentContact] = useState({});
    const [message, setMessage] = useState('');
    const [group, setGroup] = useState('');
    const [errors, setErrors] = useState({});
    const [contactToDelete, setContactToDelete] = useState(null);
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username') || 'User';

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await getContacts(token);
                setContacts(response);
            } catch (error) {
                console.error("Failed to fetch contacts", error);
            }
        };
        fetchContacts();
    }, [token]);

    const validateContact = (contact) => {
        const newErrors = {};
        if (!contact.name || contact.name.trim() === '') {
            newErrors.name = 'Name cannot be empty.';
        } else if (!/^[a-zA-Z\s]+$/.test(contact.name)) {
            newErrors.name = 'Name must contain only letters.';
        }
        if (!contact.email || !/\S+@\S+\.\S+/.test(contact.email)) {
            newErrors.email = 'Email must be a valid email.';
        }
        if (!contact.phone || contact.phone.length !== 10 || !/^\d+$/.test(contact.phone)) {
            newErrors.phone = 'Phone must contain exactly 10 digits.';
        }
        if (!group) {
            newErrors.group = 'Group name cannot be empty.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddContact = async () => {
        if (!validateContact(currentContact)) return;
        try {
            await addContact(token, { ...currentContact, group_name: group });
            resetDialog();
            setMessage('Contact added successfully!');
            await refreshContacts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateContact = async () => {
        if (!validateContact(currentContact)) return;
        try {
            await updateContact(token, currentContact.id, { ...currentContact, group_name: group });
            resetDialog();
            setMessage('Contact updated successfully!');
            await refreshContacts();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteContact = async () => {
        if (contactToDelete) {
            try {
                await deleteContact(token, contactToDelete);
                setMessage('Contact deleted successfully!'); // Show deletion message
                setContactToDelete(null);
                setDeleteDialogOpen(false);
                await refreshContacts();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const refreshContacts = async () => {
        const response = await getContacts(token);
        setContacts(response);
    };

    const resetDialog = () => {
        setDialogOpen(false);
        setCurrentContact({});
        setGroup('');
        setErrors({});
    };

    const filteredContacts = contacts.filter(contact => 
        (selectedGroup ? contact.group_name === selectedGroup : true) &&
        (contact.name.toLowerCase().includes(search.toLowerCase()) || 
        contact.group_name.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div style={{ width: '100%', maxWidth: '600px', margin: 'auto', textAlign: 'center', height: '100%', overflowY: 'auto' }}>
            <Typography variant="h6" align="left" style={{ margin: '16px 0', color: '#424242' }}>
                Welcome {username}
            </Typography>
            <TextField
                label="Search Contacts"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
                margin="normal"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                style={{ backgroundColor: '#ffffff' }}
            />
            <Button variant="contained" onClick={() => { resetDialog(); setDialogOpen(true); }} style={{ marginBottom: '16px' }}>
                Add Contact
            </Button>
            <List style={{ backgroundColor: '#424242', borderRadius: '8px', padding: '16px', maxHeight: 'calc(100vh - 300px)', overflowY: 'auto' }}>
                {filteredContacts.map(contact => (
                    <div key={contact.id}>
                        <ListItem>
                            <ListItemText
                                primary={<span style={{ color: '#ffffff' }}>{contact.name}</span>}
                                secondary={
                                    <span style={{ color: '#b0bec5' }}>
                                        Email: {contact.email} | Phone: {contact.phone} | Group: {contact.group_name}
                                    </span>
                                }
                            />
                            <IconButton onClick={() => { setCurrentContact(contact); setGroup(contact.group_name); setDialogOpen(true); }} style={{ color: '#ffa726' }}>
                                <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => { setContactToDelete(contact.id); setDeleteDialogOpen(true); }} style={{ color: '#e57373' }}>
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                        <Divider style={{ backgroundColor: '#ffffff' }} />
                    </div>
                ))}
            </List>

            {/* Dialog for Add/Edit Contact */}
            <Dialog open={dialogOpen} onClose={resetDialog}>
                <DialogTitle>{currentContact?.id ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={currentContact?.name || ''}
                        onChange={(e) => setCurrentContact({ ...currentContact, name: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.name}
                        helperText={errors.name || ''}
                    />
                    <TextField
                        label="Email"
                        value={currentContact?.email || ''}
                        onChange={(e) => setCurrentContact({ ...currentContact, email: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.email}
                        helperText={errors.email || ''}
                    />
                    <TextField
                        label="Phone"
                        value={currentContact?.phone || ''}
                        onChange={(e) => setCurrentContact({ ...currentContact, phone: e.target.value })}
                        fullWidth
                        margin="normal"
                        error={!!errors.phone}
                        helperText={errors.phone || ''}
                    />
                    <FormControl fullWidth margin="normal" error={!!errors.group}>
                        <InputLabel>Group Name</InputLabel>
                        <Select
                            value={group}
                            onChange={(e) => setGroup(e.target.value)}
                        >
                            <MenuItem value="Electrical">Electrical</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Marketing">Marketing</MenuItem>
                            <MenuItem value="Software">Software</MenuItem>
                        </Select>
                        {errors.group && <FormHelperText>{errors.group}</FormHelperText>}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={resetDialog}>Cancel</Button>
                    <Button onClick={currentContact?.id ? handleUpdateContact : handleAddContact}>
                        {currentContact?.id ? 'Update' : 'Add'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog for Delete Confirmation */}
            <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this contact?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
                    <Button onClick={handleDeleteContact} color="secondary">Delete</Button>
                </DialogActions>
            </Dialog>

            {/* Snackbar for Success Messages */}
            <Snackbar open={!!message} autoHideDuration={3000} onClose={() => setMessage('')}>
                <Alert onClose={() => setMessage('')} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default ContactList;
