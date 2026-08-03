import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/elham-academy';

/**
 * Cache the connection on the global object. In development Next.js clears the
 * module registry on every request, which would otherwise open a new connection
 * pool on each reload.
 */
let cached = global.__elhamMongoose;

if (!cached) {
  cached = global.__elhamMongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        bufferCommands: false,
        serverSelectionTimeoutMS: 3000,
      })
      .then((m) => m);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    // Reset so a later request can retry a fresh connection.
    cached.promise = null;
    throw error;
  }

  return cached.conn;
}

/**
 * `serverSelectionTimeoutMS` does not bound the SRV/TXT DNS lookup that a
 * `mongodb+srv://` URI performs first, so an unreachable cluster can hang a
 * request for 30-60s before the driver ever reports a failure. This puts a hard
 * ceiling on the whole attempt.
 */
export function connectWithTimeout(timeoutMs = 6000) {
  const attempt = connectToDatabase();

  // The race can leave this promise's rejection unobserved; swallow it here so
  // Node does not report an unhandled rejection.
  attempt.catch(() => {});

  let timer;
  return Promise.race([
    attempt,
    new Promise((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`MongoDB connection timed out after ${timeoutMs}ms`)),
        timeoutMs
      );
    }),
  ]).finally(() => clearTimeout(timer));
}

export default connectToDatabase;
