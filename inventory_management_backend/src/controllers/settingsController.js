import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import SystemLog from '../models/systemLogModel.js';

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.fullName = req.body.fullName || user.fullName;
    user.email = req.body.email || user.email;
    user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    await SystemLog.create({
      user: user._id,
      actionType: 'USER_PROFILE_UPDATED',
      details: { userId: user._id },
    });

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updateNotifications = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.notifications = req.body.notifications;
    const updatedUser = await user.save();

    await SystemLog.create({
      user: user._id,
      actionType: 'NOTIFICATIONS_UPDATED',
      details: { userId: user._id },
    });

    res.json({
      _id: updatedUser._id,
      fullName: updatedUser.fullName,
      email: updatedUser.email,
      phoneNumber: updatedUser.phoneNumber,
      role: updatedUser.role,
      notifications: updatedUser.notifications,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

const updatePassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.password = req.body.password;
    const updatedUser = await user.save();

    await SystemLog.create({
      user: user._id,
      actionType: 'PASSWORD_UPDATED',
      details: { userId: user._id },
    });

    res.json({ message: 'Password updated successfully' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

export {
  getUserProfile,
  updateUserProfile,
  updateNotifications,
  updatePassword,
};
