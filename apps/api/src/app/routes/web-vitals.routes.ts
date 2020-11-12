import express from 'express';
import controller from '../controllers/web-vitals.controller';

const router = express.Router();

router.route('/').post(controller.create);

router.route('/all').get(controller.fetchAll);

export default router;
