import express from 'express';
import errorHandler from './controllers/errorController';
import AppError from './utils/appError';
import userInfosRouter from './routes/userInfosRoute';
import jobAppRouter from './routes/jobAppRoute';
import jobInfosRouter from './routes/jobInfosRoute';

const app = express();

app.use(express.json({ limit: '10kb' }));
app.use('/api/v1/users', userInfosRouter);
app.use('/api/v1/jobApps', jobAppRouter);
app.use('/api/v1/jobInfos', jobInfosRouter);
app.all('*', (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server😔`));
});
app.use(errorHandler);

export default app;
