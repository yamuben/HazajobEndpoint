import express from 'express';
import * as jobAppController from '../controllers/jobAppController';
import * as authController from '../controllers/authController';

const router = express.Router();
router.use(authController.protect);
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
