import { config, assertRuntimeConfig } from './config.js';
import app from './app.js';
import { connectDB, disconnectDB } from '../config/db.js';

let server;
let shuttingDown = false;

try {
  assertRuntimeConfig();
  await connectDB();
  server = app.listen(config.port, () => {
    console.log(`Nature's Golden Gift API listening on port ${config.port}.`);
  });
} catch (error) {
  console.error('API startup failed. Check MongoDB availability and MONGODB_URI.', error.name);
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
