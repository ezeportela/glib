const proxyquire = require('proxyquire');

const Service = proxyquire('../../src/lib/mysql.service', {
  'mysql': require('../mocks/mysql.mock'),
});

describe('test lib > mysql', () => {
  let instance;

  it('test get instance', async () => {
    instance = new Service();
    expect(instance).to.be.an('object');
    expect(instance).to.have.property('executeQuery');
    expect(instance).to.have.property('executeProcedure');
    expect(instance).to.have.property('close');
  });

  it('test query set', async () => {
    try {
      const key = 'foo';
      const expected = 'bar';
      const result = await instance.executeQuery('set', ['set', key, expected]);
      expect(result).eql(key);
    } catch (err) {
      expect(err).to.be.undefined;
    }
  });

  it('test query without params', async () => {
    try {
      const result = await instance.executeQuery('set');
      expect(result).eql('set');
    } catch (err) {
      expect(err).to.be.undefined;
    }
  });

  it('test procedure get', async () => {
    try {
      const key = 'foo';
      const expected = 'bar';
      const result = await instance.executeProcedure('get', ['get', key]);
      expect(result).eql(expected);
    } catch (err) {
      expect(err).to.be.undefined;
    }
  });

  it('test procedure without params', async () => {
    try {
      const result = await instance.executeProcedure('set');
      expect(result).eql('call set()');
    } catch (err) {
      expect(err).to.be.undefined;
    }
  });

  it('test close', async () => {
    try {
      const result = await instance.close();
      expect(result).to.be.true;
    } catch (err) {
      expect(err).to.be.undefined;
    }
  });
});
