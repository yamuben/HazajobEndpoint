import express from 'express';
import errorHandler from './controllers/errorController';
import AppError from './utils/appError';
import userInfosRouter from './routes/userInfosRoute';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use('/api/v1/users', userInfosRouter);
app.use(errorHandler);
app.all('*', (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server😔`));
});

export default app;
