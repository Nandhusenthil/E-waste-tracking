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
  const [batchCounter, setBatchCounter] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/municipality');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      console.log("🌐 Fetched entries:", data);
      setEntries(data);

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
      setBatchCounter((prev) => prev + 1);
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
    <Container maxWidth="md" sx={{ mt: 5, mb: 5, bgcolor: '#f5f7fa', p: 4, borderRadius: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" textAlign="center" color="primary">
        Municipality Dashboard
      </Typography>

      <Paper elevation={4} sx={{ p: 3, mb: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom fontWeight="bold">
          Add New Municipality Batch
        </Typography>

        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          <Stack direction="row" spacing={2}>
            <TextField
              label="Municipality Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              fullWidth
              variant="outlined"
            />
            <TextField
              label="Waste Collected (kg)"
              value={waste}
              onChange={(e) => setWaste(e.target.value)}
              fullWidth
              variant="outlined"
              type="number"
            />
          </Stack>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{
              mt: 2,
              alignSelf: 'flex-start',
              borderRadius: 2,
              fontWeight: 'bold',
              textTransform: 'none',
              px: 4,
              py: 1,
            }}
          >
            Submit Municipality Batch
          </Button>
        </form>
      </Paper>

      <Typography variant="h5" gutterBottom fontWeight="bold" textAlign="center" color="primary">
        Collected Data
      </Typography>

      <Paper elevation={4} sx={{ borderRadius: 3 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#1976d2' }}>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Batch ID</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Waste (kg)</TableCell>
              <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map((entry, index) => (
              <TableRow
                key={index}
                sx={{
                  bgcolor: index % 2 === 0 ? '#f9f9f9' : 'white',
                  '&:hover': { bgcolor: '#e3f2fd' },
                  transition: 'all 0.3s ease',
                }}
              >
                <TableCell>{entry.batch_id ?? 'N/A'}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>{entry.location}</TableCell>
                <TableCell>{entry.waste}</TableCell>
                <TableCell>
                  {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : 'N/A'}
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
