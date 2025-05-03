import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Typography, Button, Box, CircularProgress } from '@mui/material';


function DeleteResult() {
    const { roll_number } = useParams();
    const navigate = useNavigate();
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:8000/results/roll/${roll_number}`)
            .then(response => {
                setResult(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching result", error);
                setLoading(false);
            })
    }, [roll_number]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/results/delete/${roll_number}`);
            navigate('/dashboard');
        }
        catch (error) {
            console.error("Error deleting result", error);
        }
    };

    if (loading) return <Box sx={{ textAlign: "center", mt: 5 }}><CircularProgress /></Box>;

    if (!result) return <Typography sx={{ textAlign: "center", mt: 5 }}>Result not foundd.</Typography>
    
    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography></Typography>
            <Box sx={{ mb: 3 }}>
                <Typography><strong>Name:</strong>{result.name}</Typography>
                <Typography><strong>Roll Number:</strong>{result.roll_number}</Typography>
                <Typography><strong>Department:</strong>{result.department}</Typography>
                <Typography><strong>Subject:</strong>{result.subject}</Typography>
                <Typography><strong>Marks:</strong>{result.marks}</Typography>
            </Box>
            <Button variant="contained" color="error" onClick={handleDelete}>
                Delete Result
            </Button>
        </Container>
    );
}

export default DeleteResult;