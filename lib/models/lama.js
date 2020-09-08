const pool = require('../utils/pool');

class Lama {
    id;
    name;
    age;
    weight;

    constructor(row) {
      this.id = row.id;
      this.name = row.name;
      this.age = row.age;
      this.weight = row.weight;
    }

    static async insert(lama) {
      const { rows } = await pool.query(
        'INSERT INTO lamas (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
        [lama.name, lama.age, lama.weight]
      );

      return new Lama(rows[0]);
    }
}

module.exports = Lama;

// Average Weight: 300-450 pounds
// Life span: About 20-25 years
