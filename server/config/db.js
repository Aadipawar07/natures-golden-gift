import mongoose from 'mongoose';
import { config } from '../src/config.js';

let connectionPromise;

mongoose.connection.on('error', (error) => {
  console.error('MongoDB connection error:', error.name);
});

export async function connectDB(uri = config.mongodbUri) {
  if (mongoose.connection.readyState === 1) return mongoose.connection;
  if (connectionPromise) return connectionPromise;
  if (!uri) throw new Error('MONGODB_URI is required to connect to MongoDB.');

  connectionPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    maxPoolSize: 10,
  }).then(({ connection }) => {
    console.log(`MongoDB Connected: ${connection.host}/${connection.name}`);
    return connection;
  }).finally(() => {
    connectionPromise = null;
  });

  return connectionPromise;
}

export async function disconnectDB() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}

export { mongoose };
