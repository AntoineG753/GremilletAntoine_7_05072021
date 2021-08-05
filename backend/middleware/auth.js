import { DB } from "../connectDB.js";
import jwt from "jsonwebtoken";
import { sqlAuthToken } from "../utils/scriptSQL.js";



export const auth = (req, res, next) => {
    
    const sqlauthtoken = sqlAuthToken(
        req.query.ID
    );

    try {
        DB.query(sqlauthtoken,
            (err, result) => {
                if (err) res.status(500).json({error: "erreur serveur"});
                const token = req.headers.authorization.split(' ')[1];
                const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN_KEY, (error, decoded) => {
                    console.log(decoded)
                    if (error) {
                        res.status(401).json({ message: error })
                    } else {
                        if (decoded.userToken && decoded.userToken === result[0].uuid) {
                            res.locals.userId = req.query.ID
                            next()
                        } else {
                            res.status(401).json({ message: "probléme d'identification" })
                        }
                    }
                });
            }
        )
    } 
    catch (error) { 
        res.status(401).json({ error }) 
    }
};
















