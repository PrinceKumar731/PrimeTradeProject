import { app } from './app.js';
import { connectDatabase } from './config/db.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const startServer = async () => {
  try {
    await connectDatabase();

    app.listen(env.port, () => {
      logger.info(
        `Server running on port ${env.port} in ${env.nodeEnv} mode`
      );
    });
  } catch (error) {
    logger.error(`Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
