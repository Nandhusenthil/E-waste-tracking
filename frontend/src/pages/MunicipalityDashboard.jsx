import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@mui/material';

const MunicipalityDashboard = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [waste, setWaste] = useState('');
  const [entries, setEntries] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/municipality');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/municipality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, waste }),
      });
  
      const newEntry = await response.json(); // Get newly added entry
  
      // Append the new entry instead of re-fetching everything
      setEntries(prev => [...prev, newEntry]);
  
      setName('');
      setLocation('');
      setWaste('');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Container maxWidth="md" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Municipality Dashboard
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}
      >
        <TextField
          label="Municipality Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          fullWidth
        />
        <TextField
          label="Waste Collected (kg)"
          value={waste}
          onChange={(e) => setWaste(e.target.value)}
          fullWidth
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>

      <Typography variant="h5" gutterBottom fontWeight="bold">
        Collected Data
      </Typography>

      <Paper elevation={3}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Waste (kg)</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.location}</TableCell>
                <TableCell>{entry.waste}</TableCell>
                <TableCell>
                  {entry.createdAt
                    ? new Date(entry.createdAt).toLocaleString()
                    : 'N/A'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Container>
  );
};

export default MunicipalityDashboard;
