const UserRepository = require('../repository/user.repository')
const { createHmac } = require("crypto")

class UserService {

    constructor() { }

    async create(body) {
        const { password } = body
        const pwdEncrypt = createHmac('sha256', password).digest('hex')
        let user = { ...body, password: pwdEncrypt }
        user = await UserRepository.create(user);
        return user;
    }

    async update(id, body) {
        const user = await UserRepository.getById(id);

        if (!user) {
            throw new Error('user not found')
        }

        const { password } = body
        const pwdEncrypt = createHmac('sha256', password).digest('hex')

        // merge de props
        const userModif = { ...user, ...body, password: pwdEncrypt }

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