const asyncHandler = require('express-async-handler');
const menuItemRepository = require('../repositories/menuItemRepository');

// @desc    Get all menu items
// @route   GET /api/menu
// @access  Public
const getMenuItems = asyncHandler(async (req, res) => {
  const { category } = req.query;
  
  let filters = { isAvailable: true };
  if (category && category !== 'all') {
    filters.category = category;
  }
  
  const items = await menuItemRepository.findAll(filters);
  
  res.json({
    success: true,
    count: items.length,
    data: items,
  });
});

// @desc    Get single menu item
// @route   GET /api/menu/:id
// @access  Public
const getMenuItem = asyncHandler(async (req, res) => {
  const item = await menuItemRepository.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Menu item not found');
  }
  
  res.json({
    success: true,
    data: item,
  });
});

// @desc    Create menu item
// @route   POST /api/menu
// @access  Private/Admin
const createMenuItem = asyncHandler(async (req, res) => {
  const item = await menuItemRepository.create(req.body);
  
  res.status(201).json({
    success: true,
    data: item,
  });
});

// @desc    Update menu item
// @route   PUT /api/menu/:id
// @access  Private/Admin
const updateMenuItem = asyncHandler(async (req, res) => {
  let item = await menuItemRepository.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Menu item not found');
  }
  
  item = await menuItemRepository.update(req.params.id, req.body);
  
  res.json({
    success: true,
    data: item,
  });
});

// @desc    Delete menu item
// @route   DELETE /api/menu/:id
// @access  Private/Admin
const deleteMenuItem = asyncHandler(async (req, res) => {
  const item = await menuItemRepository.findById(req.params.id);
  
  if (!item) {
    res.status(404);
    throw new Error('Menu item not found');
  }
  
  await menuItemRepository.delete(req.params.id);
  
  res.json({
    success: true,
    message: 'Menu item removed',
  });
});

module.exports = {
  getMenuItems,
  getMenuItem,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};