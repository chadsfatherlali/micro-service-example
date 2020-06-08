import SequelizeMock from 'sequelize-mock'

const dbMock = new SequelizeMock()

describe('Testin user model', () => {
  it('Find one', (done) => {
    const userModel = dbMock.define('user', {
      email: 'test@example.com',
      password: 'testpassword',
    })

    userModel.findOne()
      .then((result) => {
        expect(result).toMatchObject({
          email: 'test@example.com',
          password: 'testpassword',
        })
        done()
      }).catch(done)
  })
})
