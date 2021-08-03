import { createConnection } from 'mysql';

// Create connection 
const DB = createConnection({
    host: 'localhost',
    user: 'projet7',
    password: '753projet951',
    database: 'groupomania',
    timezone: 'Europe/Paris'
});


DB.connect ((err) => {
    if (err) throw err;
    console.log('connected !');
});


export { DB };