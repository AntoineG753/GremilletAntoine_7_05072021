import { DB } from '../connectDB.js';
import {} from 'dotenv/config';
import jwt from 'jsonwebtoken';
import dateJsToSql from '../utils/date.js';
import { sqlCreatePublication } from '../utils/scriptSQL.js';


export const createPublication = (req, res, next) => {

    const date = new Date();

    const createPublication = sqlCreatePublication(
        req.body.picture,
        req.body.comment,
        dateJsToSql(date),
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

    const date = new Date();

    const updatePublication = sqlUpdatePublication(
        req.body.picture,
        req.body.comment,
        dateJsToSql(date),
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




































