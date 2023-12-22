import { Plan } from '../types';  
  
interface IPlanService {  
  getAllPlans: () => Promise<Plan[]>;  
  getPlanByName: (planName: string) => Promise<Plan>;  
  addPlan: (newPlan: Plan) => Promise<void>;  
  updatePlan: (updatedPlan: Plan) => Promise<void>;  
  deletePlan: (planName: string) => Promise<void>;  
}  
  
const API_URL = 'http://localhost:8080/plans';  
  
const planService: IPlanService = {  
  async getAllPlans() {  
    const response = await fetch(`${API_URL}/all`);  
    const data = await response.json();  
    return data;  
  },  
  
  async getPlanByName(planName) {  
    const response = await fetch(`${API_URL}/${planName}`);  
    const data = await response.json();  
    return data;  
  },  
  
  async addPlan(newPlan) {  
    await fetch(`${API_URL}/add`, {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify(newPlan),  
    });  
  },  
  
  async updatePlan(updatedPlan) {  
    await fetch(`${API_URL}/update`, {  
      method: 'PUT',  
      headers: {  
        'Content-Type': 'application/json',  
      },  
      body: JSON.stringify(updatedPlan),  
    });  
  },  
  
  async deletePlan(planName) {  
    await fetch(`${API_URL}/del/${planName}`, {  
      method: 'DELETE',  
    });  
  },  
};  
  
export default planService;