import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';
import Typography from '@mui/material/Typography';

interface Plan {
  planName: string;
  planDetails: string;
  timeStart: string; // ISO string
  timeEnd: string; // ISO string
}

export default function Home() {
  const [planName, setPlanName] = useState('');
  const [planDetails, setplanDetails] = useState('');
  const [timeStart, setStartTime] = useState<Dayjs | null>(dayjs());
  const [timeEnd, setEndTime] = useState<Dayjs | null>(dayjs());
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const API_BASE_URL = 'http://192.168.1.3:8080';

  useEffect(() => {
    fetchAllPlans();
  }, []);

  const fetchAllPlans = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/plans/all`);
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const fetchPlan = async (planName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/plans/${planName}`);
      if (!response.ok) {
        throw new Error('Plan not found');
      }
      const plan = await response.json();
      setSelectedPlan(plan); // 更新状态以存储获取到的计划
    } catch (error) {
      console.error('Error fetching plan by name:', error);
    }
  };


  const handleAddPlan = async () => {
    const newPlan: Plan = {
      planName,
      planDetails,
      timeStart: timeStart?.toISOString() ?? '',
      timeEnd: timeEnd?.toISOString() ?? '',
    };

    try {
      const response = await fetch(`${API_BASE_URL}/plans/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPlan),
      });

      const addedPlan = await response.json();
      setPlans([...plans, addedPlan]);
      resetForm();
    } catch (error) {
      console.error('Error adding plan:', error);
    }
  };

    const getPlanByName = async (planName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/plans/${planName}`);
      if (!response.ok) {
        throw new Error('Plan not found');
      }
      const plan = await response.json();
      setSelectedPlan(plan); // 更新状态以存储获取到的计划
    } catch (error) {
      console.error('Error fetching plan by name:', error);
    }
  };


  const handleUpdatePlan = async () => {
    if (!selectedPlan) return;

    const updatedPlan: Plan = {
      ...selectedPlan,
      planName,
      planDetails,
      timeStart: timeStart?.toISOString() ?? '',
      timeEnd: timeEnd?.toISOString() ?? '',
    };

    try {
      const response = await fetch(`${API_BASE_URL}/plans/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPlan),
      });

      const updated = await response.json();
      setPlans(plans.map((plan) => (plan.planName === updated.planName ? updated : plan)));
      resetForm();
    } catch (error) {
      console.error('Error updating plan:', error);
    }
  };

  const handleDeletePlan = async (planName: string) => {
    try {
      await fetch(`${API_BASE_URL}/plans/del/${planName}`, {
        method: 'DELETE',
      });

      setPlans(plans.filter((plan) => plan.planName !== planName));
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };

  const resetForm = () => {
    setPlanName('');
    setplanDetails('');
    setStartTime(dayjs());
    setEndTime(dayjs());
    setSelectedPlan(null);
  };

  const handleSelectPlan = (plan: Plan) => {
    setPlanName(plan.planName);
    setplanDetails(plan.planDetails);
    setStartTime(dayjs(plan.timeStart));
    setEndTime(dayjs(plan.timeEnd));
    setSelectedPlan(plan);
  };
  
  return (
    <Container>
      <Head>
        <title>Plan Management</title>
      </Head>
      <TextField
        fullWidth
        label="planName"
        value={planName}
        onChange={(e) => setPlanName(e.target.value)}
      />
      <TextField
        fullWidth
        label="planDetails"
        value={planDetails}
        onChange={(e) => setplanDetails(e.target.value)}
        multiline
        rows={4}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="Start Time"
          value={timeStart}
          onChange={(time: Dayjs | null) => setStartTime(time)}
        />
        <TimePicker
          label="End Time"
          value={timeEnd}
          onChange={(time: Dayjs | null) => setEndTime(time)}
        />
      </LocalizationProvider>
      <Button variant="contained" color="primary" onClick={handleAddPlan}>
        Add Plan
      </Button>
      {selectedPlan && (
        <>
          <Button variant="outlined" color="secondary" onClick={handleUpdatePlan}>
            Update Plan
          </Button>
          <Button variant="outlined" color="error" onClick={() => handleDeletePlan(selectedPlan.planName!)}>
            Delete Plan
          </Button>
        </>
      )}
      <div>
  <List sx={{ bgcolor: 'background.paper' }} subheader={<ListSubheader>Plans</ListSubheader>}>
  {plans.map((plan) => (
    <React.Fragment key={plan.planName}>
      <ListItemButton onClick={() => { handleSelectPlan(plan); }}>
        <ListItemText
          primary={plan.planName}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="text.primary">
                {dayjs(plan.timeStart).format('HH:mm')} - {dayjs(plan.timeEnd).format('HH:mm')}
              </Typography>
              {` — ${plan.planDetails}`}
            </React.Fragment>
          }
        />
      </ListItemButton>
      <Divider />
    </React.Fragment>
  ))}
</List>
</div>
    </Container>
  );}
