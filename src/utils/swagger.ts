import { PORT } from "./config";

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Country API',
      version: '1.0.0',
    },
    servers: [
        {
          url: `http://localhost:${PORT}`,
          description: 'Development server',
        },
      ],
  },
  apis: ['src/controllers/*.ts'],
};
