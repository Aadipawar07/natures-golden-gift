import mongoose from 'mongoose';
import { config } from '../src/config.js';

const cached = globalThis.mongooseConn || { connection: null, promise: null };
globalThis.mongooseConn = cached;

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.name);
});

export async function connectDB(uri = config.mongodbUri) {
  if (mongoose.connection.readyState === 1) {
    cached.connection = mongoose.connection;
    return cached.connection;
  }
  if (cached.connection?.readyState === 1) return cached.connection;
  if (cached.promise) return cached.promise;
  const normalizedUri = typeof uri === 'string'
    ? uri.trim().replace(/^['"]|['"]$/g, '').trim()
    : '';
  if (!normalizedUri) throw new Error('MONGODB_URI is required to connect to MongoDB.');

  cached.promise = mongoose.connect(normalizedUri, {
    serverSelectionTimeoutMS: 10000,
    family: 4,
    maxPoolSize: 10,
  }).then(({ connection }) => {
    cached.connection = connection;
    console.log(`MongoDB Connected: ${connection.host}/${connection.name}`);
    return connection;
  }).catch((error) => {
    cached.connection = null;
    throw error;
  }).finally(() => {
    cached.promise = null;
  });

  return cached.promise;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
  cached.connection = null;
  cached.promise = null;
}

export { mongoose };
