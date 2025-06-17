import express from 'express';
import { Router } from 'express';
import yourController from '../controllers/index.js';

const router = Router();

// Define your routes here
router.get('/your-endpoint', yourController.yourMethod);
router.post('/your-endpoint', yourController.yourMethod);
router.put('/your-endpoint/:id', yourController.yourMethod);
router.delete('/your-endpoint/:id', yourController.yourMethod);

export default router;