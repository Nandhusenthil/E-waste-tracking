import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import {
  Container,
  Typography,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Badge,
  Modal,
  Box,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';

const RecyclerDashboard = () => {
  const [newBatches, setNewBatches] = useState([]);
  const [entries, setEntries] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    batch_id: '',
    recycler_branch: '',
    recycler_location: '',
    received_weight: '',
    recycled_weight: '',
    non_recyclable_weight: '',
    reason_non_recyclable: '',
  });
  const [manualMode, setManualMode] = useState(false);

  const COLORS = ['#4CAF50', '#FF5722']; // Green for recycled, Orange for non-recyclable

  // Fetch Municipality batches
  const fetchNewBatches = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recycler/new-batches');
      const data = await response.json();
      setNewBatches(data);
    } catch (error) {
      console.error('Error fetching municipality batches:', error);
    }
  };

  // Fetch Recycler processed entries
  const fetchRecyclerEntries = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/recycler');
      const data = await response.json();
      setEntries(data);
    } catch (error) {
      console.error('Error fetching recycler entries:', error);
    }
  };

  useEffect(() => {
    fetchNewBatches();
    fetchRecyclerEntries();
  }, []);

  const handleOpenForm = (batch_id = '') => {
    setFormData((prev) => ({
      ...prev,
      batch_id,
      recycler_branch: '',
      recycler_location: '',
      received_weight: '',
      recycled_weight: '',
      non_recyclable_weight: '',
      reason_non_recyclable: '',
    }));
    setManualMode(batch_id === '');
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async () => {
    try {
      await fetch('http://localhost:5000/api/recycler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!manualMode) {
        setNewBatches((prevBatches) =>
          prevBatches.filter((batch) => batch.batch_id !== formData.batch_id)
        );
      }

      fetchRecyclerEntries();
      handleCloseForm();
      alert('Batch processed successfully!');
    } catch (error) {
      console.error('Error submitting recycler form:', error);
      alert('Failed to process batch.');
    }
  };

  // Calculate percentages
  const calculatePercentages = () => {
    let totalReceived = 0;
    let totalRecycled = 0;
    let totalNonRecyclable = 0;

    entries.forEach((entry) => {
      totalReceived += Number(entry.received_weight);
      totalRecycled += Number(entry.recycled_weight);
      totalNonRecyclable += Number(entry.non_recyclable_weight);
    });

    const recycledPercentage = totalReceived ? ((totalRecycled / totalReceived) * 100).toFixed(2) : 0;
    const nonRecyclablePercentage = totalReceived ? ((totalNonRecyclable / totalReceived) * 100).toFixed(2) : 0;

    return { recycledPercentage, nonRecyclablePercentage };
  };

  const { recycledPercentage, nonRecyclablePercentage } = calculatePercentages();

  // Prepare data for Pie Chart
  const pieData = [
    { name: 'Recycled', value: parseFloat(recycledPercentage) },
    { name: 'Non-Recyclable', value: parseFloat(nonRecyclablePercentage) },
  ];

  return (
    <Container maxWidth="xl" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Recycler Dashboard
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h6" fontWeight="bold">
          Notifications
        </Typography>
        <IconButton onClick={() => handleOpenForm()}>
          <Badge badgeContent={newBatches.length} color="error">
            <NotificationsIcon fontSize="large" />
          </Badge>
        </IconButton>
      </Box>

      {/* New Municipality Batches */}
      {newBatches.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            New Batches from Municipality
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Batch ID</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Location</strong></TableCell>
                <TableCell><strong>Waste (kg)</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {newBatches.map((batch) => (
                <TableRow key={batch.batch_id}>
                  <TableCell>{batch.batch_id}</TableCell>
                  <TableCell>{batch.name}</TableCell>
                  <TableCell>{batch.location}</TableCell>
                  <TableCell>{batch.waste}</TableCell>
                  <TableCell>
                    <Button variant="contained" color="primary" onClick={() => handleOpenForm(batch.batch_id)}>
                      Process
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      )}

      {/* Flexbox layout for Summary and Processed Table */}
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* Left side - Percentages Summary with Pie Chart */}
        <Card sx={{ flex: 1, p: 2 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recycling Summary
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Recycled Percentage:</strong> {recycledPercentage}% 
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Non-Recyclable Percentage:</strong> {nonRecyclablePercentage}%
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Based on total received weight.
            </Typography>

            {/* Pie Chart */}
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Right side - Processed Batches Table */}
        <Paper elevation={3} sx={{ flex: 3, p: 2 }}>
          <Typography variant="h5" gutterBottom fontWeight="bold">
            Processed Batches
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Batch ID</strong></TableCell>
                <TableCell><strong>Recycler Branch</strong></TableCell>
                <TableCell><strong>Recycler Location</strong></TableCell>
                <TableCell><strong>Received Weight (kg)</strong></TableCell>
                <TableCell><strong>Recycled Weight (kg)</strong></TableCell>
                <TableCell><strong>Non-Recyclable Weight (kg)</strong></TableCell>
                <TableCell><strong>Reason for Non-Recyclable</strong></TableCell>
                <TableCell><strong>Date & Time</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.batch_id}</TableCell>
                  <TableCell>{entry.recycler_branch}</TableCell>
                  <TableCell>{entry.recycler_location}</TableCell>
                  <TableCell>{entry.received_weight}</TableCell>
                  <TableCell>{entry.recycled_weight}</TableCell>
                  <TableCell>{entry.non_recyclable_weight}</TableCell>
                  <TableCell>{entry.reason_non_recyclable}</TableCell>
                  <TableCell>{entry.createdAt ? new Date(entry.createdAt).toLocaleString() : 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Modal for Form */}
      <Modal open={openForm} onClose={handleCloseForm}>
        <Box sx={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 500, bgcolor: 'background.paper', boxShadow: 24, p: 4, borderRadius: 3
        }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {manualMode ? 'Process Manual Batch' : 'Process Batch'}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              name="batch_id"
              label="Batch ID"
              value={formData.batch_id}
              onChange={handleFormChange}
              disabled={!manualMode}
              fullWidth
            />
            <TextField
              name="recycler_branch"
              label="Recycler Branch"
              value={formData.recycler_branch}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="recycler_location"
              label="Recycler Location"
              value={formData.recycler_location}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="received_weight"
              label="Received Weight (kg)"
              type="number"
              value={formData.received_weight}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="recycled_weight"
              label="Recycled Weight (kg)"
              type="number"
              value={formData.recycled_weight}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="non_recyclable_weight"
              label="Non-Recyclable Weight (kg)"
              type="number"
              value={formData.non_recyclable_weight}
              onChange={handleFormChange}
              fullWidth
            />
            <TextField
              name="reason_non_recyclable"
              label="Reason for Non-Recyclable Waste"
              value={formData.reason_non_recyclable}
              onChange={handleFormChange}
              fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default RecyclerDashboard;
