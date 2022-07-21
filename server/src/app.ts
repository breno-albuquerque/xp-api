import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import router from './routes';
import 'express-async-errors';

const app = express();

app.use(express.json());

app.use(router);
app.use(errorMiddleware);

export default app;
