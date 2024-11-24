const UserRepository = require('../repositories/UserRepository');
const UserDTO = require('../dtos/UserDTO');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'coder123';

class UserService {
    async registerUser(userData) {
        const { email, password } = userData;

        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw new Error('El email ya está registrado');
        }

        userData.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const newUser = await UserRepository.create(userData);

        return new UserDTO(newUser);
    }

    async loginUser(email, password) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            throw new Error('Contraseña incorrecta');
        }

        return new UserDTO(user);
    }

    generateJwt(user) {
        return jwt.sign(
            { id: user.id, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );
    }

    async getAllUsers() {
        const users = await UserRepository.findAll();
        return users.map((user) => new UserDTO(user));
    }

    async getUserById(id) {
        const user = await UserRepository.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        return new UserDTO(user);
    }
}

module.exports = new UserService();
