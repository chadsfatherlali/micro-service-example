import Sequelize from 'sequelize'
import userModel from './models/users'

let sequelizeIsInit = false

const models = {}
const init = (req, res, next) => {
  if (!sequelizeIsInit) {
    const sequelize = new Sequelize(process.env.DATABASE_NAME,
      process.env.DATABASE_USER,
      process.env.DATABASE_PASSWORD,
      {
        host: process.env.DATABASE_HOST,
        dialect: process.env.DATABASE_DIALECT,
        logging: false,
        dialectOptions: {
          timezone: 'Etc/GMT0',
        },
      })

    sequelize.authenticate().then(console.log).catch(console.error)

    models.userModel = userModel(sequelize, Sequelize)

    sequelize.sync({ alter: true })
      .then(() => {
        sequelizeIsInit = true

        console.log('Tables created')

        next()
      })
      .catch(console.error)
  } else {
    next()
  }
}

const db = {
  init,
  models,
}

export default db
