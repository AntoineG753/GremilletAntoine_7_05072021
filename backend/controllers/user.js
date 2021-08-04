import { DB } from '../connectDB.js';
import bcrypt from 'bcrypt';
import {} from 'dotenv/config'
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { v5 as uuidv5 } from 'uuid';
import { sqlSignup, sqlLogin, sqlUpdateAccount, sqlDeleteAccount } from '../utils/scriptSQL.js';



export const signup = (req, res, next) => {
    const namespace = `0134cac5-c00d-4453-a633-38857d0d5258`;
    const id = `${req.body.name}${req.body.email}`;
    const uuid = uuidv5(id, namespace);
    
    bcrypt.hash(req.body.password, 10, function(err, hash) {

        if (err) throw err;
        
        const signup = sqlSignup (
            
            uuid,
            CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString(),
            req.body.name,
            req.body.last_name,
            hash,
        );
        console.log(signup)
        console.log(req.body.email),

        DB.query(
            signup,
            function(error) {
                if (error) throw error;
            }
    
        )
        res.status(201).json({ message: 'Enregistration confirmée' })
    });
    
   
};

export const login = (req, res, next) => {
    console.log(req)
    const login = sqlLogin(
        CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString()
    );
    console.log(login)
    DB.query(
        login,
        req.body.email,
        
        (err, result) => {
            if (err) throw err;
            if (!req.body.password) {
                return res.status(401).json({ message: 'veuillez entrer un mot de passe.' })
            }
            bcrypt.compare(req.body.password, result[0].password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Mot de passe incorrect.' })
                };
                // const token = jwt.sign(
                //     {userToken: result[0].uuid},
                //     process.env.SECRET_TOKEN_KEY,
                //     {expiresIn: '24h'},
                // )
                // localStorage.setItem('userId', result[0].uuid),
                // localStorage.setItem('name', result[0].name),
                // localStorage.setItem('last_name', result[0].last_name),
                // localStorage.setItem('role', result[0].role),
                // localStorage.setItem('token', token),
                
                res.status(200).json({
                    userId: result[0].uuid,
                    name: result[0].name,
                    last_name: result[0].last_name,
                    role: result[0].role,
                    token: jwt.sign(
                        {userToken: result[0].uuid},
                        process.env.SECRET_TOKEN_KEY,
                        {expiresIn: '24h'},
                    )
                    
                });
            })
            .catch(error => res.status(500).json({ error }));
        })
    }


export const updateAccount = (req, res, next) => {
     const updateAccount = sqlUpdateAccount(
        req.body.email,
        req.body.name,
        req.body.last_name,
        req.body.password
     );
        console.log(updateAccount);
     DB.query(
            updateAccount,
            function(error) {
                if (error) throw error;
            },
            console.log(updateAccount)
        )

}


export const deleteAccount = (req, res, next) => {

    const deleteAccount = sqlDeleteAccount(
        // recuperation dans le local storage
    );

    DB.query(
        deleteAccount,
           function(error) {
               if (error) throw error;
           }
       )
}

















