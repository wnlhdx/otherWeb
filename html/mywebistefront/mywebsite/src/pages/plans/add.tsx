import { Box, Typography } from '@mui/material';  
import PlanForm from '../../components/PlanForm';  
import styled from '@emotion/styled';  
  
const AddPlanContainer = styled(Box)`  
  display: flex;  
  flex-direction: column;  
  align-items: center;  
  justify-content: center;  
  min-height: 100vh;  
  padding: 20px;  
  background-color: #f5f5f5;  
`;  
  
const Heading = styled(Typography)`  
  margin-bottom: 20px;  
`;  
  
export default function AddPlan() {  
  return (  
    <AddPlanContainer>  
      <Heading variant="h4">添加新计划</Heading>  
      <PlanForm />  
    </AddPlanContainer>  
  );  
}