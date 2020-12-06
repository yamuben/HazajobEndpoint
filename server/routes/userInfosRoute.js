import express from 'express';
import * as userInfosController from '../controllers/userInfosController';
import * as authController from '../controllers/authController';

const router = express.Router();


router.post('/signup', authController.signUp);
router.post('/login', authController.login);

// router.use(authController.protect);

router
  .route('/')
  .get(userInfosController.getAllUserInfos)
  .post(userInfosController.createUser);

router
  .route('/user-data')
  .get(userInfosController.getUserInfos)
  .patch(userInfosController.updateUserInfos)
  .delete(userInfosController.deleteUserInfos);

export default router;
