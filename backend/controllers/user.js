import { DB } from '../connectDB.js';
import bcrypt from 'bcrypt';
import {} from 'dotenv/config'
import jwt from 'jsonwebtoken';
import CryptoJS from 'crypto-js';
import { v5 as uuidv5 } from 'uuid';
import { sqlSignup, sqlLogin, sqlUpdateAccount, sqlDeleteAccount, sqlGetAccount, sqlallAccount } from '../utils/scriptSQL.js';



export const signup = (req, res, next) => {
    const namespace = `0134cac5-c00d-4453-a633-38857d0d5258`;
    const id = `${req.body.name}${req.body.email}`;
    const uuid = uuidv5(id, namespace);
    console.log(req)
    bcrypt.hash(req.body.password, 10, function(err, hash) {

        if (err) throw err;
        console.log(req)
        if (!req.file) {
            var signup = sqlSignup (
            
                uuid,
                CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString(),
                req.body.nom,
                req.body.prenom,
                hash,
                req.body.role,
                "http://localhost:5000/pictures/photovide.jpg"
            );
        }else {
            var signup = sqlSignup (
            
                uuid,
                CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString(),
                req.body.nom,
                req.body.prenom,
                hash,
                req.body.role,
                `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`
            );
        }
        

        DB.query(
            signup,
            function(error) {
                if (error) throw error;
            },
            console.log(signup)
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
                
                res.status(200).json({
                    userId: result[0].uuid,
                    name: result[0].name,
                    last_name: result[0].last_name,
                    role: result[0].role,
                    avatar: result[0].avatar,
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
    
     if(req.body.password) {
        var getAccount = sqlGetAccount(
            req.body.uuid,
        );
        DB.query(
            getAccount,
            (err, Result) => {
                if (err) throw err;
                
                
                bcrypt.hash(req.body.password, 10, function(err, hash) {
                    var updateAccount = sqlUpdateAccount(
                                (req.body.email ? CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString() : Result[0].email),
                                (req.body.nom ? req.body.nom : Result[0].name),
                                (req.body.prenom ? req.body.prenom : Result[0].last_name),
                                hash,
                                (req.body.file ? `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}` : Result[0].avatar),
                                Result[0].uuid
                    )
                    DB.query(
                        updateAccount,
                        (err, Result) => {
                            if (err) throw err;
                            res.status(201).json({Result})
                        }
                    )
                }
                )
                
                
            }
           
        )
        console.log(getAccount)
     } else {
        var getAccount = sqlGetAccount(
            req.body.uuid,
        );
        DB.query(
            getAccount,
            (err, Result) => {
                if (err) throw err;

                console.log(Result)
                console.log(req.body)
                var updateAccount = sqlUpdateAccount(
                        (req.body.email ? CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString() : Result[0].email),
                        (req.body.nom ? req.body.nom : Result[0].name),
                        (req.body.prenom ? req.body.prenom : Result[0].last_name),
                        Result[0].password,
                        (req.file ? `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}` : Result[0].avatar),
                        req.body.uuid
                );

                DB.query(
                    updateAccount,
                    (err, Result) => {
                        if (err) throw err;
                        res.status(201).json({Result})
                    }
                )
                console.log(updateAccount);
            }
           
        )
        console.log(getAccount)
     }
}

export const getAccount = (req, res, next) => {
    const getAccount = sqlGetAccount(
        req.query.ID
    );
    console.log(getAccount)
    DB.query(
        getAccount,
        (err, Result) => {
            if (err) throw err;
            res.status(201).json({Result})
        }
        
    )
}

export const allAccount = (req, res, next) => {
    const getAccount = sqlallAccount();
    DB.query(
        getAccount,
        (err, Result) => {
            if (err) throw err;
            res.status(201).json({Result})
        }
    )
}


export const deleteAccount = (req, res, next) => {
    console.log(req.query.accountDeleteData)
    const deleteAccount = sqlDeleteAccount(
        req.query.accountDeleteData
    );

    DB.query(
        deleteAccount,
           function(error) {
               if (error) throw error;
           }
       )
}

















