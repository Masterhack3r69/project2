import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from '@mui/material';
import { People, School, Assessment } from '@mui/icons-material';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalTeachers: 0,
    totalStudents: 0,
  });

  useEffect(() => {
    // Fetch dashboard data from backend
    // This will be implemented when backend is connected
    setStats({
      totalTeachers: 5,
      totalStudents: 50,
    });
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#e3f2fd',
            }}
          >
            <People sx={{ fontSize: 40, color: '#1976d2' }} />
            <Typography variant="h6">{stats.totalTeachers}</Typography>
            <Typography color="textSecondary">Total Teachers</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#e8f5e9',
            }}
          >
            <School sx={{ fontSize: 40, color: '#2e7d32' }} />
            <Typography variant="h6">{stats.totalStudents}</Typography>
            <Typography color="textSecondary">Total Students</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              bgcolor: '#fff3e0',
            }}
          >
            <Assessment sx={{ fontSize: 40, color: '#ed6c02' }} />
            <Typography variant="h6">0</Typography>
            <Typography color="textSecondary">Total Exams</Typography>
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {/* Add navigation */}}
                >
                  Add New Teacher
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {/* Add navigation */}}
                >
                  Add New Student
                </Button>
              </Grid>
              <Grid item xs={12} md={4}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {/* Add navigation */}}
                >
                  Create New Exam
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
