import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa os Times', () => {
  describe('Testa se e listado todos os times', () => {
    beforeEach(() => {
      const teamsList = [
        { id: 1, teamName: 'Real Madrid' },
        { id: 2, teamName: 'Barcelona' },
        { id: 3, teamName: 'Manchester United' },
        { id: 4, teamName: 'Liverpool' },
        { id: 5, teamName: 'Bayern Munich' },
      ];
      
      sinon.stub(Team, 'findAll').resolves(teamsList as Team[]);
    });
    
    
    afterEach(() => {
      (Team.findAll as sinon.SinonStub).restore();
    });
    
    const arrayTeams = [
      { id: 1, teamName: 'Real Madrid' },
      { id: 2, teamName: 'Barcelona' },
      { id: 3, teamName: 'Manchester United' },
      { id: 4, teamName: 'Liverpool' },
      { id: 5, teamName: 'Bayern Munich' },
    ];

    it('Testa se a função retorna um status 200', async () => {
      const teamResponse = await chai.request(app).get('/teams');
      
      expect(teamResponse.status).to.be.equal(200);
    });
    
    it('Testa se  retorna um array', async () => {
      const teamResponse = await chai.request(app).get('/teams');

      expect(teamResponse.body).to.be.a('array');
    });

    it('Testa se retorna a um array com 5 times', async () => {
      const teamResponse = await chai.request(app).get('/teams');

      expect(teamResponse.body).to.deep.equal(arrayTeams);
    });
  });

  describe('Testa os ids dos times', () => {
    describe('Testa um id nao válido', () => {
      beforeEach(() => {
        const invalid = null;

        sinon.stub(Team, 'findByPk').resolves(invalid);
      });

      afterEach(() => {
        (Team.findByPk as sinon.SinonStub).restore();
      });

      const notFound = { message: 'Team not found' };

      it('Testa se retorna um status 404', async () => {
        const teamResponse = await chai.request(app).get('/teams/felipe123');

        expect(teamResponse.status).to.be.equal(404);
      });

      it('Testa se retorna um objeto com rota inexistente', async () => {
        const teamResponse = await chai.request(app).get('/teams/felipe123');

        expect(teamResponse.body).to.be.a('object');
      });

      it('Testa se a função retorna a mensagem Team not found quando nao existir um time', async () => {
        const teamResponse = await chai.request(app).get('/teams/felipe123');

        expect(teamResponse.body).to.deep.equal(notFound);
      });
    });

    describe('Testa as responses com id válido', () => {
      beforeEach(() => {
        const result = { id: 1, teamName: 'Real Madrid' };

        sinon.stub(Team, 'findByPk').resolves(result as unknown as Team);
      });

      afterEach(() => {
        (Team.findByPk as sinon.SinonStub).restore();
      });

      const resultExpected = { id: 1, teamName: 'Real Madrid' };

      it('Testa se retorna um status 200', async () => {
        const teamResponse = await chai.request(app).get('/teams/1');
        
        expect(teamResponse.status).to.be.equal(200);
      });
      

      it('Testa se retorna um objeto com rota existente', async () => {
        const teamResponse = await chai.request(app).get('/teams/1');

        expect(teamResponse.body).to.be.a('object');
      });

      it('Testa se retorna o resultado esperado', async () => {
        const teamResponse = await chai.request(app).get('/teams/1');

        expect(teamResponse.body).to.deep.equal(resultExpected);
      });
    });
  });
});