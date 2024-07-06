import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider, makeStyles } from '@mui/material';
import axios from 'axios';
import FriendForm from './FriendForm';


// const useStyles = makeStyles((theme) => ({
//     listItem: {
//         padding: theme.spacing(1, 2),
//         marginBottom: theme.spacing(1), 
//     },
// }));

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [editUserId, setEditUserId] = useState(null);
    const [editUserName, setEditUserName] = useState('');
    const [openUserDialog, setOpenUserDialog] = useState(false);
    const [name, setName] = useState('');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/');
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };


    // const classes = useStyles();

    const handleAddUser = async () => {
        try {
            const response = await axios.post('http://localhost:8000/users/', { name });
            handleUserAdded(response.data);
            setName('');
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

        const handleDeleteFriend = async (friendId) => {
        try {
            await axios.delete(`http://localhost:8000/friends/${friendId}/`);
            fetchUsers(); 
        } catch (error) {
            console.error(`Error deleting friend ${friendId}:`, error);
        }
    };

    const handleEditUser = (userId, userName) => {
        setEditUserId(userId);
        setEditUserName(userName);
        setOpenUserDialog(true);
    };

    const handleSaveUserEdit = async () => {
        try {
            await axios.put(`http://localhost:8000/users/${editUserId}/`, { name: editUserName });
            fetchUsers();
            handleCloseUserDialog();
        } catch (error) {
            console.error(`Error updating user ${editUserId}:`, error);
        }
    };

    const handleCloseUserDialog = () => {
        setEditUserId(null);
        setEditUserName('');
        setOpenUserDialog(false);
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/users/${userId}/`);
            fetchUsers();
        } catch (error) {
            console.error(`Error deleting user ${userId}:`, error);
        }
    };

    const handleUserAdded = (newUser) => {
        setUsers([...users, newUser]);
    };

    

    return (
        <Container>
            <Typography variant="h4" style={{ marginBottom: '20px' }}>User List</Typography>
            <TextField
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddUser} style={{ marginBottom: '20px' }}>
                Add User
            </Button>
            <List>
                {users.map(user => (
                    <div key={user.id}>
                        <ListItem >
                            <ListItemText primary={user.name} secondary={`ID: ${user.id}`} />
                            <Button variant="contained" color="primary" onClick={() => handleEditUser(user.id, user.name)} style={{ marginRight: '10px' }}>
                                Edit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={() => handleDeleteUser(user.id)}>
                                Delete
                            </Button>
                        </ListItem>
                        <List>
                            {user.friends.length > 0 ? (
                                user.friends.map(friend => (
                                    <div key={friend.id}>
                                        <ListItem >
                                            <ListItemText primary={friend.friend_name} secondary={`Friend ID: ${friend.id}`} />
                                            <Button variant="contained" color="secondary" onClick={() => handleDeleteFriend(friend.id)}>
                                                Delete
                                            </Button>
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))
                            ) : (
                                <ListItem >
                                    <ListItemText primary="No friends" />
                                </ListItem>
                            )}
                            <FriendForm userId={user.id} fetchUsers={fetchUsers} />
                        </List>
                    </div>
                ))}
            </List>

            {/* User Edit Dialog */}
            <Dialog open={openUserDialog} onClose={handleCloseUserDialog}>
                <DialogTitle>Edit User</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Name"
                        value={editUserName}
                        onChange={(e) => setEditUserName(e.target.value)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseUserDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveUserEdit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default UserList;



