import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import userRoutes from './routes/users.js';
import publicationRoutes from './routes/publications.js';
import likesRoutes from './routes/likes.js';


const app = express();

const limiter = rateLimit({ // limite les requete a 100 sur un tranche de 15mins
  windowMs: 15 * 60 * 1000,
  max: 300
})

app.use(helmet());
app.use(limiter);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(express.json());  

  
  app.use('/pictures', express.static('pictures'));
  app.use('/api/auth', userRoutes);
  app.use('/api/publication', publicationRoutes);
  app.use('/api/likes', likesRoutes);

 export default app;