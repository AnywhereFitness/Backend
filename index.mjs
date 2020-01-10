import app from './api/server.mjs';
import dotenv from 'dotenv';
import db from './db/index.mjs';

dotenv.config();

db.connect(process.env.DB_CONNECT);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server Up and Running on port: ${port}`));
