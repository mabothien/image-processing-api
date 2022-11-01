import dotenv from 'dotenv';
import express, { Application } from 'express'
import routes from './routes/api';

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

app.use('/api', routes);

const server = app.listen(port, (): void => {
  console.log(`Server started at http://localhost:${port}`);
});

module.exports = server;
