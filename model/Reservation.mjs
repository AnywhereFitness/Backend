import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
  classId: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model('reservation', reservationSchema);
