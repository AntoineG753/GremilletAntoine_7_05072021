import { DB } from '../connectDB.js';
import { } from 'dotenv/config';
import { sqlCreateLike, sqlDeleteLike } from '../utils/scriptSQL.js';
import { Result } from 'express-validator';


export const createLike = (req, res, next) => {

    const creatLike = sqlCreateLike(
        req.body.publication_id,
        req.body.user_id,
        req.body.like_user_id
    )

    DB.query(
        creatLike,
        function (error) {
            if (error) throw error;
        }
    )
    res.status(201).json({ message: 'Publication envoyée !' })
}


export const deleteLike = (req, res, next) => {

    const deleteLike = sqlDeleteLike(
        
        )    

    DB.query(
        deleteLike,
        function (error) {
            if (error) throw error;
        }
    )
    res.status(201).json({ message: 'Publication envoyée !' })
}


export const getLike = (req, res, next) => {
    
        const getLike = sqlDeleteLike(
            req.body.publication_id,
            )    
    
        DB.query(
            getLike,
            (err, Result) => {
                if (err) throw err;
                res.status(201).json({Result})
            }
        )
        res.status(201).json({ message: 'Publication envoyée !' })
    }
    






