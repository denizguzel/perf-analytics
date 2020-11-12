import express from 'express';
import webVitalsRoutes from './web-vitals.routes';

const router = express.Router();

router.use('/vitals', webVitalsRoutes);

export default router;
