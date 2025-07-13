import mongoose from "mongoose";

// This will keep track of the connection status
let isConnected = false;

const connectMongo = async () => {
  if (isConnected) {
    return;
  }

  try {
    // Ensure that the MongoDB URI is set
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MongoDB URI is not defined in environment variables.");
    }

    // Attempt to connect to MongoDB with increased timeout settings
    await mongoose.connect(mongoURI, {
      connectTimeoutMS: 30000,  // Increase connection timeout to 30 seconds
      socketTimeoutMS: 45000,   // Increase socket timeout to 45 seconds
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Failed to connect to MongoDB");
  }
};

export default connectMongo;
