import chai, { expect } from 'chai';
import http from 'chai-http';
// import request from 'supertest';
import server from '../../api/server.mjs';

chai.use(http);
describe('Server', () => {
  it('Should exist', () => {
    expect(server).to.be.a('function');
  });

  it('GET / should return 200', async () => {
    //send request to the app
    const res = await chai.request(server).get('/');
    expect(res).to.have.status(200);
  });
});
