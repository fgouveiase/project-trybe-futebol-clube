import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import Match from '../database/models/Match';

import { Response } from 'superagent';


chai.use(chaiHttp);

const { expect } = chai;
const mock = [
    {
      id: 1,
      homeTeamId: 16,
      homeTeamGoals: 1,
      awayTeamId: 8,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 2,
      homeTeamId: 9,
      homeTeamGoals: 1,
      awayTeamId: 14,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 3,
      homeTeamId: 4,
      homeTeamGoals: 3,
      awayTeamId: 11,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 4,
      homeTeamId: 3,
      homeTeamGoals: 0,
      awayTeamId: 2,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 5,
      homeTeamId: 7,
      homeTeamGoals: 1,
      awayTeamId: 10,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 6,
      homeTeamId: 5,
      homeTeamGoals: 1,
      awayTeamId: 13,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 7,
      homeTeamId: 12,
      homeTeamGoals: 2,
      awayTeamId: 6,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 8,
      homeTeamId: 15,
      homeTeamGoals: 0,
      awayTeamId: 1,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 9,
      homeTeamId: 1,
      homeTeamGoals: 0,
      awayTeamId: 12,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 10,
      homeTeamId: 2,
      homeTeamGoals: 0,
      awayTeamId: 9,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 11,
      homeTeamId: 13,
      homeTeamGoals: 1,
      awayTeamId: 3,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 12,
      homeTeamId: 6,
      homeTeamGoals: 0,
      awayTeamId: 4,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 13,
      homeTeamId: 8,
      homeTeamGoals: 2,
      awayTeamId: 5,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 14,
      homeTeamId: 14,
      homeTeamGoals: 2,
      awayTeamId: 16,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 15,
      homeTeamId: 10,
      homeTeamGoals: 0,
      awayTeamId: 15,
      awayTeamGoals: 1,
      inProgress: 0,
    },
    {
      id: 16,
      homeTeamId: 11,
      homeTeamGoals: 0,
      awayTeamId: 7,
      awayTeamGoals: 0,
      inProgress: 0,
    },
    {
      id: 17,
      homeTeamId: 1,
      homeTeamGoals: 2,
      awayTeamId: 8,
      awayTeamGoals: 3,
      inProgress: 0,
    },
    {
      id: 18,
      homeTeamId: 12,
      homeTeamGoals: 4,
      awayTeamId: 5,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 19,
      homeTeamId: 11,
      homeTeamGoals: 2,
      awayTeamId: 2,
      awayTeamGoals: 2,
      inProgress: 0,
    },
    {
      id: 20,
      homeTeamId: 7,
      homeTeamGoals: 0,
      awayTeamId: 9,
      awayTeamGoals: 1,
      inProgress: 0,
    },

  ];
const allMatches = [
    {
      "id": 1,
      "homeTeamId": 16,
      "homeTeamGoals": 1,
      "awayTeamId": 8,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São Paulo"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 2,
      "homeTeamId": 9,
      "homeTeamGoals": 1,
      "awayTeamId": 14,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Internacional"
      },
      "awayTeam": {
        "teamName": "Santos"
      }
    },
    {
      "id": 3,
      "homeTeamId": 4,
      "homeTeamGoals": 3,
      "awayTeamId": 11,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Corinthians"
      },
      "awayTeam": {
        "teamName": "Napoli-SC"
      }
    },
    {
      "id": 4,
      "homeTeamId": 3,
      "homeTeamGoals": 0,
      "awayTeamId": 2,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Botafogo"
      },
      "awayTeam": {
        "teamName": "Bahia"
      }
    },
    {
      "id": 5,
      "homeTeamId": 7,
      "homeTeamGoals": 1,
      "awayTeamId": 10,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Flamengo"
      },
      "awayTeam": {
        "teamName": "Minas Brasília"
      }
    },
    {
      "id": 6,
      "homeTeamId": 5,
      "homeTeamGoals": 1,
      "awayTeamId": 13,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Cruzeiro"
      },
      "awayTeam": {
        "teamName": "Real Brasília"
      }
    },
    {
      "id": 7,
      "homeTeamId": 12,
      "homeTeamGoals": 2,
      "awayTeamId": 6,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Palmeiras"
      },
      "awayTeam": {
        "teamName": "Ferroviária"
      }
    },
    {
      "id": 8,
      "homeTeamId": 15,
      "homeTeamGoals": 0,
      "awayTeamId": 1,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "São José-SP"
      },
      "awayTeam": {
        "teamName": "Avaí/Kindermann"
      }
    },
    {
      "id": 9,
      "homeTeamId": 1,
      "homeTeamGoals": 0,
      "awayTeamId": 12,
      "awayTeamGoals": 3,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Avaí/Kindermann"
      },
      "awayTeam": {
        "teamName": "Palmeiras"
      }
    },
    {
      "id": 10,
      "homeTeamId": 2,
      "homeTeamGoals": 0,
      "awayTeamId": 9,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Bahia"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
    {
      "id": 11,
      "homeTeamId": 13,
      "homeTeamGoals": 1,
      "awayTeamId": 3,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Real Brasília"
      },
      "awayTeam": {
        "teamName": "Botafogo"
      }
    },
    {
      "id": 12,
      "homeTeamId": 6,
      "homeTeamGoals": 0,
      "awayTeamId": 4,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Ferroviária"
      },
      "awayTeam": {
        "teamName": "Corinthians"
      }
    },
    {
      "id": 13,
      "homeTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamId": 5,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Grêmio"
      },
      "awayTeam": {
        "teamName": "Cruzeiro"
      }
    },
    {
      "id": 14,
      "homeTeamId": 14,
      "homeTeamGoals": 2,
      "awayTeamId": 16,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Santos"
      },
      "awayTeam": {
        "teamName": "São Paulo"
      }
    },
    {
      "id": 15,
      "homeTeamId": 10,
      "homeTeamGoals": 0,
      "awayTeamId": 15,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Minas Brasília"
      },
      "awayTeam": {
        "teamName": "São José-SP"
      }
    },
    {
      "id": 16,
      "homeTeamId": 11,
      "homeTeamGoals": 0,
      "awayTeamId": 7,
      "awayTeamGoals": 0,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Napoli-SC"
      },
      "awayTeam": {
        "teamName": "Flamengo"
      }
    },
    {
      "id": 17,
      "homeTeamId": 1,
      "homeTeamGoals": 2,
      "awayTeamId": 8,
      "awayTeamGoals": 3,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Avaí/Kindermann"
      },
      "awayTeam": {
        "teamName": "Grêmio"
      }
    },
    {
      "id": 18,
      "homeTeamId": 12,
      "homeTeamGoals": 4,
      "awayTeamId": 5,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Palmeiras"
      },
      "awayTeam": {
        "teamName": "Cruzeiro"
      }
    },
    {
      "id": 19,
      "homeTeamId": 11,
      "homeTeamGoals": 2,
      "awayTeamId": 2,
      "awayTeamGoals": 2,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Napoli-SC"
      },
      "awayTeam": {
        "teamName": "Bahia"
      }
    },
    {
      "id": 20,
      "homeTeamId": 7,
      "homeTeamGoals": 0,
      "awayTeamId": 9,
      "awayTeamGoals": 1,
      "inProgress": false,
      "homeTeam": {
        "teamName": "Flamengo"
      },
      "awayTeam": {
        "teamName": "Internacional"
      }
    },
  
  ]
describe('Testa o retorno de Match', () => {
  let chaiResponse: Response;
  afterEach(() => {
    sinon.restore();
  });

  it('Testa se retorna todos os matches', async () => {
    sinon.stub(Match, 'findAll').resolves(mock as any);
    chaiResponse = await chai.request(app).get('/matches');
    expect(chaiResponse.body).to.be.deep.equal(mock);
    expect(chaiResponse.status).to.be.deep.equal(200);
  });

  it('Testa se encontra um time com retorno de status 200', async () => {
    sinon.stub(Match, 'findOne').resolves(mock[5] as any);
    chaiResponse = await chai.request(app).get('/matches');
    expect(chaiResponse.body[5]).to.be.deep.equal(allMatches[5]);
    expect(chaiResponse.status).to.be.equal(200);
  });

  
  it('Testa se retorna um status 500 ', async () => {
    const responseLogin = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });
    sinon.stub(Match, 'findByPk').resolves({ ...allMatches[0], update: sinon.stub() } as any);

    
    chaiResponse = await chai.request(app).patch('/matches/0/finish').set('Authorization', responseLogin.body.token);

    expect(chaiResponse.status).to.be.equal(500);

  });

  it('Testa se update retorna um status 200', async () => {
    const responseLogin = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });
    sinon.stub(Match, 'findByPk').resolves({ ...allMatches[20], update: sinon.stub() } as any);


    chaiResponse = await chai.request(app).patch('/matches/20').send({
      homeTeamGoals: 15,
      awayTeamGoals: 12,
    }).set('Authorization', responseLogin.body.token);

    expect(chaiResponse.status).to.be.equal(200);

  });

  it('Testa se update retorna um status 500', async () => {
    const responseLogin = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });
    sinon.stub(Match, 'findByPk').resolves({ ...allMatches[10], update: sinon.stub() } as any);


    chaiResponse = await chai.request(app).patch('/matches/10').send({
      homeTeamGoals: 0,
      awayTeamGoals: 1,
    }).set('Authorization', responseLogin.body.token);

    expect(chaiResponse.status).to.be.equal(500);

  });

  it('Testa se cria match corretamente', async () => {
    const responseLogin = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });

    sinon.stub(Match, 'create').resolves({
      homeTeamId: 10,
      awayTeamId: 4,
      homeTeamGoals: 3,
      awayTeamGoals: 1,
    } as any);


    chaiResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 8,
      awayTeamId: 11,
      homeTeamGoals: 0,
      awayTeamGoals: 5,
      update: sinon.stub()
    }).set('Authorization', responseLogin.body.token);
    expect(chaiResponse.status).to.be.equal(201);

  });

  it('Testa se retorna erro ao criar match sem token', async () => {

    sinon.stub(Match, 'create').resolves({
      homeTeamId: 9,
      awayTeamId: 1,
      homeTeamGoals: 4,
      awayTeamGoals: 1,
    } as any);


    chaiResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 9,
      awayTeamId: 1,
      homeTeamGoals: 4,
      awayTeamGoals: 1,
      update: sinon.stub()
    });

    expect(chaiResponse.status).to.be.equal(401);
    expect(chaiResponse.body).to.be.deep.equal({ message: 'Token not found' });

  });

  it('Testa se retorna erro para ids iguais', async () => {
    const responseLogin = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin',
  });

    sinon.stub(Match, 'create').resolves({
      homeTeamId: 3,
      awayTeamId: 7,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
    } as any);


    chaiResponse = await chai.request(app).post('/matches').send({
      homeTeamId: 3,
      awayTeamId: 7,
      homeTeamGoals: 0,
      awayTeamGoals: 0,
      update: sinon.stub()
    }).set('Authorization', responseLogin.body.token);

    expect(chaiResponse.status).to.be.equal(422);
    expect(chaiResponse.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams' });

  });
});