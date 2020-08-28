import dontenv from 'dotenv';
import mongoose from 'mongoose';
import app from './index';

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION 💥💥💥shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dontenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected successfull!');
  });

const port = process.env.PORT;

const server = app.listen(port, () => {
  console.log(`Server running on ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION 💥💥 shutting down...');
  console.log(err.stack);
  server.close(() => {
    process.exit(1);
  });
});
