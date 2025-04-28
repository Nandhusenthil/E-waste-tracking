import React, { useEffect, useState } from 'react';
import {
  AppBar, Toolbar, Typography, Button, Container,
  Select, MenuItem, FormControl, InputLabel, Box, 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, Card, CardContent
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const GovernmentDashboard = () => {
  const [tab, setTab] = useState(0);
  const [municipalityData, setMunicipalityData] = useState([]);
  const [recyclerData, setRecyclerData] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchMunicipalityData();
    fetchRecyclerData();
  }, []);

  const fetchMunicipalityData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/municipality');
      const data = await res.json();
      setMunicipalityData(data);
    } catch (error) {
      console.error('Failed to fetch municipality data:', error);
    }
  };

  const fetchRecyclerData = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/recycler');
      const data = await res.json();
      setRecyclerData(data);
    } catch (error) {
      console.error('Failed to fetch recycler data:', error);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  useEffect(() => {
    if (selectedCity) {
      const cityData = municipalityData.filter(
        entry => entry.location?.toLowerCase() === selectedCity.toLowerCase()
      );

      const monthlyData = {};

      cityData.forEach(entry => {
        const month = new Date(entry.createdAt).toLocaleString('default', { month: 'short' });

        if (!monthlyData[month]) {
          monthlyData[month] = { generated: 0, handled: 0 };
        }

        monthlyData[month].generated += entry.waste;

        const recyclerEntry = recyclerData.find(item => item.batch_id === entry.batch_id);
        if (recyclerEntry) {
          monthlyData[month].handled += (recyclerEntry.recycled_weight || 0) + (recyclerEntry.non_recyclable_weight || 0);
        }
      });

      const graphData = Object.entries(monthlyData).map(([month, values]) => ({
        month,
        generated: values.generated,
        handled: values.handled,
      }));

      setFilteredData(graphData);
    } else {
      setFilteredData([]);
    }
  }, [selectedCity, municipalityData, recyclerData]);

  const calculateMonthlySummary = () => {
    const monthlySummary = {};

    municipalityData.forEach(entry => {
      const month = new Date(entry.createdAt).toLocaleString('default', { month: 'short' });

      if (!monthlySummary[month]) {
        monthlySummary[month] = { generated: 0, handled: 0 };
      }

      monthlySummary[month].generated += entry.waste;

      const recyclerEntry = recyclerData.find(item => item.batch_id === entry.batch_id);
      if (recyclerEntry) {
        monthlySummary[month].handled += (recyclerEntry.recycled_weight || 0) + (recyclerEntry.non_recyclable_weight || 0);
      }
    });

    const tableData = Object.entries(monthlySummary).map(([month, values]) => ({
      month,
      generated: values.generated,
      handled: values.handled,
    }));

    return tableData;
  };

  const tableData = calculateMonthlySummary();

  const cityOptions = Array.from(
    new Set(municipalityData.map(entry => entry.location?.trim().toLowerCase()))
  ).filter(Boolean).map(name => name.charAt(0).toUpperCase() + name.slice(1));

  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: '#f5f7fa',
      paddingLeft: '16px',
      backgroundImage: 'linear-gradient(to bottom, #f5f7fa, #e4e8eb)'
    }}>
      {/* Navbar */}
      <AppBar position="sticky" sx={{ 
        backgroundColor: '#1a3e72',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        paddingLeft: '16px',
      }}>
        <Toolbar sx={{ 
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 24px'
        }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 'bold',
            letterSpacing: '0.5px',
            fontSize: '1.5rem'
          }}>
            E-Waste Government Dashboard
          </Typography>
          <Box sx={{
            paddingLeft: '16px',}}>
            <Button 
              color="inherit" 
              onClick={() => setTab(0)} 
              sx={{ 
                textTransform: 'none', 
                fontSize: '1rem',
                fontWeight: tab === 0 ? 'bold' : 'normal',
                mr: 2,
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              onClick={() => setTab(1)} 
              sx={{ 
                textTransform: 'none', 
                fontSize: '1rem',
                fontWeight: tab === 1 ? 'bold' : 'normal',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Overview Report
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ 
        py: 6,
        transition: 'all 0.3s ease'
      }}>
        {tab === 0 && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1a3e72',
              mb: 2,
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}>
              City-Wise E-Waste Tracking
            </Typography>

            <Card sx={{ 
              width: '100%',
              maxWidth: 600,
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              p: 3
            }}>
              <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
              }}>
                <FormControl fullWidth>
                  <InputLabel sx={{ 
                    color: '#1a3e72',
                    fontWeight: '500'
                  }}>
                    Select City
                  </InputLabel>
                  <Select 
                    value={selectedCity} 
                    label="Select City" 
                    onChange={handleCityChange}
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1a3e72',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#1a3e72',
                      },
                    }}
                  >
                    {cityOptions.map((city, index) => (
                      <MenuItem key={index} value={city}>
                        {city}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </CardContent>
            </Card>

            {filteredData.length > 0 && (
              <Card sx={{ 
                width: '100%',
                borderRadius: 2,
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
                backgroundColor: 'white',
                p: 3,
                mt: 2
              }}>
                <CardContent>
                  <Typography variant="h6" sx={{ 
                    mb: 3,
                    color: '#1a3e72',
                    fontWeight: '600',
                    textAlign: 'center'
                  }}>
                    E-Waste Data for {selectedCity}
                  </Typography>
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={filteredData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                      <XAxis 
                        dataKey="month" 
                        tick={{ fill: '#555' }}
                        axisLine={{ stroke: '#1a3e72' }}
                      />
                      <YAxis 
                        tick={{ fill: '#555' }}
                        axisLine={{ stroke: '#1a3e72' }}
                      />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: '#1a3e72',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend 
                        wrapperStyle={{
                          paddingTop: '20px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="generated" 
                        stroke="#1a3e72" 
                        strokeWidth={3} 
                        name="Waste Generated (kg)"
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="handled" 
                        stroke="#4caf50" 
                        strokeWidth={3} 
                        name="Waste Handled (kg)"
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </Box>
        )}

        {tab === 1 && (
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4
          }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              textAlign: 'center',
              color: '#1a3e72',
              mb: 2,
              fontSize: { xs: '1.8rem', md: '2.2rem' }
            }}>
              Monthly Overview Report
            </Typography>

            <Card sx={{ 
              width: '100%',
              borderRadius: 2,
              boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
              backgroundColor: 'white',
              p: 3
            }}>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ 
                      backgroundColor: '#1a3e72',
                      '& th': {
                        color: 'white',
                        fontWeight: '600',
                        fontSize: '1rem'
                      }
                    }}>
                      <TableCell>Month</TableCell>
                      <TableCell align="right">E-Waste Generated (kg)</TableCell>
                      <TableCell align="right">E-Waste Handled (kg)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData.map((row) => (
                      <TableRow 
                        key={row.month}
                        sx={{ 
                          '&:nth-of-type(odd)': {
                            backgroundColor: '#f5f7fa'
                          },
                          '&:hover': {
                            backgroundColor: '#e8f0fe'
                          }
                        }}
                      >
                        <TableCell sx={{ fontWeight: '500' }}>{row.month}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: '500' }}>{row.generated.toFixed(2)}</TableCell>
                        <TableCell align="right" sx={{ fontWeight: '500' }}>{row.handled.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Card>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default GovernmentDashboard;