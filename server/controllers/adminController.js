const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {Admin} = require('../models/models')
const errorHandler = require('../errorHandling/errorHandling')

class adminController {
    async login(req, res, next) {
        const {login, password} = req.body
        const account = await Admin.findOne({where: {login}})
        if (!account) {
            return next(errorHandler.badRequest('Учётная запись с таким логином не найдена!'))
        }
        const bCmpPassword = bcrypt.compareSync(password, account.password)
        if (!bCmpPassword) {
            return next(errorHandler.badRequest('Неверный пароль!'))
        }
        const jwtToken = jwt.sign(
            {id: account.id, login: account.login}, process.env.SECRET_KEY, {expiresIn: '48h'}
        )
        return res.json({jwtToken})
    }

    async register(req, res, next) {
        const {login, password} = req.body
        if (!login || !password) {
            return next(errorHandler.badRequest('Ошибка: неккректные логин и/или пароль!'))
        }
        const bIsExist = await Admin.findOne({where: {login}})
        if (bIsExist) {
            return next(errorHandler.badRequest(
                'Пользователь с таким логином уже существует')
            )
        }
        const hPassword = await bcrypt.hash(password, 10)
        const admin = await Admin.create({login, password: hPassword})
        const jwtToken = jwt.sign(
            {id: admin.id, login: admin.login}, process.env.SECRET_KEY, {expiresIn: '48h'}
        )
        return res.json({jwtToken})
    }

    async authCheck(req, res) {
        const jwtToken = jwt.sign(
            {id: req.id, login: req.login}, process.env.SECRET_KEY, {expiresIn: '48h'}
        )
        return res.json({jwtToken})
    }
}

module.exports = new adminController()