const asyncHandler = require('express-async-handler');
const userRepository = require('../repositories/userRepository');

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await userRepository.getAll();
  
  res.json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await userRepository.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  res.json({
    success: true,
    data: user,
  });
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await userRepository.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  const updatedUser = await userRepository.update(req.params.id, req.body);
  
  res.json({
    success: true,
    data: updatedUser,
  });
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await userRepository.findById(req.params.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  await userRepository.delete(req.params.id);
  
  res.json({
    success: true,
    message: 'User removed',
  });
});

// @desc    Update profile
// @route   PUT /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
  const user = await userRepository.findById(req.user.id);
  
  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }
  
  const updatedUser = await userRepository.update(req.user.id, req.body);
  
  res.json({
    success: true,
    data: updatedUser,
  });
});

module.exports = {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  updateProfile,
};