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
        bgcolor: 'linear-gradient(to right, #e0f7fa, #ffffff)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        py: 5,
        px: { xs: 2, md: 8 },
        gap: 4,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          fontWeight="bold"
          textAlign="center"
          color="primary"
          mb={4}
          sx={{ textShadow: '1px 1px 3px rgba(0,0,0,0.2)' }}
        >
          Municipality Dashboard
        </Typography>

        {/* Form Section */}
        <Paper
          elevation={6}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 6,
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            borderRadius: 5,
            boxShadow: '0 6px 20px rgba(0,0,0,0.15)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography
            variant="h5"
            fontWeight="bold"
            color="secondary"
            textAlign="center"
            mb={3}
          >
            Add New Municipality Batch
          </Typography>

          <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
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
                type="number"
                variant="outlined"
              />
            </Stack>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                alignSelf: 'center',
                px: 6,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 'bold',
                textTransform: 'capitalize',
                fontSize: '1rem',
                mt: 2,
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
          color="primary"
          textAlign="center"
          mb={3}
        >
          Collected Data
        </Typography>

        <Paper
          elevation={5}
          sx={{
            overflowX: 'auto',
            borderRadius: 5,
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            backdropFilter: 'blur(6px)',
          }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#0288d1' }}>
                {['Batch ID', 'Name', 'Location', 'Waste (kg)', 'Date'].map((head, idx) => (
                  <TableCell
                    key={idx}
                    sx={{
                      color: 'white',
                      fontWeight: 'bold',
                      textAlign: 'center',
                      fontSize: '1rem',
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow
                  key={index}
                  sx={{
                    backgroundColor: index % 2 === 0 ? '#f1f8ff' : '#ffffff',
                    '&:hover': { backgroundColor: '#b3e5fc' },
                    transition: '0.3s',
                  }}
                >
                  <TableCell align="center">{entry.batch_id ?? 'N/A'}</TableCell>
                  <TableCell align="center">{entry.name}</TableCell>
                  <TableCell align="center">{entry.location}</TableCell>
                  <TableCell align="center">{entry.waste}</TableCell>
                  <TableCell align="center">
                    {entry.createdAt ? new Date(entry.createdAt).toLocaleString() : 'N/A'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Container>
    </Box>
  );
};

export default MunicipalityDashboard;
