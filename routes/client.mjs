import express from 'express';
import verifyToken from '../middleware/verifyToken.mjs';
import verifyRole from '../middleware/verifyRole.mjs';
import Class from '../model/Class.mjs';
import Reservation from '../model/Reservation.mjs';
import User from '../model/User.mjs';

const router = express.Router();

// Get Client Users
router.get(
  '/profile',
  [verifyToken, verifyRole('client')],
  async (req, res) => {
    try {
      const profile = await User.findOne({ _id: req.user.id });
      const reservations = await Reservation.find({
        userId: req.user.id
      }).select('_id classId');
      const { _id, firstName, lastName, email } = profile;
      res.send({ _id, firstName, lastName, email, reservations });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Get Reservations
router.get(
  '/reservations',
  [verifyToken, verifyRole('client')],
  async (req, res) => {
    try {
      const reservations = await Reservation.find({
        userId: req.user.id
      }).select('userId classId');
      res.send(reservations);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Add Reservation
router.post(
  '/reservation/:classId',
  [verifyToken, verifyRole('client')],
  async (req, res) => {
    const { classId } = req.params;

    try {
      const reservation = new Reservation({
        classId: classId,
        userId: req.user.id
      });
      const newReservation = await reservation.save();
      await Class.updateOne(
        { _id: classId },
        {
          $push: {
            registeredAttendees: newReservation
          }
        }
      );

      res.send(newReservation);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Delete Reservation
router.delete(
  '/reservation/:classId',
  [verifyToken, verifyRole('client')],
  async (req, res) => {
    const { classId } = req.params;
    try {
      const removedReservation = await Reservation.findOneAndRemove({
        classId
      });
      await Class.updateOne(
        { _id: classId },
        {
          $pull: {
            registeredAttendees: removedReservation._id
          }
        }
      );
      console.log(removedReservation);
      res.send({
        message: `Reservation: ${removedReservation._id} deleted`
      });
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

export default router;
