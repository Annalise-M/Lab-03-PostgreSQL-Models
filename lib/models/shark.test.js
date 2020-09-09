const fs = require('fs');
const Shark = require('./shark');
const pool = require('../utils/pool');

describe('Shark model', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
  });


  it('insert a new shark into the database', async() => {
    const createdShark = await Shark.insert({ 
      name: 'jaws', 
      age: 100, 
      weight: 'massive lbs'
    });

    const { rows } = await pool.query(
      'SELECT * FROM sharks WHERE id = $1', 
      [createdShark.id]
    );

    expect(rows[0]).toEqual(createdShark);
  });

  it('finds a shark by id', async() => {
    const jaws = await Shark.insert({ 
      name: 'jaws', 
      age: 100, 
      weight: 'massive lbs'
    });

    const foundSimba = await Shark.findById(jaws.id);

    expect(foundSimba).toEqual({
      id: jaws.id,
      name: 'jaws',
      age: 100,
      weight: 'massive lbs'
    });
  });

  it('returns null if it cant find a shark by id', async() => {
    const shark = await Shark.findById(1988);

    expect(shark).toEqual(null);
  });

  it('finds all sharks', async() => {
    await Promise.all([
      Shark.insert({
        name: 'jaws',
        age: 100,
        weight: 'massive lbs'
      }),
      Shark.insert({
        name: 'old betsy',
        age: 150,
        weight: 'wow lbs'
      }),
      Shark.insert({
        name: 'auntflo',
        age: 88,
        weight: 'all bloat lbs'
      })
    ]);

    const sharks = await Shark.find();

    expect(sharks).toEqual(expect.arrayContaining([
      { id: expect.any(String), name: 'jaws', age: 100, weight: 'massive lbs' },
      { id: expect.any(String), name: 'old betsy', age: 150, weight: 'wow lbs' },
      { id: expect.any(String), name: 'auntflo', age: 88, weight: 'all bloat lbs' },
    ]));
  });

  it('updates a row by id', async() => {
    const createdShark = await Shark.insert({ 
      name: 'jaws', 
      age: 100, 
      weight: 'massive lbs'
    });

    const updatedShark = await Shark.update(createdShark.id, {
      name: 'old betsy',
      age: 150,
      weight: '195 lbs'
    });

    expect(updatedShark).toEqual({
      id: createdShark.id,
      name: 'old betsy',
      age: 150,
      weight: '195 lbs'
    });
  });

  it('deletes a row by id', async() => {
    const createdShark = await Shark.insert({
      name: 'auntflo',
      age: 88,
      weight: 'all bloat lbs'
    });

    const deletedShark = await Shark.delete(createdShark.id);

    expect(deletedShark).toEqual({
      id: createdShark.id,
      name: 'auntflo',
      age: 88,
      weight: 'all bloat lbs'
    });
  });
});
