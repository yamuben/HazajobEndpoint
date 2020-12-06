import express from 'express';
import * as austinController from '../controllers/austinController';

const router = express.Router();

router.post('/new',austinController.createFood);

router
.route('/:id')
.delete(austinController.deleteFood)
.patch(austinController.updateFood)
.get(austinController.getFoods);



export default router;