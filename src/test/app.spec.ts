
import mocha from 'mocha';
import request from 'supertest';
import app  from '../server';
import { beforeEach, afterEach } from 'node:test';
import { closeServer, connectServer} from '../utils/db';
import { expect } from 'chai';

describe('App', () => {
  beforeEach(async () => {
    // start the server before each test
    await connectServer();
  });

  afterEach(() => {
    // Close the server after each test
    closeServer();
  });

  describe('GET /api/countries', () => {
    it('should return 200 status', async () => {
      const res = await request(app).get('/api/countries');
      expect(res.status).to.equal(200);
    });
  });
})