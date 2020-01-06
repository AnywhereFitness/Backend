import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoute from '../routes/auth.mjs';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);

app.use('/', (req, res) =>
  res.send(`
    <h2>Anywhere Fitness API</h2>
  `)
);

export default app;
