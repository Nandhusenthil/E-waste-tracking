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
  Stack,
} from '@mui/material';

const MunicipalityDashboard = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [waste, setWaste] = useState('');
  const [entries, setEntries] = useState([]);
  const [batchCounter, setBatchCounter] = useState(1); // 🔥 Global counter for unique Batch IDs

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/municipality');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("🌐 Fetched entries:", data);

      setEntries(data);

      // ⚡ Update counter based on maximum batch id fetched
      const maxBatchId = data.reduce((max, entry) => {
        const idNum = parseInt(entry.batch_id?.split('_')[1]) || 0;
        return idNum > max ? idNum : max;
      }, 0);
      setBatchCounter(maxBatchId + 1);
    } catch (error) {
      console.error('❌ Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newBatchId = `batch_${batchCounter}`;

      const response = await fetch('http://localhost:5000/api/municipality', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, location, waste, batch_id: newBatchId }),
      });

      const newEntry = await response.json();

      setEntries((prev) => [...prev, newEntry]);
      setBatchCounter((prev) => prev + 1); // Increment counter after new entry

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
        style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}
      >
        <Stack direction="row" spacing={2}>
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
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button type="submit" variant="contained" color="primary">
            Submit Municipality Batch
          </Button>

        </Stack>
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
