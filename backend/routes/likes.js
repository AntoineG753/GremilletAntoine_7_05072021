import { Router } from 'express';
const router = Router();
import multer from '../middleware/multer-config.js';
import {createLike, deleteLike, getLike} from '../controllers/like.js'
import { auth } from '../middleware/auth.js';


router.post('/createLike', auth, createLike);
router.post('/deleteLike', auth, deleteLike);
router.get('/getLike', auth, getLike);


export default router;