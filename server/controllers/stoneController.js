const uuid = require('uuid')
const path = require('path')
const errorHandler = require('../errorHandling/errorHandling')
const {Stone} = require('../models/models')

class StoneController {
    async create(req, res, next) {
        try {
            let {placeId, authorId, description, cityId} = req.body
            const {img} = req.files
            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const stone = await Stone.create(
                {placeId, authorId, description, cityId, img: fileName}
            )
            return res.json(stone)
        } catch (e) {
            next(errorHandler.badRequest(e.message))
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const stone = await Stone.findOne({where: {id}})
        return res.json(stone)
    }

    async getAll(req, res) {
        let {authorId, cityId, page, limit} = req.query
        page = page || 1
        limit = limit || 25
        let offset = limit * page - limit
        let stones;
        if (!authorId && !cityId) {
            stones = await Stone.findAndCountAll({limit, offset})
        }
        if (!authorId && cityId) {
            stones = await Stone.findAndCountAll({where: {cityId}, limit, offset})
        }
        if (authorId && !cityId) {
            stones = await Stone.findAndCountAll({where: {authorId}, limit, offset})
        }
        if (authorId && cityId) {
            stones = await Stone.findAndCountAll({where: {authorId, cityId}, limit, offset})
        }

        return res.json(stones)

    }
}

module.exports = new StoneController()