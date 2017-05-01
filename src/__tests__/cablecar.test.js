import cablecar from '../';

describe('redux-cablecar', () => {
  describe('actions', () => {
    it('has actions generators', () => {
      const methods = ['connect', 'disconnect', 'send', 'subscribe', 'unsubscribe'];
      methods.forEach( method => {
        expect(cablecar.actions[method]).toBeInstanceOf(Function);
      });
    });
  });

  describe('middleware', () => {
    it('is defined', () => {
      expect(cablecar.middleware).toBeInstanceOf(Object);
    });
  });
})
