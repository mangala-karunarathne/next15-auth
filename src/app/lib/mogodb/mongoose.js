// import mongoose from "mongoose";
// import React from "react";
// let initialized = false;

// export const connect = async () => {
//   mongoose.set("strictQuery", true);

//   if (initialized) {
//     console.log("mongoDB already connected");
//   }

//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "nextAuthApp",
//     });
//     console.log("🌐🔗 MongoDB Database Connected...🔌✅");
//   } catch (error) {
//     console.log("⚠️🚨 MongoDB Connection Error... 🔍🚧", error);
//   }
// };

// lib/mongodb/mongoose.js

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = "nextAuthApp";

if (!MONGODB_URI) {
  throw new Error("⚠️ Please define the MONGODB_URI environment variable");
}

/** Global is used here to maintain a cached connection across hot reloads (in dev) or serverless cold starts */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if (cached.conn) {
    // Connection already established
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      dbName: DB_NAME,
      bufferCommands: false,
    };

    mongoose.set("strictQuery", true);
    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      console.log("🌐🔗 MongoDB Database Connected...🔌✅");
      return mongoose;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
