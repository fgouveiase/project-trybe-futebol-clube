import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const loginOk = {
    id: 1,
    username: 'user',
    role: 'user',
    email: 'flpbfr@trybe.com',
    password: 'senha',
};

const loginIncorrect = {
    id: 1,
    username: 'user',
    role: 'undefined',
    email: 'fgv@lalala.com',
    password: 'passworderrado',
};

const secret = process.env.JWT_SECRET;
const jwtConfig: object = {
  expiresIn: '5d',
  algorithm: 'HS256',
};


describe('Testa o login', () => {

  let chaiResponse: Response;

  afterEach(() => {
    sinon.restore();
  });

  beforeEach(async () => {
    sinon.stub(User, 'findOne').withArgs({ where: { email: loginOk.email } }).resolves({dataValues: loginOk} as User);
  })

  it('Testa post login retorna os dados corretos', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
        email: loginOk.email,
        password: 'senha',
    });
    expect(chaiResponse.body).to.have.property('token');

  });

  it('Testa erro invalid se existir uma senha ou email errado', async () => {
    chaiResponse = await chai.request(app).post('/login').send({
        email: loginIncorrect.email,
        password: 'botafogo',
    });
    expect(chaiResponse.body).to.not.have.property('token');
    expect(chaiResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });

  });

});