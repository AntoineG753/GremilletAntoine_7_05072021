import { DB } from '../connectDB.js';
import {} from 'dotenv/config';
import jwt from 'jsonwebtoken';
import dateJsToSql from '../utils/date.js';
import { sqlCreatePublication } from '../utils/scriptSQL.js';


export const createPublication = (req, res, next) => {

    const createPublication = sqlCreatePublication(
        req.body.picture,
        req.body.comment,
        dateJsToSql(date),
        
    );




    DB.query(
        
    )
}







































