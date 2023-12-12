import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { List, ListItem, ListItemText, Button } from '@mui/material';
import planService from '../services/planservices';
import { Plan } from '../types';

export default function PlanList(): JSX.Element {
  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    async function fetchPlans() {
      const data = await planService.getAllPlans();
      setPlans(data);
    }
    fetchPlans();
  }, []);

  const handleDelete = async (planName: string) => {
    await planService.deletePlan(planName);
    setPlans(plans.filter((plan) => plan.planName !== planName));
  };

  return (
    <List>
      {plans.map((plan) => (
        <ListItem key={plan.planName}>
          <ListItemText primary={plan.planName} />
          <Link href={`/plans/${plan.planName}`}>
            <Button variant="contained" color="primary">编辑</Button>
          </Link>
          <Button variant="contained" color="secondary" onClick={() => handleDelete(plan.planName)}>删除</Button>
        </ListItem>
      ))}
    </List>
  );
}