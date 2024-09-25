// global.d.ts
import mongoose from "mongoose";
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
  var _mongoClientPromise: Promise<any>;
}

// Prevent TypeScript from treating the file as a script
export {};
