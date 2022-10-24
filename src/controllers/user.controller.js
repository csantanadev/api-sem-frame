const UserService = require('../services/user.service')

class UserController {

    constructor() {
        console.log('constructor UserController')
        this.userService = new UserService()
    }

    async post(req, res) {

        try {
            const { body } = req;
            const result = await this.userService.create(body)
            res.statusCode = 201;
            return res.end(JSON.stringify(result))
        }
        catch (e) {
            res.statusCode = 400;
            res.end(JSON.stringify({ message: e.message }))
        }
    }

    async get(req, res) {

        const result = await this.userService.findAll()
        return res.end(JSON.stringify(result))

    }

    async getById(req, res) {

        const { id } = req.params;
        const result = await this.userService.findById(id)
        return res.end(JSON.stringify(result))

    }

    async put(req, res) {
        try {
            const { id } = req.params;
            const { body } = req;

            await this.userService.update(id, body);
            res.statusCode = 204
            return res.end()
        }
        catch (e) {
            if (e.message === 'user not found') {
                res.statusCode = 404
                return res.end(JSON.stringify({
                    message: 'usuário não encontrado'
                }))
            }
            res.statusCode = 500
            return res.end(JSON.stringify(e.message))
        }

    }

    async delete(req, res) {

        const { id } = req.params;
        const result = await this.userService.delete(id)
        return res.end(JSON.stringify(result))

    }


}

module.exports = UserController