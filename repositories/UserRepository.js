const BaseRepository = require('./BaseRepository');
const UserDAO = require('../daos/UserDAO');

class UserRepository extends BaseRepository {
    constructor() {
        super(UserDAO);
    }

    async findByEmail(email) {
        return await this.dao.findUserByEmail(email);
    }
}

module.exports = new UserRepository();
