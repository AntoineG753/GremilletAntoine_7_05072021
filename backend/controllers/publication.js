import { DB } from '../connectDB.js';
import {} from 'dotenv/config';
import jwt from 'jsonwebtoken';
import { sqlCreatePublication, sqlUpdatePublication, sqlDeletePublication, sqlRealPublication } from '../utils/scriptSQL.js';
import { Result } from 'express-validator';


export const createPublication = (req, res, next) => {

    const createPublication = sqlCreatePublication(
        req.body.picture,
        req.body.comment,
        req.body.user_id,
    );

        console.log(createPublication),


    DB.query(
        createPublication,
        function(error) {
            if (error) throw error;
        }
    )
    res.status(201).json({ message: 'Publication envoyée !' })
}


export const updatePublication = (req, res, next) => {

    const updatePublication = sqlUpdatePublication(
        req.body.picture,
        req.body.comment,
        req.body.user_id,
        // recuperer l'id de la publication
    );

        console.log(updatePublication),


    DB.query(
        updatePublication,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Publication modifiée !' })
}


export const realPublication = (req, res, next) => {

    const realPublication = sqlRealPublication();

    DB.query(
        realPublication,
        (err, Result) => {
            if (err) throw err;

            for (let i = 0; i < Result.length; i++) {
                
                comment: Result[i].comment
                console.log(Result[i])
            }
            res.status(201).json({Result})
        }
    )
}

export const deletePublication = (req, res, next) => {

    const deletePublication = sqlDeletePublication(
        req.body.user_id,
        // recuperer l'id de la publication
    );

console.log(deletePublication)

    DB.query(
        deletePublication,
        function(error) {
            if (error) throw error;
        }

    )
    res.status(201).json({ message: 'Publication suprimée !' })
}


































