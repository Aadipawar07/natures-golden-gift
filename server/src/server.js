import dotenv from 'dotenv';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const serverDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const renderSecretPath = '/etc/secrets/.env';
dotenv.config({
  path: existsSync(renderSecretPath)
    ? renderSecretPath
    : path.join(serverDirectory, '.env'),
  override: false,
});

const { config, assertRuntimeConfig } = await import('./config.js');
const { default: app } = await import('./app.js');
const { connectDB, disconnectDB } = await import('../config/db.js');

let server;
let shuttingDown = false;

export default app;

if (process.env.VERCEL) {
  assertRuntimeConfig();
} else {
  try {
    assertRuntimeConfig();
    await connectDB();
    server = app.listen(config.port, '0.0.0.0', () => {
      console.log(`Nature's Golden Gift API listening on port ${config.port}.`);
    });
  } catch (error) {
    console.error('API startup failed:', error.message, error);
    process.exitCode = 1;
  }

  async function shutdown(signal) {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`${signal} received; closing API server.`);
    const forceExitTimer = setTimeout(() => {
      console.error('API shutdown timed out.');
      process.exit(1);
    }, 10000);
    forceExitTimer.unref();

    try {
      if (server) {
        await new Promise((resolve, reject) => {
          server.close((error) => (error ? reject(error) : resolve()));
        });
      }
      await disconnectDB();
    } catch (error) {
      console.error('API shutdown failed.', error.name);
      process.exitCode = 1;
    } finally {
      clearTimeout(forceExitTimer);
    }
  }

  process.on('SIGINT', () => shutdown('SIGINT'));
  process.on('SIGTERM', () => shutdown('SIGTERM'));
}
