const {City} = require("../models/models");

class SelectionPlaceController {
    async create(req, res) {
        const {data} = req.body
        const city = await City.create({data})
        return res.json(city)
    }

    async get(req, res) {
        const data = await City.findAll()
        return res.json(data)
    }
}

module.exports = new SelectionPlaceController()