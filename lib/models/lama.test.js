const Lama = require('./lama');

describe('Lama model', () => {
  it('insert a new lama into the database', async() => {
    await Lama.insert({ name: 'sammy', age: 10, weight: '300 lbs' });
  });
});
