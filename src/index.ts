
import { Elysia } from 'elysia';
import { logger } from './logger';

const app = new Elysia()
  .get('/', () => {
    logger.info({
      path: '/',
      timestamp: new Date()
    }, 'Info called');
    return 'Hello World!';
  })
  .get('/debug', () => {
    logger.debug({
      path: '/debug',
      someData: { test: 123 }
    }, 'Debug called');
    return 'Debug endpoint';
  })
  .get('/error', () => {
    try {
      throw new Error('Something went wrong!');
    } catch (err) {
      if (err instanceof Error) {
        logger.error({
          path: '/error',
          error: err.message,
          stack: err.stack
        }, 'Error occurred');
      }
      return 'Error endpoint';
    }
  })
  .listen(3000);

console.log(
  `🦊 Server is running at ${app.server?.hostname}:${app.server?.port}`
);