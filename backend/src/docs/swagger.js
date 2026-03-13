import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { env } from '../config/env.js';

const swaggerDefinition = {
  openapi: '3.0.3',
  info: {
    title: 'Scalable REST API',
    version: '1.0.0',
    description:
      'REST API with JWT authentication, role-based access control, and task CRUD operations.',
  },
  servers: [
    {
      url: `http://localhost:${env.port}/api/${env.apiVersion}`,
      description: 'Local development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    schemas: {
      ErrorResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Validation failed',
          },
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                field: {
                  type: 'string',
                  example: 'email',
                },
                message: {
                  type: 'string',
                  example: 'Please provide a valid email address',
                },
              },
            },
          },
        },
      },
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '65f0f1d69f8f2a001f98f123',
          },
          name: {
            type: 'string',
            example: 'Prince Kumar',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'prince@example.com',
          },
          role: {
            type: 'string',
            enum: ['user', 'admin'],
            example: 'user',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      AuthResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Login successful',
          },
          data: {
            type: 'object',
            properties: {
              user: {
                $ref: '#/components/schemas/User',
              },
              token: {
                type: 'string',
                example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              },
            },
          },
        },
      },
      RegisterRequest: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
          name: {
            type: 'string',
            example: 'Prince Kumar',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'prince@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'Password123',
          },
        },
      },
      LoginRequest: {
        type: 'object',
        required: ['email', 'password'],
        properties: {
          email: {
            type: 'string',
            format: 'email',
            example: 'prince@example.com',
          },
          password: {
            type: 'string',
            format: 'password',
            example: 'Password123',
          },
        },
      },
      Task: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '65f0f2a29f8f2a001f98f456',
          },
          title: {
            type: 'string',
            example: 'Finish API documentation',
          },
          description: {
            type: 'string',
            example: 'Add Swagger docs for auth and task routes',
          },
          status: {
            type: 'string',
            enum: ['pending', 'in-progress', 'completed'],
            example: 'pending',
          },
          userId: {
            type: 'string',
            example: '65f0f1d69f8f2a001f98f123',
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
          },
        },
      },
      CreateTaskRequest: {
        type: 'object',
        required: ['title'],
        properties: {
          title: {
            type: 'string',
            example: 'Prepare release notes',
          },
          description: {
            type: 'string',
            example: 'Summarize Step 7 API documentation changes',
          },
          status: {
            type: 'string',
            enum: ['pending', 'in-progress', 'completed'],
            example: 'pending',
          },
        },
      },
      UpdateTaskRequest: {
        type: 'object',
        properties: {
          title: {
            type: 'string',
            example: 'Prepare release notes',
          },
          description: {
            type: 'string',
            example: 'Summarize Step 7 API documentation changes',
          },
          status: {
            type: 'string',
            enum: ['pending', 'in-progress', 'completed'],
            example: 'completed',
          },
        },
      },
      TaskListResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          message: {
            type: 'string',
            example: 'Tasks fetched successfully',
          },
          data: {
            type: 'array',
            items: {
              $ref: '#/components/schemas/Task',
            },
          },
          meta: {
            type: 'object',
            properties: {
              page: {
                type: 'integer',
                example: 1,
              },
              limit: {
                type: 'integer',
                example: 10,
              },
              total: {
                type: 'integer',
                example: 2,
              },
              totalPages: {
                type: 'integer',
                example: 1,
              },
            },
          },
        },
      },
    },
  },
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ['./src/docs/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerServe = swaggerUi.serve;
export const swaggerSetup = swaggerUi.setup(swaggerSpec, {
  explorer: true,
});
