import mongoose from "mongoose";
import React from "react";
let initialized = false;

export const connect = async () => {
  mongoose.set("strictQuery", true);

  if (initialized) {
    console.log("mongoDB already connected");
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "next auth app",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🌐🔗 MongoDB Database Connected...🔌✅");
  } catch (error) {
    console.log("⚠️🚨 MongoDB Connection Error... 🔍🚧", error);
  }
};
