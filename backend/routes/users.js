import { Router } from 'express';
const router = Router();
import { auth } from '../middleware/auth.js';
import {signup, login, updateAccount, deleteAccount} from '../controllers/user.js';
import { check, validationResult } from 'express-validator';

router.post('/signup',[check('email', 'Veuillez entrer une adresse email valide')
.isEmail(),
check('password', 'Votre mot de passe doit contenir entre 8 et 15 caractéres dont un minuscule, une majuscule et un chiffre')
.matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,15})$/),
check('nom', 'Veuillez ne pas utiliser de chiffre ou de caractéres speciaux dans le nom')
.matches(/^[a-zA-Z]+$/),
check('prenom', 'Veuillez ne pas utiliser de chiffre ou de caractéres speciaux dans le prenom')
.matches(/^[a-zA-Z]+$/)], signup);
router.post('/login', login);
router.put('/updateAccount', updateAccount);
router.get('/deleteAccount', auth, deleteAccount);










export default router;
