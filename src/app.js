import express from 'express'
import bodyParser from 'body-parser'
import usersRoutes from './routes/users/index'
import db from './db'

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(db.init)
app.use('/api', usersRoutes(db.models))

app.get('/test', (req, res) => {
  res.send('Hola mundo')
})

export default app
