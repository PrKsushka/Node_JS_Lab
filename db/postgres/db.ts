import { createConnection } from 'typeorm';
import logger from '../../logger/logger';

const connectionToPostgresDataBase = () => {
  try {
    createConnection().then(() => {
      logger.info('Postgres connection success');
    });
  } catch (err) {
    logger.error('Postgres connection failed');
    process.exit(1);
  }
};
export default connectionToPostgresDataBase;
