import { useRouter } from 'next/router';  
import { Button, Typography, Paper } from '@mui/material';  
import PlanList from '../components/planList';  
import styled from '@emotion/styled';  
import { makeStyles } from '@mui/styles';  
  
const useStyles = makeStyles({  
  root: {  
    display: 'flex',  
    flexDirection: 'column',  
    alignItems: 'center',  
    justifyContent: 'center',  
    minHeight: '100vh',  
    backgroundColor: '#f5f5f5',  
  },  
  heading: {  
    marginBottom: '20px',  
  },  
  addButton: {  
    marginBottom: '10px',  
    borderRadius: 4, // Add border radius to make the button semi-flat  
  },  
  paper: {  
    padding: '20px',  
    borderRadius: 4, // Add border radius to the paper to match the semi-flat style  
  },  
});  
  
export default function Home(): JSX.Element {  
  const classes = useStyles();  
  const router = useRouter();  
  
  function handleAddClick() {  
    router.push('/plans/add');  
  }  
  
  return (  
    <div className={classes.root}>  
      <Typography variant="h4" className={classes.heading}>  
        计划管理应用  
      </Typography>  
      <Button variant="contained" color="primary" className={classes.addButton} onClick={handleAddClick}>  
        添加新计划  
      </Button>  
      <Paper className={classes.paper}>  
        <PlanList />  
      </Paper>  
    </div>  
  );  
}