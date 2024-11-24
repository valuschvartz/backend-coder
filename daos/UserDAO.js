const User = require('../models/User');

class UserDAO {
    async createUser(userData) {
        const user = await User.create(userData);
        return user;
    }

    async findUserByEmail(email) {
        return await User.findOne({ email });
    }

    async findUserById(id) {
        return await User.findById(id);
    }

    async updateUser(id, updateData) {
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    async getAllUsers() {
        return await User.find();
    }
}

module.exports = new UserDAO();
