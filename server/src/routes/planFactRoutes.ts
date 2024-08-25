import { Router } from 'express';
import { PlanFactController } from '../controllers/PlanFactController';

const router = Router();
const controller = new PlanFactController();

router.post('/plan-facts', controller.create.bind(controller));
router.get('/plan-facts/grouped', controller.getGroupedData.bind(controller));


export default router;
