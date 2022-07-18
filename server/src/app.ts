import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import router from './routes';

const app = express();

app.use(express.json());

app.use(router);
app.use(errorMiddleware);

app.get('/', (_req, res) => res.send('Working'));

export default app;