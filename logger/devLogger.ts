import winston, { format, createLogger } from 'winston';

type logFormatParams = {
  level: string;
  message: string;
  stack?: any;
};

const { combine } = format;

const buildDevLogger = () => {
  const logFormat = format.printf(({ level, message, stack }: logFormatParams) => {
    return `${level}: ${message || stack}`;
  });
  return createLogger({
    format: combine(format.colorize(), format.errors({ stack: true }), logFormat),
    transports: [new winston.transports.Console()],
  });
};

export default buildDevLogger;
