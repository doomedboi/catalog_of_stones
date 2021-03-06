const sequelize = require('../database')
const {DataTypes} = require('sequelize')

const Admin = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING}
})

const City = sequelize.define('city', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    data: {type: DataTypes.STRING, unique: true}
})

const Author = sequelize.define('authors', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    data: {type: DataTypes.STRING, unique: true}
})

const PlaceHolder = sequelize.define('placeholder', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    data: {type: DataTypes.STRING, unique: true}
})

const Stone = sequelize.define('stone', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    description: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING, allowNull: false},
    stone_city: {type: DataTypes.STRING},
    stone_place: {type: DataTypes.STRING},
    stone_author: {type: DataTypes.STRING}
})

Stone.hasMany(PlaceHolder)
Stone.hasMany(Author)
PlaceHolder.belongsTo(Stone)
Author.belongsTo(Stone)
Stone.hasOne(City)
City.belongsTo(Stone)

module.exports = {
    Admin, Stone, City, Author, PlaceHolder
}