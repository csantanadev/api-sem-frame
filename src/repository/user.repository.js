const { randomUUID } = require('crypto')
const { client } = require('../database')

class UserRepository {

    constructor() {
        this.client = client;
    }

    async create({ name, username, email, password }) {
        const id = randomUUID();
        await this.client.query("insert into users (id, name, username, email, password) values ($1, $2, $3, $4, $5)", [id, name, username, email, password]);
        return { id, name, username, email };
    }

    async findAll() {
        const result = await this.client.query("select * from users")
        return result.rows;
    }

    async update(id, { name, username, email, password }) {
        await this.client.query('update users set name = $1, username = $2, email = $3, password = $4 where id = $5', [name, username, email, password, id])
        return { id, name, username, email }
    }

    async getById(id) {
        const result = await this.client.query("select * from users where id = $1", [id])
        return result.rows[0];
    }

    async delete(id) {
        await this.client.query("delete from users where id = $1", [id]);
        return { message: 'ok' };
    }


}

module.exports = new UserRepository()