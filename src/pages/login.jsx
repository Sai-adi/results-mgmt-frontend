import React,{useState} from "react";
import { TextField, Button, Container, Typography, Alert } from "@mui/material";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:8000/login', formData);
            console.log(response.data);
            if (response.data.success) {
                localStorage.setItem("auth", response.data.token);
                navigate('/');
            }
            else {
                setError('Invalid Credentials');
            }
        } catch (err) {
            console.error("Login error:", err);
            setError('Invalid Crendentials');
        }
    };

    return (
        <Container maxWidth="sm" sx={{ mt: 8 }}>
            <Typography variant="h5" gutterBottom>Admin Login</Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                sx={{ mb: 2 }}
            />
                <Button varient="contained" type="submit" >Login</Button>
            </form>
        </Container>
    );
}

export default Login;