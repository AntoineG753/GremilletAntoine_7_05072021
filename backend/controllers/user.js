import { DB } from '../connectDB.js';
import bcrypt from 'bcrypt';
import { } from 'dotenv/config'
import jwt from 'jsonwebtoken';
import * as fs from 'fs';
import CryptoJS from 'crypto-js';
import { v5 as uuidv5 } from 'uuid';
import { sqlSignup, sqlLogin, sqlUpdateAccount, sqlDeleteAccount, sqlGetAccount, sqlallAccount, sqlCheckEmail } from '../utils/scriptSQL.js';



export const signup = (req, res, next) => {
    const checkEmail = sqlCheckEmail(
        CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString()
    )

    DB.query(

        checkEmail,
        console.log(checkEmail),
        (err, Result) => {
            if (err) res.status(500).json({ error: "erreur serveur" });
            if (Result[0].present) {
                return res.status(401).json({ message: "Utilisateur existe déja." });
            }
            // signup 
            const namespace = `0134cac5-c00d-4453-a633-38857d0d5258`;
            const id = `${req.body.name}${req.body.email}`;
            const uuid = uuidv5(id, namespace);
            console.log(req)
            bcrypt.hash(req.body.password, 10, function (err, hash) {

                if (err) throw err;
                console.log(req)
                if (!req.file) {
                    var signup = sqlSignup(

                        uuid,
                        CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString(),
                        req.body.nom,
                        req.body.prenom,
                        hash,
                        req.body.role,
                        "http://localhost:5000/pictures/photovide.jpg"
                    );
                } else {
                    var signup = sqlSignup(

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
                    function (error) {
                        if (error) throw error;
                    },
                    console.log(signup)
                )
                res.status(201).json({ message: 'Enregistration confirmée' })
            });

        }

    )





};

export const login = (req, res, next) => {
    // console.log(req)
    // check email already exist 
    const checkEmail = sqlCheckEmail(
        CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString()
    )
    DB.query(
        checkEmail,
        console.log(checkEmail),
        (err, Result) => {
            if (err) res.status(500).json({ error: "erreur serveur" });
            if (!Result[0].present) {
                return res.status(401).json({ message: "Utilisateur non trouvé." });
            }
            // login 
            const login = sqlLogin(
                CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString()
            );

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
                                    { userToken: result[0].uuid },
                                    process.env.SECRET_TOKEN_KEY,
                                    { expiresIn: '24h' },
                                )

                            });
                        })
                        .catch(error => res.status(500).json({ error }));
                })
        }


    )





}


export const updateAccount = (req, res, next) => {

    if (req.body.password) {
        var getAccount = sqlGetAccount(
            req.body.uuid,
        );
        DB.query(
            getAccount,
            (err, Result) => {
                if (err) throw err;
                const filename = Result[0].avatar.split('/pictures/')[1];
                if (req.file && Result[0].avatar !== "http://localhost:5000/pictures/photovide.jpg") {

                    bcrypt.hash(req.body.password, 10, function (err, hash) {
                        var updateAccount = sqlUpdateAccount(
                            (req.body.email ? CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString() : Result[0].email),
                            (req.body.nom ? req.body.nom : Result[0].name),
                            (req.body.prenom ? req.body.prenom : Result[0].last_name),
                            hash,
                            `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`,
                            Result[0].uuid
                        )
                        fs.unlink(`pictures/${filename}`, (error => error));

                        DB.query(
                            updateAccount,
                            (err, Result) => {
                                if (err) throw err;
                                res.status(201).json({ Result })
                            }
                        )
                    }
                    )

                } else {

                    bcrypt.hash(req.body.password, 10, function (err, hash) {
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
                                res.status(201).json({ Result })
                            }
                        )
                    }
                    )
                }

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
                
                if (req.file && Result[0].avatar !== "http://localhost:5000/pictures/photovide.jpg") {

                    var updateAccount = sqlUpdateAccount(
                        (req.body.email ? CryptoJS.HmacSHA512(req.body.email, process.env.MAIL_SECRET_KEY).toString() : Result[0].email),
                        (req.body.nom ? req.body.nom : Result[0].name),
                        (req.body.prenom ? req.body.prenom : Result[0].last_name),
                        Result[0].password,
                        `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`,
                        req.body.uuid
                    );
                    
                    const filename = Result[0].avatar.split('/pictures/')[1];
                    fs.unlink(`pictures/${filename}`, (error => error));
                    console.log(filename)
                    DB.query(
                        updateAccount,
                        (err, Result) => {
                            if (err) throw err;
                            res.status(201).json({ Result })
                        }
                    )

                } else {
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
                            res.status(201).json({ Result })
                        }
                    )
                    console.log(updateAccount);
                }
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
            res.status(201).json({ Result })
        }

    )
}

export const allAccount = (req, res, next) => {
    const getAccount = sqlallAccount();
    DB.query(
        getAccount,
        (err, Result) => {
            if (err) throw err;
            res.status(201).json({ Result })
        }
    )
}


export const deleteAccount = (req, res, next) => {

    const deleteAccount = sqlDeleteAccount(
        req.body.uuid
    );

    DB.query(
        deleteAccount,
        (err, Result) => {
            if (err) throw err;
            res.status(201).json({ Result })
        }
    )
}

















