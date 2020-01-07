import mongoose from 'mongoose';

const classSchema = new mongoose.Schema({
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  type: {
    type: String,
    default: 'Yoga',
    enum: ['Yoga', 'Boxing', 'Pilates', 'Martial Arts', 'Weightlifting']
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    required: true
  },
  days: {
    type: [String],
    default: ['Sunday'],
    enum: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ]
  },
  intensityLevel: {
    type: String,
    default: 'Beginner',
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  requirements: {
    type: String
  },
  location: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  arrivalDetails: {
    type: String
  },
  shouldKnowDetails: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('class', classSchema);
