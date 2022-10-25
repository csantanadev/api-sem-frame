const UserRepository = require('../repository/user.repository')

class UserService {

    constructor() { }

    async create(body) {
        const user = await UserRepository.create(body);
        return user;
    }

    async update(id, body) {
        const user = await UserRepository.getById(id);

        if (!user) {
            throw new Error('user not found')
        }
        // merge de props
        const userModif = { ...user, ...body }

        const result = await UserRepository.update(id, userModif)
        return result;
    }

    async findAll() {
        const result = await UserRepository.findAll();
        return result;
    }

    async findById(id) {
        const result = await UserRepository.getById(id);
        return result;
    }

    async delete(id) {
        const result = await UserRepository.delete(id);
        return result;
    }
}

module.exports = new UserService()