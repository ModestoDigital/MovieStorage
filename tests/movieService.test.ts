import request from 'supertest';
import { app, initializeApp } from '../src/app/app';
import { Server } from 'http';

let server: Server;

beforeAll(async () => {
  await initializeApp();
  await new Promise<void>((resolve, reject) => {
    request(app)
      .get('/health')
      .expect(200)
      .end((err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
  });
});



describe('GET /producers-awards', () => {
  it('should return the producers with max and min award intervals', async () => {
    const response = await request(app).get('/producers-awards');

    console.log('Response status:', response.status);
    console.log('Response body:', response.body);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('max');
    expect(response.body).toHaveProperty('min');
    expect(Array.isArray(response.body.max)).toBe(true);
    expect(Array.isArray(response.body.min)).toBe(true);
  });
});
