import mongoose, { Document, Schema } from "mongoose";
import bcrypt from "bcryptjs";  // Import bcryptjs

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  termsAccepted: boolean;
}

// Create the schema
const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Hash the password before saving the user document
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next(); // Only hash the password if it's modified
  }

  try {
    // Generate a salt with 10 rounds
    const salt = await bcrypt.genSalt(10);
    // Hash the password using the salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err); // Pass the error to the next middleware if any
  }
});

// Create and export the model
const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
