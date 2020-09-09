const fs = require('fs');
const Thundercat = require('./thundercat');
const pool = require('../utils/pool');

describe('Thundercat model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });


  it('insert a new thundercat into the database', async() => {
    const createdThundercat = await Thundercat.insert({ 
      name: 'cheetara', 
      age: 32, 
      weight: 'fit lbs'
    });

    const { rows } = await pool.query(
      'SELECT * FROM thundercats WHERE id = $1', 
      [createdThundercat.id]
    );

    expect(rows[0]).toEqual(createdThundercat);
  });

  it('finds a thundercat by id', async() => {
    const cheetara = await Thundercat.insert({ 
      name: 'cheetara', 
      age: 32, 
      weight: 'fit lbs'
    });

    const foundSimba = await Thundercat.findById(cheetara.id);

    expect(foundSimba).toEqual({
      id: cheetara.id,
      name: 'cheetara',
      age: 32,
      weight: 'fit lbs'
    });
  });

  it('returns null if it cant find a thundercat by id', async() => {
    const thundercat = await Thundercat.findById(1988);

    expect(thundercat).toEqual(null);
  });

  it('finds all thundercats', async() => {
    await Promise.all([
      Thundercat.insert({
        name: 'cheetara',
        age: 32,
        weight: 'fit lbs'
      }),
      Thundercat.insert({
        name: 'panthro',
        age: 46,
        weight: '195 lbs'
      }),
      Thundercat.insert({
        name: 'tygra',
        age: 38,
        weight: 'ripped as lbs'
      })
    ]);

    const thundercats = await Thundercat.find();

    expect(thundercats).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'cheetara', age: 32, weight: 'fit lbs' },
      { id: expect.any(String), name: 'panthro', age: 46, weight: '195 lbs' },
      { id: expect.any(String), name: 'tygra', age: 38, weight: 'ripped as lbs' },
    ]));
  });

  it('updates a row by id', async() => {
    const createdThundercat = await Thundercat.insert({ 
      name: 'cheetara', 
      age: 32, 
      weight: 'fit lbs'
    });

    const updatedThundercat = await Thundercat.update(createdThundercat.id, {
      name: 'panthro',
      age: 46,
      weight: '195 lbs'
    });

    expect(updatedThundercat).toEqual({
      id: createdThundercat.id,
      name: 'panthro',
      age: 46,
      weight: '195 lbs'
    });
  });

  it('deletes a row by id', async() => {
    const createdThundercat = await Thundercat.insert({
      name: 'tygra',
      age: 38,
      weight: 'ripped as lbs'
    });

    const deletedThundercat = await Thundercat.delete(createdThundercat.id);

    expect(deletedThundercat).toEqual({
      id: createdThundercat.id,
      name: 'tygra',
      age: 38,
      weight: 'ripped as lbs'
    });
  });
});
