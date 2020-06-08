import express from 'express'
import bcrypt from 'bcrypt'
import cookie from 'cookie'
import tokens from '../../helpers/tokens'
import authMiddleware from '../../middlewares/authMiddleware'

const users = express.Router()

const usersRoutes = (models) => {
  users.get('/users', authMiddleware, async (req, res) => {
    try {
      const result = await models.userModel.findAll()

      res.json(result)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  users.post('/users', async (req, res) => {
    try {
      const result = await models.userModel.create(req.body)

      res.json(result)
    } catch (error) {
      res.status(400).json(error)
    }
  })

  users.post('/users/login', async (req, res) => {
    try {
      const result = await models.userModel.findOne({
        where: {
          email: req.body.email,
        },
      })

      if (bcrypt.compareSync(req.body.password, result.password)) {
        const dataToken = { id: result.id }
        const accessToken = tokens.generateAccessToken(dataToken)
        const refreshToken = tokens.generateRefreshToken(dataToken)

        res.setHeader('Set-Cookie', cookie.serialize('session-auth', accessToken, {
          httpOnly: true,
          sameSite: 'strict',
        }))

        res.json({
          accessToken,
          refreshToken,
        })
      } else {
        res.status(400).json({
          name: 'EMAIL_OR_PASS_INCORRECT',
          message: 'Your email/password is incorrect',
        })
      }
    } catch (error) {
      res.status(400).json(error)
    }
  })

  return users
}
export default usersRoutes
