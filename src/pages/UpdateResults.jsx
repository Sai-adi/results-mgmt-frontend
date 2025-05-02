import React, { useEffect, useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateResult() {
    const { roll_number } = useParams();
    const navigate = useNavigate();
    const [formData ,setFormData] = useState({
        name: '',
        roll_number: '',
        department: '',
        subject: '',
        marks: ''
    });

    useEffect(() => {
        axios.get(`http://localhost:8000/results/roll/${roll_number}`)
            .then(response => {
                setFormData(response.data);
            })
            .catch(error => {
                console.error('Error fetching result:', error);
            });
    }, [roll_number]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8000/results/roll/${roll_number}`, formData);
            navigate('/dashboard');
            window.location.reload();  
            console.log('Result updated successfully:', response.data);

            console.log(response.data);
        } catch (error) {
            console.error('Error updating result:', error);
        }
    };
    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h5" gutterBottom>Update Result</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Roll Number"
                    name="roll_number"
                    value={formData.roll_number}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <TextField
                    fullWidth
                    label="Marks"
                    name="marks"
                    value={formData.marks}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" color="primary" type="submit">Update Result</Button>
            </form>
        </Container>
    );
}

export default UpdateResult;