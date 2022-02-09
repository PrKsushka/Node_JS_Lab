import * as process from 'process';
import buildDevLogger from './devLogger';
import winston from 'winston';

let logger: any;
if (process.env.NODE_ENV === 'development') {
  logger = buildDevLogger();
}
export default logger;
