import chai, { expect } from 'chai';
import http from 'chai-http';
// import request from 'supertest';
import server from '../../api/server.mjs';
import { onBefore, onAfter } from '../helper.js';

chai.use(http);

onBefore(); // creates database
onAfter(); // deletes the database

describe('Auth endpoints', () => {
  it('POST /auth/register should return 200', async () => {
    let clientUser = {
      firstName: 'Rob',
      lastName: 'Stark',
      email: 'rob@winterfell.com',
      password: 'password1234'
    };
    const res = await chai
      .request(server)
      .post('/api/auth/register')
      .send(clientUser);
    expect(res).to.have.status(200);
  });

  it('POST /api/auth/login should return 200', async () => {
    const res = await chai
      .request(server)
      .post('/api/auth/login')
      .send({ email: 'rob@winterfell.com', password: 'password1234' });
    expect(res).to.have.status(200);
  });
});

// describe('Auth Endpoints', () => {
//   let clientUser = {
//     firstName: 'Rob',
//     lastName: 'Stark',
//     email: 'rob@winterfell.com',
//     password: 'password1234'
//   };

//   let instructorUser = {
//     firstName: 'John',
//     lastName: 'Snow',
//     email: 'snow@thewall.com',
//     password: 'password1234',
//     role: 'instructor'
//   };

//   describe('Register user with client role', () => {
//     it('should register new user with client role', async () => {
//       const res = await request(server)
//         .post('/api/auth/register')
//         .send(clientUser)
//         .expect(200);
//       await expect(res).to.have.status(200);
//       await expect(res.body).to.have.role('client');
//     });
//   });

//   // describe('Register user with instructor role', () => {
//   //   it('should register new user with instructor role', async () => {
//   //     const res = await request(server)
//   //       .post('/api/auth/register')
//   //       .send(instructorUser)
//   //       .expect(200);
//   //     await expect(res.status).to.be.equal(200);
//   //     await expect(res.body.role).to.be.equal('instructor');
//   //   });
//   // });

//   describe('Log in user with client role', () => {
//     it('should log in new user with client role', async () => {
//       try {
//         await request(server)
//           .post('/api/auth/register')
//           .send(clientUser)
//           .expect(200);
//         const res = await request(server)
//           .post('/api/auth/login')
//           .send({
//             email: 'rob@winterfell.com',
//             password: 'password1234'
//           })
//           .expect(200);
//         await expect(res.status).to.be.equal(200);
//         await expect(res.body.role).to.be.equal('client');
//       } catch (error) {}
//     });
//   });

//   // // Throws an error: UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
//   // describe('Register user with instructor role', () => {
//   //   it('should register new user with client role', async () => {
//   //     try {
//   //       await request(server)
//   //         .post('/api/auth/register')
//   //         .send(instructorUser)
//   //         .expect(200);
//   //       await expect(res.status).to.be.equal(200);
//   //       await expect(res.body.role).to.be.equal('instructor');
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   });
//   // });

//   // describe('Check if instructor is verified', () => {
//   //   it('should register new user with client role', async () => {
//   //     try {
//   //       const res = await request(server)
//   //         .post('/api/auth/register')
//   //         .send(instructorUser)
//   //         .expect(200);
//   //       await expect(res.status).to.be.equal(200);
//   //       await expect(res.body.isVerified).to.be.equal(false);
//   //     } catch (error) {
//   //       console.log(error);
//   //     }
//   //   });
//   // });
// });
