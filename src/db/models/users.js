import bcrypt from 'bcrypt'

const userModel = (sequelize, DataTypes) => sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    validate: {
      meetStandards(value) {
        if (!value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/)) {
          throw new Error('The password must contain at least 1 special character, 1 uppercase letter, 1 number and minimun length must be 8 characters.')
        }
      },
    },
  },
}, {
  hooks: {
    beforeCreate(user) {
      const userInstance = user

      userInstance.password = bcrypt.hashSync(user.password,
        parseInt(process.env.BCRYPT_SALT_TIMES, 10))
    },
  },
})

export default userModel
