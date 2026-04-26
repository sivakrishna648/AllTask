const request = require('supertest');
const app = require('../src/server');

describe('Server API Tests', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app).get('/health');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('timestamp');
    });
  });

  describe('GET /api/jobs', () => {
    it('should return list of jobs', async () => {
      const response = await request(app).get('/api/jobs');
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /api/jobs/:id', () => {
    it('should return a single job', async () => {
      const response = await request(app).get('/api/jobs/1');
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body).toHaveProperty('title');
      expect(response.body).toHaveProperty('company');
    });
  });

  describe('POST /api/jobs', () => {
    it('should create a new job', async () => {
      const newJob = { title: 'DevOps Engineer', company: 'CloudCorp' };
      const response = await request(app).post('/api/jobs').send(newJob);
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(newJob.title);
      expect(response.body.company).toBe(newJob.company);
    });
  });
});