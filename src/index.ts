import express from 'express';
import { projectRouter } from './project/project-routes.js';
import { userRouter } from './user/user-routes.js';
import { categoryRouter } from './category/category-routes.js';

const app = express();

app.use(express.json())

// CORS middleware (sin dependencias) - permite requests desde el front en http://localhost:4200
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');

  // Responder preflight requests inmediatamente
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use('/api/projects', projectRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);
  

app.listen(3000, () => {
  console.log('Server runnning on http://localhost:3000/')
})
