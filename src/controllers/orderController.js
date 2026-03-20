const asyncHandler = require('express-async-handler');
const orderRepository = require('../repositories/orderRepository');
const menuItemRepository = require('../repositories/menuItemRepository');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = asyncHandler(async (req, res) => {
  const { orderItems, paymentMethod, deliveryAddress, phone, notes } = req.body;
  
  if (!orderItems || orderItems.length === 0) {
    res.status(400);
    throw new Error('No order items');
  }
  
  // Calculate total amount
  let totalAmount = 0;
  const processedItems = [];
  
  for (const item of orderItems) {
    const menuItem = await menuItemRepository.findById(item.id);
    if (!menuItem) {
      res.status(404);
      throw new Error(`Menu item ${item.id} not found`);
    }
    
    totalAmount += menuItem.price * item.quantity;
    processedItems.push({
      menuItem: menuItem._id,
      title: menuItem.title,
      price: menuItem.price,
      quantity: item.quantity,
      image: menuItem.image,
    });
  }
  
  const order = await orderRepository.create({
    user: req.user.id,
    orderItems: processedItems,
    totalAmount,
    paymentMethod,
    deliveryAddress,
    phone,
    notes,
  });
  
  res.status(201).json({
    success: true,
    data: order,
  });
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderRepository.findByUser(req.user.id);
  
  res.json({
    success: true,
    data: orders,
  });
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderRepository.findById(req.params.id);
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  // Check if user is authorized (order owner or admin)
  if (order.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized');
  }
  
  res.json({
    success: true,
    data: order,
  });
});

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  
  const order = await orderRepository.findById(req.params.id);
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  const updatedOrder = await orderRepository.updateStatus(req.params.id, status);
  
  res.json({
    success: true,
    data: updatedOrder,
  });
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await orderRepository.findAll();
  
  res.json({
    success: true,
    count: orders.length,
    data: orders,
  });
});

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
};