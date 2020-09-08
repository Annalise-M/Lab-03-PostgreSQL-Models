const pool = require('../utils/pool');

class Llama {
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

    static async insert(llama) {
      const { rows } = await pool.query(
        'INSERT INTO llamas (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
        [llama.name, llama.age, llama.weight]
      );

      return new Llama(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM llamas WHERE id = $1',
        [id]
      );
      
      if(!rows[0]) return null;
      else return new Llama(rows[0]);

    }
}

module.exports = Llama;

// Average Weight: 300-450 pounds
// Life span: About 20-25 years
