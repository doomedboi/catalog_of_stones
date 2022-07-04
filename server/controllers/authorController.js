const {Author} = require('../models/models')

class AuthorController {
    async create(req, res) {
        const {data} = req.body
        const type = await Author.create({data})
        return res.json(type)
    }

    async get(req, res) {
        const data = await Author.findAll()
        return res.json(data)
    }
}

module.exports = new AuthorController()