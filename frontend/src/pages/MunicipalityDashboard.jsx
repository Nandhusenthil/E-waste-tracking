import React, { useEffect, useState } from 'react';
import {
  Box,
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
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'linear-gradient(to right, #dbeafe, #bae6fd)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignSelf: 'center',
        px: { xs: 2, md: 25}, 
        width: '100%',
      }}
    >
      <Box
        sx={{
          width: '100%',
          px: { xs: 2, md: 10 }, 

        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          mb={5}
          textAlign="center"
          color="primary"
          padding={3}
          sx={{ textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
        >
          Municipality Dashboard
        </Typography>

        {/* Form Section */}
        <Paper
          elevation={4}
          sx={{
            p: 4,
            mb: 5,
            bgcolor: '#ffffffcc',
            borderRadius: 4,
            boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Typography variant="h5" fontWeight="bold" mb={3} color="secondary" textAlign="center">
            Add New Municipality Batch
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
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
              color="primary"
              sx={{
                mt: 2,
                alignSelf: 'center',
                borderRadius: 2,
                fontWeight: 'bold',
                textTransform: 'none',
                px: 5,
                py: 1.5,
              }}
            >
              Submit Batch
            </Button>
          </form>
        </Paper>

        {/* Table Section */}
        <Typography
          variant="h5"
          fontWeight="bold"
          mb={2}
          textAlign="center"
          color="primary"
        >
          Collected Data
        </Typography>

        <Paper
          elevation={4}
          sx={{
            overflowX: 'auto',
            borderRadius: 4,
            p: 2,
            bgcolor: '#ffffffcc',
            boxShadow: '0px 8px 24px rgba(0,0,0,0.1)',
            backdropFilter: 'blur(6px)',
          }}
        >
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
      </Box>
    </Box>
  );
};

export default MunicipalityDashboard;
