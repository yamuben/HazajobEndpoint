import express from 'express';
import * as jobInfosController from '../controllers/jobInfosController';

const router = express.Router();

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
