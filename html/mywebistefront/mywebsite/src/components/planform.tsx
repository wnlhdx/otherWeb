import React from 'react';  
import { useForm } from 'react-hook-form';  
import { TextField, Button, Paper, Grid } from '@mui/material';  
import { makeStyles } from '@mui/styles';  
  
const useStyles = makeStyles({  
  root: {  
    backgroundColor: '#f5f5f5',  
    padding: '16px',  
    borderRadius: '4px',  
  },  
  formControl: {  
    marginBottom: '16px',  
  },  
  semiFlatButton: {  
    textTransform: 'none',  
    borderRadius: '4px',  
    fontSize: '16px',  
    padding: '10px 16px',  
    fontWeight: 600,  
    color: '#ffffff',  
    backgroundColor: '#3f51b5',  
    '&:hover': {  
      backgroundColor: '#303f9f',  
    },  
  },  
});  
  
export default function PlanForm({ initialValues = {}, onSubmit }) {  
  const classes = useStyles();  
  const { register, handleSubmit, reset } = useForm({ defaultValues: initialValues });  
  
  const handleFormSubmit = (data) => {  
    onSubmit(data);  
  };  
  
  return (  
    <Paper className={classes.root}>  
      <form onSubmit={handleSubmit(handleFormSubmit)}>  
        <Grid container spacing={2}>  
          <Grid item xs={12}>  
            <TextField {...register('planName')} label="计划名称" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('startTime')} label="开始时间" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('endTime')} label="结束时间" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('dayOfWeek')} label="周几" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('startTimeNight')} label="晚上开始时间" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('endTimeNight')} label="晚上结束时间" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('functionFor')} label="荣格八维" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('book')} label="要读的书" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('pages')} label="多少页" className={classes.formControl} />  
          </Grid>  
          <Grid item xs={12}>  
            <TextField {...register('rest')} label="休息时间使用的App" className={classes.formControl} />  
          </Grid>  
        </Grid>  
        <Button type="submit" variant="contained" color="primary" className={classes.semiFlatButton}>提交</Button>  
      </form>  
    </Paper>  
  );  
}