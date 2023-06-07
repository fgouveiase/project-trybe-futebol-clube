import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const secret = process.env.JWT_SECRET;
const jwtConfig: object = {
  expiresIn: '5d',
  algorithm: 'HS256',
};


describe('Testa leaderBoard', () => {


  afterEach(() => {
    sinon.restore();
  });

  it('Testa se retorna um status 200', async () => {
    const chaiResponse = await chai.request(app).get('/leaderboard');
    expect(chaiResponse.status).to.be.equal(200);
  });

  it('Testa se retorna um status 200 na rota home', async () => {
    const chaiResponse = await chai.request(app).get('/leaderboard/home');
    expect(chaiResponse.status).to.be.equal(200);
  });

  it('Testa se retorna um status 200 na rota away', async () => {
    const chaiResponse = await chai.request(app).get('/leaderboard/away');
    expect(chaiResponse.status).to.be.equal(200);
  });
});