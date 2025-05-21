import { ApplicationConfig } from '@application/common/interfaces';

export function makeConfig(): ApplicationConfig {
  const env = process.env.NODE_ENV;
  const logLevel = process.env.LOG_LEVEL;
  const port = Number(process.env.PORT);

  if (!env || !['development', 'production', 'test'].includes(env)) {
    throw new Error('Invalid NODE_ENV');
  }

  if (!logLevel || !['debug', 'info', 'warn', 'error'].includes(logLevel)) {
    throw new Error('Invalid LOG_LEVEL');
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('Invalid PORT');
  }

  return {
    env,
    logLevel,
    port,
  };
}
