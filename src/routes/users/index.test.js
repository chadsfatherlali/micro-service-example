import request from 'supertest'
import app from '../../app'

describe('Endpoint /api/users', () => {
  it('/api/users statuts => 200', async () => {
    const result = await request(app).get('/api/users')

    expect(result.statusCode).toBe(200)
  })
})
