import jwt from 'jsonwebtoken'

const tokens = {
  generateAccessToken: (content) => jwt.sign(content, process.env.ACCESS_TOKEN_HASH, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
  }),
  generateRefreshToken: (content) => jwt.sign(content, process.env.REFRESH_TOKEN_HASH),
  validateAccessToken: (token) => jwt.verify(token, process.env.ACCESS_TOKEN_HASH),
}

export default tokens
