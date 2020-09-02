import express from 'express';
import * as userInfosController from '../controllers/userInfosController';

const router = express.Router();

router
  .route('/')
  .get(userInfosController.getAllUserInfos)
  .post(userInfosController.createUser);

router
  .route('/:id')
  .get(userInfosController.getUserInfos)
  .patch(userInfosController.updateUserInfos)
  .delete(userInfosController.deleteUserInfos);

export default router;
