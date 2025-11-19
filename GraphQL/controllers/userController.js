const User = require("../models/user.model");


module.exports = {
  async createUser(data) {
    const user = new User(data);
    return await user.save();
  },

  async updateUser(id, data) {
    return await User.findByIdAndUpdate(id, data, { new: true });
  },

  async deleteUser(id) {
    await User.findByIdAndDelete(id);
    return "User deleted successfully";
  },

  async getUsers() {
    return User.find();
  },

  async getUserById(id) {
    return User.findById(id);
  }
};
