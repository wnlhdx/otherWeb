import { Plan } from '../types';

interface IPlanService {
  getAllPlans: () => Promise<Plan[]>;
  addPlan: (newPlan: Plan) => Promise<void>;
  updatePlan: (updatedPlan: Plan) => Promise<void>;
  deletePlan: (planName: string) => Promise<void>;
}

const API_URL = 'http://localhost:5000/api/plans';

const planService: IPlanService = {
  async getAllPlans() {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  },

  async addPlan(newPlan) {
    await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlan),
    });
  },

  async updatePlan(updatedPlan) {
    await fetch(`${API_URL}/${updatedPlan.planName}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlan),
    });
  },

  async deletePlan(planName) {
    await fetch(`${API_URL}/${planName}`, {
      method: 'DELETE',
    });
  },
};

export default planService;