import express from 'express';
import router from './routes';

const app = express();

app.use(express.json());

app.use(router);

app.get('/', (_req, res) => res.send('Working'));

export default app;