import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import authRoute from '../routes/auth.mjs';
import classRoute from '../routes/classes.mjs';
import clientRoute from '../routes/client.mjs';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/classes', classRoute);
app.use('/api/client', clientRoute);

app.use('/', (req, res) =>
  res.send(`
    <h2>Anywhere Fitness API</h2>
  `)
);

export default app;
