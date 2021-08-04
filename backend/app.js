import express from 'express';
import userRoutes from './routes/users.js';
import publicationRoutes from './routes/publications.js';


const app = express();
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());  

 app.use('/api/auth', userRoutes);
 app.use('/api/publication', publicationRoutes);

 export default app;