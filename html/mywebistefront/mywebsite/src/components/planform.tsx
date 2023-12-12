import React from 'react';  
import { useForm } from 'react-hook-form';  
import { TextField, Button, Paper} from '@mui/material';  
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
        <TextField {...register('planName')} label="计划名称" className={classes.formControl} />  
        {/* 其他计划字段的输入框 */}  
        <Button type="submit" variant="contained" color="primary">提交</Button>  
      </form>  
    </Paper>  
  );  
}