import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { registerValidation, loginValidation } from '../validation.mjs';
import { sendEmail } from '../helpers/sendgrid.mjs';
import User from '../model/User.mjs';
import Token from '../model/Token.mjs';

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
  // validate data before creating user
  const { error } = registerValidation(req.body);
  if (error) {
    const { details } = error;
    const message = details.map(detail => detail.message).join(',');
    res.status(422).json({ error: message });
  }

  const { firstName, lastName, email, password, role } = req.body;

  try {
    // check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: 'User is already registered' });

    // hash passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: role || 'client'
    });

    const newUser = await user.save();

    if (newUser.role === 'instructor') sendEmail(newUser, req, res);

    res.json({
      id: newUser._id,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
      role: newUser.role
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  // validate data before logging in user
  const { error } = loginValidation(req.body);
  if (error) {
    const { details } = error;
    const message = details.map(detail => detail.message).join(',');
    res.status(422).json({ error: message });
  }

  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User doesn't exist" });

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid Password' });

    // Make sure the user with instructor role has been verified
    if (user.role === 'instructor' && !user.isVerified)
      return res.status(401).json({
        type: 'not-verified',
        message: 'Your account has not been verified.'
      });

    //  create token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.TOKEN_SECRET
    );

    res.header('authorization', token).json({
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

// Confirm token
router.get('/verify/:token', async (req, res) => {
  if (!req.params.token)
    return res
      .status(400)
      .json({ message: 'We were unable to find a user for this token.' });

  try {
    // Find a matching token
    const token = await Token.findOne({ token: req.params.token });

    if (!token)
      return res.status(400).json({
        message:
          'We were unable to find a valid token. Your token my have expired.'
      });

    const user = await User.findOne({ _id: token.userId });
    if (!user)
      return res
        .status(400)
        .json({ message: 'We were unable to find a user for this token.' });

    if (user.isVerified)
      return res
        .status(400)
        .json({ message: 'This user has already been verified.' });

    user.isVerified = true;

    await user.save();

    res
      .status(200)
      .json({ message: 'The account has been verified. Please log in.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Resend token
router.post('/resend', async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user)
      return res.status(401).json({
        message:
          'The email address ' +
          req.body.email +
          ' is not associated with any account. Double-check your email address and try again.'
      });

    if (user.isVerified)
      return res.status(400).json({
        message: 'This account has already been verified. Please log in.'
      });

    await sendEmail(user, req, res);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
