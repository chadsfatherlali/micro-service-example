import app from './app'

const port = process.env.PORT || 8080;
const host = '0.0.0.0';

app.listen(port, host, () => {
  console.log(`Server start listening at http://localhost:${port}`)
})
