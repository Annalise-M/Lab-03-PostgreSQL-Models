const fs = require('fs');
const Whale = require('./whale');
const pool = require('../utils/pool');

describe('Whale model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });


  it('insert a new whale into the database', async() => {
    const createdWhale = await Whale.insert({ 
      name: 'moby', 
      age: 10000, 
      weight: 'wow mama lbs'
    });

    const { rows } = await pool.query(
      'SELECT * FROM whales WHERE id = $1', 
      [createdWhale.id]
    );

    expect(rows[0]).toEqual(createdWhale);
  });

  it('finds a whale by id', async() => {
    const moby = await Whale.insert({ 
      name: 'moby', 
      age: 10000, 
      weight: 'wow mama lbs'
    });

    const foundSimba = await Whale.findById(moby.id);

    expect(foundSimba).toEqual({
      id: moby.id,
      name: 'moby',
      age: 10000,
      weight: 'wow mama lbs'
    });
  });

  it('returns null if it cant find a whale by id', async() => {
    const whale = await Whale.findById(1988);

    expect(whale).toEqual(null);
  });

  it('finds all whales', async() => {
    await Promise.all([
      Whale.insert({
        name: 'moby',
        age: 10000,
        weight: 'wow mama lbs'
      }),
      Whale.insert({
        name: 'willy',
        age: 45,
        weight: 'wow lbs'
      }),
      Whale.insert({
        name: 'shamoo',
        age: 88,
        weight: 'all bloat lbs'
      })
    ]);

    const whales = await Whale.find();

    expect(whales).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'moby', age: 10000, weight: 'wow mama lbs' },
      { id: expect.any(String), name: 'willy', age: 45, weight: 'wow lbs' },
      { id: expect.any(String), name: 'shamoo', age: 88, weight: 'all bloat lbs' },
    ]));
  });

  it('updates a row by id', async() => {
    const createdWhale = await Whale.insert({ 
      name: 'moby', 
      age: 10000, 
      weight: 'wow mama lbs'
    });

    const updatedWhale = await Whale.update(createdWhale.id, {
      name: 'willy',
      age: 45,
      weight: '195 lbs'
    });

    expect(updatedWhale).toEqual({
      id: createdWhale.id,
      name: 'willy',
      age: 45,
      weight: '195 lbs'
    });
  });

  it('deletes a row by id', async() => {
    const createdWhale = await Whale.insert({
      name: 'shamoo',
      age: 88,
      weight: 'all bloat lbs'
    });

    const deletedWhale = await Whale.delete(createdWhale.id);

    expect(deletedWhale).toEqual({
      id: createdWhale.id,
      name: 'shamoo',
      age: 88,
      weight: 'all bloat lbs'
    });
  });
});
