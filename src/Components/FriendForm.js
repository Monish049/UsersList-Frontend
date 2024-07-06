import React, { useState } from 'react';
import { TextField, Button, Container } from '@mui/material';
import axios from 'axios';

const FriendForm = ({ userId, fetchUsers }) => {
    const [friendName, setFriendName] = useState('');

    const handleAddFriend = async () => {
        try {
            await axios.post('http://localhost:8000/friends/', { friend_name: friendName, user: userId });
            setFriendName('');
            fetchUsers();
        } catch (error) {
            console.error('Error adding friend:', error);
        }
    };

    return (
        <Container>
            <TextField
                label="Friend Name"
                value={friendName}
                onChange={(e) => setFriendName(e.target.value)}
                variant="outlined"
                margin="normal"
                fullWidth
                style={{ marginBottom: '20px' }}
            />
            <Button variant="contained" color="primary" onClick={handleAddFriend}>
                Add Friend
            </Button>
        </Container>
    );
};

export default FriendForm;
