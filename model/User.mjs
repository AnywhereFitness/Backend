import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    max: 64
  },
  lastName: {
    type: String,
    required: true,
    max: 64
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 120,
    unique: true
  },
  password: {
    type: String,
    required: true,
    max: 1024,
    min: 6
  },
  role: {
    type: String,
    default: 'client',
    enum: ['client', 'instructor']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('user', userSchema);
