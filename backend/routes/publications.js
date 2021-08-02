import { Router } from 'express';
const router = Router();
import {createPublication, updatePublication, realPublication, deletePublication} from '../controllers/publication.js'

router.post('/createPublication', createPublication);
router.post('/updatePublication', updatePublication);
router.get('/realPublication', realPublication);
router.delete('/deletePublication', deletePublication);







export default router;


































