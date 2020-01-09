import mongoose from 'mongoose';
import crypto from 'crypto';
import Token from '../model/Token.mjs';
import generate from 'nanoid/generate';

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
  isVerified: {
    type: Boolean,
    default: false
  },
  resetPasswordToken: {
    type: String,
    required: false
  },

  resetPasswordExpires: {
    type: Date,
    required: false
  },
  // classes: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'Class'
  //   }
  // ],
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

userSchema.methods.generatePasswordReset = function() {
  this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

userSchema.methods.generateVerificationToken = function() {
  let payload = {
    userId: this._id,
    token: generate('1234567890', 6)
  };

  return new Token(payload);
};

export default mongoose.model('user', userSchema);
