const fs = require('fs');
const Lama = require('./lama');
const pool = require('../utils/pool');

describe('Lama model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });


  it('insert a new lama into the database', async() => {
    const createdLama = await Lama.insert({ 
      name: 'sammy', 
      age: 10, 
      weight: '300 lbs'
    });

    const { rows } = await pool.query(
      'SELECT * FROM lamas WHERE id = $1', 
      [createdLama.id]
    );

    expect(rows[0]).toEqual(createdLama);
  });

  it('finds a lama by id', async() => {
    const sammy = await Lama.insert({ 
      name: 'sammy', 
      age: 10, 
      weight: '300 lbs'
    });

    const foundSammy = await Lama.findById(sammy.id);

    expect(foundSammy).toEqual({
      id: sammy.id,
      name: 'sammy',
      age: 10,
      weight: '300 lbs'
    });
  });


});
