const swaggerConfig = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'XP-api',
      description: 'Api que simula uma corretora de ações',
      version: '1.0',
    },
    servers: [{
      url: 'http://localhost:8000',
      description: 'Servidor local',
    }, {
      url: 'https://projeto-xp.herokuapp.com',
      description: 'Heroku deploy',
    }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/index.ts'],
};

export default swaggerConfig;