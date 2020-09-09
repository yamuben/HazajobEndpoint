import express from 'express';
import * as jobAppController from '../controllers/jobAppController';

const router = express.Router();

router
  .route('/')
  .get(jobAppController.getAllJobApps)
  .post(jobAppController.createJopApp);

router
  .route('/:id')
  .get(jobAppController.getJobApp)
  .patch(jobAppController.updateJobApp)
  .delete(jobAppController.deleteJobApp);

export default router;
