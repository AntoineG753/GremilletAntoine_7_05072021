import { Router } from 'express';
const router = Router();
import {createPublication} from '../controllers/publication.js'

router.post('/createPublication', createPublication);









export default router;


































