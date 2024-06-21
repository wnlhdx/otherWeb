import React, { useState } from 'react'
import Head from 'next/head'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs  } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs, { Dayjs } from 'dayjs';


export default function Home() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [startTime, setStartTime] =React.useState<Dayjs | null>(dayjs('2024-06-21T00:00'));
  const [endTime, setEndTime] = React.useState<Dayjs | null>(dayjs('2024-06-21T00:00'));
  interface plan{
    title:string;
    content:string;
    startTime:Dayjs | null;
    endTime:Dayjs | null;
  }
  const [plans,setPlans] = useState<plan[]>([]); 




  const handleAddPlan = () => {
    const newPlan = { title, content, startTime, endTime };
    setPlans([...plans, newPlan]);
    setTitle('');
    setContent('');
    setStartTime(dayjs('2024-06-21T00:00'));
    setEndTime(dayjs('2024-06-21T00:00'));
  };

  return (
    
    <Container>
      <Head>
        <title>Personal Plan Management</title>
      </Head>
        <TextField 
          value={title}
          label="Title"  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTitle(event.target.value);
          }} 
        />
        <TextField 
          value={content}
          label="Content"   onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setContent(event.target.value);
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <TimePicker
          label="start Time"
          value={startTime}
          onChange={(time) => setStartTime(time)}
        />
        <TimePicker
          label="endTime picker"
          value={endTime}
          onChange={(time) => setEndTime(time)}
        />
        </LocalizationProvider>
        
        <Button  variant="contained" onClick={handleAddPlan}>Add Plan</Button>
      <Divider/>

      <List subheader={
        <ListSubheader component="div" id="nested-list-subheader">
         Your Plans:
        </ListSubheader>
      }>
        {plans.map((p, index) => (
          <ListItemText key={index}>
                  {p.startTime ? p.startTime.format('HH:mm') : '-'}-{p.endTime ? p.endTime.format('HH:mm') : '-'}  {p.title}:{p.content} 
          </ListItemText>
        ))}
      </List>
    
      </Container>
  )
}