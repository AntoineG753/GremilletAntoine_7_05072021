import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js';
import {createPublication, updatePublication, realPublication, deletePublication} from '../controllers/publication.js'
import { auth } from '../middleware/auth.js';




router.post('/createPublication', auth, multer, createPublication);
router.post('/updatePublication', auth, multer, updatePublication);
router.get('/realPublication', auth, realPublication);
router.post('/deletePublication', auth, deletePublication);







export default router;


































