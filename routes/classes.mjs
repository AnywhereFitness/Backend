import express from 'express';
import verifyToken from '../middleware/verifyToken.mjs';
import verifyRole from '../middleware/verifyRole.mjs';
import Class from '../model/Class.mjs';
import Reservation from '../model/Reservation.mjs';

const router = express.Router();

// Get Classes
router.get('/', verifyToken, async (req, res) => {
  try {
    const classes = await Class.find();
    res.send(classes);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Class By ID
router.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const class_ = await Class.findById(id);
    res.send(class_);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get Class By Instructor
router.get('/instructor/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const class_ = await Class.find({ instructor: id });
    res.send(class_);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add Class
router.post('/', [verifyToken, verifyRole('instructor')], async (req, res) => {
  const data = req.body;

  try {
    // const user = await User.findById({ id: req.user.id });
    const class_ = new Class({
      ...data,
      instructor: req.user.id
    });
    const newClass = await class_.save();
    res.send(newClass);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add Reservation
router.post(
  '/:id/reservation',
  [verifyToken, verifyRole('client')],
  async (req, res) => {
    const { id } = req.params;

    try {
      // const user = await User.findById({ id: req.user.id });
      const reservation = new Reservation({ class: id, user: req.user.id });
      const newReservation = await reservation.save();

      res.send(newReservation);
    } catch (error) {
      res.status(400).send(error);
    }
  }
);

// Delete Class
router.delete('/:id', [verifyToken, verifyRole], async (req, res) => {
  const { id } = req.params;
  try {
    const removedClass = await Class.deleteOne({ _id: id });
    res.send(removedClass);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update Class
router.patch('/:id', [verifyToken, verifyRole], async (req, res) => {
  const { id } = req.params;
  try {
    const updatedClass = await Class.updateOne(
      { _id: id },
      {
        $set: {
          ...req.body
        }
      }
    );
    res.send(updatedClass);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
