const Order = require('../models/Order');

class OrderRepository {
  async create(orderData) {
    return await Order.create(orderData);
  }

  async findById(id) {
    return await Order.findById(id).populate('user', 'name email');
  }

  async findByUser(userId) {
    return await Order.find({ user: userId }).sort('-createdAt');
  }

  async findAll(filters = {}) {
    return await Order.find(filters)
      .populate('user', 'name email')
      .sort('-createdAt');
  }

  async updateStatus(id, status) {
    return await Order.findByIdAndUpdate(
      id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
  }

  async updatePaymentStatus(id, paymentStatus) {
    return await Order.findByIdAndUpdate(
      id,
      { paymentStatus, updatedAt: Date.now() },
      { new: true }
    );
  }
}

module.exports = new OrderRepository();