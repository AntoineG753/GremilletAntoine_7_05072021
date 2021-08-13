import { DB } from '../connectDB.js';
import {} from 'dotenv/config';
import * as fs  from 'fs';
import { sqlCreatePublication, sqlUpdatePublication, sqlDeletePublication, sqlRealPublication } from '../utils/scriptSQL.js';
import { Result } from 'express-validator';


export const createPublication = (req, res, next) => {
console.log(req)
    if(!req.body.comment) {
        var comment = "";
    } else {
        var comment = req.body.comment;
    }


    if (!req.file) {
   
    var Publication = sqlCreatePublication(
        
        "",
        comment,
        req.body.userId,
    );
    } else {
    
     var Publication = sqlCreatePublication(
        
        `${req.protocol}://${req.get('host')}/pictures/${req.file.filename}`,
        comment,
        req.body.userId,
    );
    }

    DB.query(
        Publication,
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
               
                
            }
            res.status(201).json({Result})
        }
    )
}

export const deletePublication = (req, res, next) => {


    const deletePublication = sqlDeletePublication(
        req.body.publication_id
    );
        const filename = req.body.filename.split('/pictures/')[1];
        fs.unlink(`pictures/${filename}`, (error => error));
    DB.query(
        deletePublication,
        function(error) {
            if (error) throw error;
        }
    )
    res.status(201).json({ message: 'Publication suprimée !' })
}


































