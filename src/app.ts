import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import express from 'express';
import errorMiddleware from './middlewares/error.middleware';
import router from './routes';
import 'express-async-errors';

import swaggerConfig from './docs/swagger.config';

const app = express();

app.use(express.json());

const swaggerDoc = swaggerJSDoc(swaggerConfig);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(router);
app.use(errorMiddleware);

export default app;
