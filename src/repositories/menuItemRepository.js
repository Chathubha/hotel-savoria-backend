const MenuItem = require('../models/MenuItem');

class MenuItemRepository {
  async create(itemData) {
    return await MenuItem.create(itemData);
  }

  async findAll(filters = {}) {
    return await MenuItem.find(filters);
  }

  async findById(id) {
    return await MenuItem.findById(id);
  }

  async findByCategory(category) {
    return await MenuItem.find({ category, isAvailable: true });
  }

  async update(id, itemData) {
    return await MenuItem.findByIdAndUpdate(id, itemData, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id) {
    return await MenuItem.findByIdAndDelete(id);
  }

  async updateAvailability(id, isAvailable) {
    return await MenuItem.findByIdAndUpdate(
      id,
      { isAvailable },
      { new: true }
    );
  }
}

module.exports = new MenuItemRepository();