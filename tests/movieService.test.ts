import request from 'supertest';
import { app } from '../src/app/app';  // Assuming your Express app is exported in index.ts

describe('GET /producers-awards', () => {
  it('should return the producers with max and min award intervals', async () => {
    const response = await request(app).get('/producers-awards');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('max');
    expect(response.body).toHaveProperty('min');
    expect(Array.isArray(response.body.max)).toBe(true);
    expect(Array.isArray(response.body.min)).toBe(true);
  });
});
