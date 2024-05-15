import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 

function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        // TODO auth logic

        // If OK:
        navigate('/admin');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <form onSubmit={handleSubmit}>
                <TextField 
                    label="Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                />
                <TextField 
                    label="Password" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                />
                <Button type="submit" variant="contained">Login</Button>
            </form>
        </Box>
    );
}

export default AdminLogin;
