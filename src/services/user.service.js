const UserRepository = require('../repository/user.repository')


class UserService {

    constructor() {
        console.log('constructor UserService')
        this.userRepository = new UserRepository();
    }

    async create(body) {
        const user = await this.userRepository.create(body);
        return user;
    }

    async update(id, body) {

        const user = await this.userRepository.getById(id);

        if (!user) {
            throw new Error('user not found')
        }
        // merge de props
        const userModif = { ...user, ...body }

        const result = await this.userRepository.update(id, userModif)
        return result;
    }

    async findAll() {
        const result = await this.userRepository.findAll();
        return result;
    }

    async findById(id) {
        const result = await this.userRepository.getById(id);
        return result;
    }

    async delete(id) {
        const result = await this.userRepository.delete(id);
        return result;
    }
}

module.exports = UserService