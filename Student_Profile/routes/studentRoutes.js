import express from 'express';
import * as StudentControllers from '../controllers/studentControllers.js';

const router = express.Router();

router.get('/:id', StudentControllers.getProfile);
router.get('/', StudentControllers.listAllProfiles);
router.post('/', StudentControllers.createProfile);

export default router;