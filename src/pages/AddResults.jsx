import React, { useState } from "react";
import { TextField,Button,Container,Typography, Snackbar, FormControl,InputLabel,Select,MenuItem,Box, Alert } from "@mui/material";
import axios from "axios";

const departmentSubjects = {
    CSE: ["Data Structures", "Algorithms", "Operating Systems", "Database Management Systems"],
    ECE: ["Signals", "Microprocessors", "Digital Circuits", "Communication Systems"],
    EEE: ["Circuit Theory", "Power Systems", "Control Systems", "Electrical Machines"],
    MECH: ["Thermodynamics", "Fluid Mechanics", "Machine Design", "Manufacturing Processes"],
    CIVIL: ["Structural Analysis", "Geotechnical Engineering", "Transportation Engineering", "Environmental Engineering"]
}

function AddResult() {
    const [formData, setFormData] = useState({
        name: "",
        roll_number: "",
        department: "",
        subject: "",
        marks: ""
    });
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setsanckbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState("success");


    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === "department") {
            setFormData({ ...formData, [name]: value, subject: "" });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, roll_number, department, subject, marks } = formData;

        if (!name || !roll_number || !department || !subject || !marks === "") {
            setsanckbarMessage("Please fill all fields.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }
        if (isNaN(marks) || marks < 0 || marks > 100) {
            setsanckbarMessage("Marks should be a number between 0 and 100.");
            setSnackbarSeverity("error");
            setSnackbarOpen(true);
            return;
        }


        axios.post("http://localhost:8000/results", formData)
            .then((response) => {
                console.log("Result added successfully:", response.data);
                setsanckbarMessage("Result added successfully!");
                setSnackbarSeverity("success");
                setSnackbarOpen(true);
                setFormData({
                    name: "",
                    roll_number: "",
                    department: "",
                    subject: "",
                    marks: ""
                });
            })
            .catch((error) => {
                console.error("Error adding result:", error);
                setsanckbarMessage("Failed to add result.");
                setSnackbarSeverity("error");
                setSnackbarOpen(true);
            });
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 5,p:3,boxShadow:3,borderRadius:2, bgcolor:"#fafafa"}}> 
            <Typography variant="h4" gutterBottom align="center" sx={{color: "#3F51B5", fontWeight: 600}}>
                Add Student Result
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Roll Number"
                    name="roll_number"
                    value={formData.roll_number}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Departement</InputLabel>
                    <Select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        label="Department"
                    >
                        {Object.keys(departmentSubjects).map((dept) => (
                            <MenuItem key={dept} value={dept}>
                                {dept}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal" disabled={!formData.department}>
                    <InputLabel>Subject</InputLabel>
                    <Select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        label="Subject"
                    >
                        {formData.department &&
                        departmentSubjects[formData.department].map((subject) => (
                            <MenuItem key={subject} value={subject}>
                                {subject}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    label="Marks"
                    name="marks"
                    value={formData.marks}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    type="number"
                    required
                />
                <Box sx={{display:"flex", justifyContent:"center",mt:3}}>
                    <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                        Add Result
                    </Button>
                </Box>
            </Box>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
                    {snackbarMessage}
                </Alert>

            </Snackbar>
        </Container>
    );
}

export default AddResult;