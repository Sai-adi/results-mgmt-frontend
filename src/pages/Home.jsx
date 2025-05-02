import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Container, Grid, Paper } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

function Home() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    return (
        <Box sx={{minHeight: "100vh", bgcolor: "#f4f6f8"}}>
            <AppBar position="static" sx={{ bgcolor: '#1976d2' }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Student Result Management System
                    </Typography>
                    <Box>
                        <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />} sx={{ mr: 2 }}>
                            Logout
                        </Button>
                    </Box>
                </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: 8 }}>
                <Paper elevation={4} sx={{ p: 6, borderRadius: 3 }}>
                    <Typography variant="h4" align="center" gutterBottom fontWeight="bold" color="primary">
                        Welcome to the Admin Dashboard
                    </Typography>

                    <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
                        <Grid item xs={12} sm={6} md={4}>
                            <Link to="/dashboard" style={{ textDecoration: "none" }}>
                                <Button 
                                    fullWidth
                                    variant="contained"
                                    startIcon={<DashboardIcon />}
                                    sx={{ py: 2, fontSize: "1rem", fontWeight: "bold", backgroundColor: "#673AB7", "&:hover": { backgroundColor: "#115293" } }}
                                >
                                    Dashboard
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Link to="/add-result" style={{ textDecoration: "none" }}>
                                <Button 
                                    fullWidth
                                    variant="contained"
                                    startIcon={<AddIcon />}
                                    sx={{ py: 2, fontSize: "1rem", fontWeight: "bold", backgroundColor: "#2e7d32", "&:hover": { backgroundColor: "#115293" } }}
                                >
                                    Add Result
                                </Button>
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Link to="/update-result" style={{ textDecoration: "none" }}>
                                <Button 
                                    fullWidth
                                    variant="contained"
                                    startIcon={<EditIcon />}
                                    sx={{ py: 2, fontSize: "1rem", fontWeight: "bold", backgroundColor: "#ed6c02", "&:hover": { backgroundColor: "#115293" } }}
                                >
                                    Update Result
                                </Button>
                            </Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </Box>
    )
}

export default Home;