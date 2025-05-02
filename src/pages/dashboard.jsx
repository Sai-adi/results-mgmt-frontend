import React, { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper,MenuItem,InputLabel,FormControl,Select, Typography, Button, Box, TextField } from "@mui/material";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function Dashboard() {
    const [results, setResults] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedDept, setSelectedDept] = useState("All");  


    useEffect(() => {
        axios.get("http://localhost:8000/results")
            .then((response) => {
                setResults(response.data.results);
            })
            .catch(error => {
                console.error("Error fetching results:", error);
            });
    }, [location]);

    const handleLogout = () => {
        localStorage.removeItem("auth");
        navigate("/login");
    };

    const filteredResults = results.filter(result => 
        result.roll_number.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedDept === "All" || result.department === selectedDept)
    );

    const departments = Array.from(new Set(results.map(r=>r.department)));

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 3, py: 2, bgcolor: "#3F51B5", color: "white", borderRadius: 1 }}>
                <Typography variant="h6">Student Result Dashboard</Typography>
                <Button variant="contained" color="secondary" onClick={handleLogout}>Logout</Button>
            </Box>

            <Box sx={{ px: 3, mt: 3, display: "flex", justifyContent: "space-between", alignItems: "center" ,flexWrap:"wrap", gap:2}}>
                <Typography variant="subtitle1" color="textSecondary">
                    Total Records: {filteredResults.length}
                </Typography>

                <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel>Filter by Department</InputLabel>
                    <Select
                        value={selectedDept}
                        onChange={(e) => setSelectedDept(e.target.value)}
                        label="Filter by Department"
                    >
                        <MenuItem value="All">All Departmets</MenuItem>
                        {departments.map((dept, index) => (
                            <MenuItem key={index} value={dept}>{dept}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Search by Roll Number "
                    variant="outlined"
                    size="small"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Box>
            <Box sx={{ mx: 3, mt: 2, overflowX: "auto" }}>
            <TableContainer component={Paper} elevation={3} sx={{  borderRadius: 2, maxWidth:"800" }}>
                <Table>
                    <TableHead sx={{ bgcolor: "#f5f5f5" }}>
                        <TableRow>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Roll Number</strong></TableCell>
                            <TableCell><strong>Department</strong></TableCell>
                            <TableCell><strong>Subject</strong></TableCell>
                            <TableCell><strong>Marks</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredResults.length > 0 ? (
                            filteredResults.map((result, index) => (
                            <TableRow key={result.id} sx={{ bgcolor: index % 2 === 0 ? "#fff" : "#f9f9f9", '&:hover': { bgcolor: "#e3f2fd" } }}>
                                <TableCell>{result.name}</TableCell>
                                <TableCell>{result.roll_number}</TableCell>
                                <TableCell>{result.department}</TableCell>
                                <TableCell>{result.subject}</TableCell>
                                <TableCell>{result.marks}</TableCell>
                                <TableCell>
                                    <Link to={`/update-result/${result.roll_number}`}>
                                        <Button variant="contained" color="primary" size="small" sx={{ borderRadius: 2, minWidth: 50,px:1,textTransform: "none" }}>Edit</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        ))
                    ) :(
                        <TableRow>
                            <TableCell colSpan={6} align="center">
                                No results found.
                            </TableCell>
                        </TableRow>
                    )}      
                    </TableBody>
                </Table>
                </TableContainer>
            </Box>
        </>
    );
}

export default Dashboard;