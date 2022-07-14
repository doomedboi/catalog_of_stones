const uuid = require('uuid')
const path = require('path')
const errorHandler = require('../errorHandling/errorHandling')
const {Stone, Author, PlaceHolder, City} = require('../models/models')


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

    async create2(req, res, next) {

        try {
            let {place, author, description, city} = req.body
            const {img} = req.files

            let placeCount = await PlaceHolder.findOne({where: {data : place}})
            let authorCount = await Author.findOne({where: {data: author}})
            let cityCount = await City.findOne({where : {data: city}})

            if (placeCount === null) {
                console.log("Place is empty")
                await PlaceHolder.create({data : place})
            }
            if (authorCount === null) {
                await Author.create({data: author})
            }
            if (cityCount === null) {
                await City.create({data: city})
            }

            placeCount = await PlaceHolder.findOne({where: {data : place}})
            authorCount = await Author.findOne({where: {data: author}})
            cityCount = await City.findOne({where : {data: city}})

            let fileName = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', fileName))

            const placeid = placeCount.getDataValue('id')
            const authorid = authorCount.getDataValue('id')
            const cityId = cityCount.getDataValue('id')
            const stone = await Stone.create(
                {placeid , authorid,
                    description, cityId, img: fileName, stone_city: city,
                        stone_place: place, stone_author: author}
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

    async delete(req, res, next) {
        try {
            let {id} = req.body
            const resp = await Stone.destroy({ where: { id: id } })
            return res.json('successfully')
        } catch (e) {
            next(errorHandler.badRequest(e.message))
        }
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