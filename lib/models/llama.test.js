const fs = require('fs');
const Llama = require('./llama');
const pool = require('../utils/pool');

describe('Lama model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });


  it('insert a new llama into the database', async() => {
    const createdLlama = await Llama.insert({ 
      name: 'sammy', 
      age: 10, 
      weight: '300 lbs'
    });

    const { rows } = await pool.query(
      'SELECT * FROM llamas WHERE id = $1', 
      [createdLlama.id]
    );

    expect(rows[0]).toEqual(createdLlama);
  });

  it('finds a llama by id', async() => {
    const sammy = await Llama.insert({ 
      name: 'sammy', 
      age: 10, 
      weight: '300 lbs'
    });

    const foundSammy = await Llama.findById(sammy.id);

    expect(foundSammy).toEqual({
      id: sammy.id,
      name: 'sammy',
      age: 10,
      weight: '300 lbs'
    });
  });

  it('returns null if it cant find a llama by id', async() => {
    const llama = await Llama.findById(1988);

    expect(llama).toEqual(null);
  });

  it('finds all llamas', async() => {
    await Promise.all([
      Llama.insert({
        name: 'sammy',
        age: 10,
        weight: '300 lbs'
      }),
      Llama.insert({
        name: 'dali',
        age: 85,
        weight: '210 lbs'
      }),
      Llama.insert({
        name: 'sammy',
        age: 10,
        weight: '300 lbs'
      })
      
    ]);
  });

});
