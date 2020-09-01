import express from 'express';
import errorHandler from './controllers/errorController';

const app = express();

app.use(errorHandler);

export default app;
