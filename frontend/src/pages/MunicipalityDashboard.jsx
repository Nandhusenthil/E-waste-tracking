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
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("🌐 Fetched entries:", data); // Optional debug log
      setEntries(data);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
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

      const newEntry = await response.json();

      // Append the new entry to the existing list
      setEntries((prev) => [...prev, newEntry]);

      // Clear form inputs
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
              <TableCell><strong>Batch ID</strong></TableCell>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Location</strong></TableCell>
              <TableCell><strong>Waste (kg)</strong></TableCell>
              <TableCell><strong>Date</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.batch_id ?? 'N/A'}</TableCell>
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
