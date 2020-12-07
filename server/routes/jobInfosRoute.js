import express from 'express';
import * as jobInfosController from '../controllers/jobInfosController';
import * as authController from '../controllers/authController';

const router = express.Router();
router.use(authController.protect);
router.post("/jobs", jobInfosController.getAllJobInfos);
router
  .route('/')
  .get(jobInfosController.getAllJobInfos)
  .post(jobInfosController.createJobInfos);

router
  .route('/:id')
  .get(jobInfosController.getJobInfos)
  .patch(jobInfosController.updateJobInfos)
  .delete(jobInfosController.deleteJobInfos);

export default router;
