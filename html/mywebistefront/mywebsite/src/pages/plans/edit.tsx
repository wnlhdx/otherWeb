import { useRouter } from 'next/router';
import PlanForm from '../../components/PlanForm';
import planService from '../../services/planservices';

export default function EditPlan() {
  const router = useRouter();
  const { planName } = router.query;

  const handleSubmit = async (updatedPlan) => {
    await planService.updatePlan(updatedPlan); // 调用计划服务更新计划
    router.push('/');
  };

  return (
    <div>
      <h1>编辑计划 {planName}</h1>
      <PlanForm initialValues={/* fetch plan details by planName */} onSubmit={handleSubmit} />
    </div>
  );
}