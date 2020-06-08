import tokens from '../helpers/tokens'

const authMiddleware = (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const verifiedTokenData = tokens.validateAccessToken(token)

      req.user = verifiedTokenData

      next()
    } catch (err) {
      res.status(401).json(err)
    }
  } else {
    res.status(401).json({
      name: 'NULL_TOKEN_NOT_ALLOWED',
      message: 'You should provide a authorization token',
    })
  }
}

export default authMiddleware
