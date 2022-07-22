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
    }],
  },
  apis: ['./src/routes/index.ts'],
};

export default swaggerConfig;