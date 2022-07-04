const {PlaceHolder} = require('../models/models')

class PlaceholderController {
    async create(req, res) {
        const {data} = req.body
        const place = await PlaceHolder.create({data})
        return res.json(place)
    }

    async get(req, res) {
        const data = await PlaceHolder.findAll()
        return res.json(data)
    }
}

module.exports = new PlaceholderController()