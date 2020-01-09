import sendGrid from '@sendgrid/mail';

export const sendEmail = async (user, req, res) => {
  sendGrid.setApiKey(process.env.SENDGRID_API_KEY);
  const generatedToken = user.generateVerificationToken();
  try {
    const token = await generatedToken.save();
    const msg = {
      to: user.email,
      from: process.env.FROM_EMAIL,
      subject: 'Account Verification Token',
      text: `Hi ${user.firstName}, \n 
                    Please use the following token: ${token.token} to verify your account. \n\n 
                    If you did not request this, please ignore this email.\n`
    };
    await sendGrid.send(msg);
    res.status(200).json({
      message: `'A verification email has been sent to ${user.email}.`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
