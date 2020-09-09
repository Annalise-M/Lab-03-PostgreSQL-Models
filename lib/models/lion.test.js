const fs = require('fs');
const Lion = require('./lion');
const pool = require('../utils/pool');

describe('Lion model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });


  it('insert a new lion into the database', async() => {
    const createdLion = await Lion.insert({ 
      name: 'simba', 
      age: 1, 
      weight: '350 lbs'
    });

    const { rows } = await pool.query(
      'SELECT * FROM lions WHERE id = $1', 
      [createdLion.id]
    );

    expect(rows[0]).toEqual(createdLion);
  });

  it('finds a lion by id', async() => {
    const simba = await Lion.insert({ 
      name: 'simba', 
      age: 1, 
      weight: '350 lbs'
    });

    const foundSimba = await Lion.findById(simba.id);

    expect(foundSimba).toEqual({
      id: simba.id,
      name: 'simba',
      age: 1,
      weight: '350 lbs'
    });
  });

  it('returns null if it cant find a lion by id', async() => {
    const lion = await Lion.findById(1988);

    expect(lion).toEqual(null);
  });

  it('finds all lions', async() => {
    await Promise.all([
      Lion.insert({
        name: 'simba',
        age: 1,
        weight: '350 lbs'
      }),
      Lion.insert({
        name: 'mufasa',
        age: 6,
        weight: '475 lbs'
      }),
      Lion.insert({
        name: 'scar',
        age: 8,
        weight: '375 lbs'
      })
    ]);

    const lions = await Lion.find();

    expect(lions).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'simba', age: 1, weight: '350 lbs' },
      { id: expect.any(String), name: 'mufasa', age: 6, weight: '475 lbs' },
      { id: expect.any(String), name: 'scar', age: 8, weight: '375 lbs' },
    ]));
  });

  it('updates a row by id', async() => {
    const createdLion = await Lion.insert({ 
      name: 'simba', 
      age: 1, 
      weight: '350 lbs'
    });

    const updatedLion = await Lion.update(createdLion.id, {
      name: 'mufasa',
      age: 6,
      weight: '195 lbs'
    });

    expect(updatedLion).toEqual({
      id: createdLion.id,
      name: 'mufasa',
      age: 6,
      weight: '195 lbs'
    });
  });

  it('deletes a row by id', async() => {
    const createdLion = await Lion.insert({
      name: 'scar',
      age: 8,
      weight: '375 lbs'
    });

    const deletedLion = await Lion.delete(createdLion.id);

    expect(deletedLion).toEqual({
      id: createdLion.id,
      name: 'scar',
      age: 8,
      weight: '375 lbs'
    });
  });
});
