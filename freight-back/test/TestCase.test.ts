import express from 'express';
import 'jest';
const request = require('supertest');

const app = express();

describe('GET /removed', function() {
    it('responds with status', async function() {
        const response = await request('http://localhost:3001')
        .get('/removed');

        expect(response.status).toEqual(200);
    });
  });