import mongoose from 'mongoose';

const userSchema = mongoose.Schema(
  {
    firstName: { type: String, min: 2, max: 50, required: true },
    lastName: { type: String, min: 2, max: 50, required: true },
    email: {
      type: String,
      min: 5,
      max: 50,
      required: true,
      unique: true,
      trim: true,
    },
    password: { type: String, required: true },
    role: {
      type: 'String',
      default: 'basic',
      enum: ['basic', 'edit', 'admin'],
    },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const User = mongoose.model('users', userSchema);
export default User;
