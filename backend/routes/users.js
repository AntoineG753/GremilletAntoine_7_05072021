import { Router } from 'express';
const router = Router();
import { auth } from '../middleware/auth.js';
import {signup, login, updateAccount, deleteAccount, getAccount, allAccount} from '../controllers/user.js';
import { check, validationResult } from 'express-validator';
import multer from '../middleware/multer-config.js';

router.post('/signup',[check('email', 'Veuillez entrer une adresse email valide')
.isEmail(),
check('password', 'Votre mot de passe doit contenir entre 8 et 15 caractéres dont un minuscule, une majuscule et un chiffre')
.matches(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])([a-zA-Z0-9]{8,15})$/),
check('nom', 'Veuillez ne pas utiliser de chiffre ou de caractéres speciaux dans le nom')
.matches(/^[a-zA-Z]+$/),
check('prenom', 'Veuillez ne pas utiliser de chiffre ou de caractéres speciaux dans le prenom')
.matches(/^[a-zA-Z]+$/)], auth, multer, signup);
router.post('/login', login);
router.get('/getAccount', auth, getAccount);
router.get('/allAccount', auth, allAccount);
router.put('/updateAccount', auth, multer, updateAccount);
router.delete('/deleteAccount', auth, deleteAccount);










export default router;
