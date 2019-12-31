// const proxyquire = require('proxyquire');

// const mysql = proxyquire('../../src/lib/mysql', {
//   'mysql': require('../mocks/mysql.mock'),
// });

// const check = (done) => {
//   mysql()
//     .then(async (instance) => {
//       try {
//         const key = 'foo';
//         const expected = 'bar';
//         await instance.executeQuery('set', ['set', key, expected]);
//         const result = await instance.executeQuery('get', ['get', key]);
//         expect(result).eql(expected);
//         done();
//       } catch (err) {
//         done(err);
//       }
//     })
//     .catch((error) => {
//       done(error);
//     });
// };

// describe('test lib > mysql', () => {
//   it('test query method', (done) => {
//     check(done);
//   });
// });
