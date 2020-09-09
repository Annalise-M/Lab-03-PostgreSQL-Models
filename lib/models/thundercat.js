const pool = require('../utils/pool');

class Thundercat {
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

    static async insert(thundercat) {
      const { rows } = await pool.query(
        'INSERT INTO thundercats (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
        [thundercat.name, thundercat.age, thundercat.weight]
      );

      return new Thundercat(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM thundercats WHERE id = $1',
        [id]
      );
      
      if(!rows[0]) return null;
      else return new Thundercat(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * from thundercats'
      );

      return rows.map(row => new Thundercat(row));
    }

    static async update(id, updatedthundercat) {
      const { rows } = await pool.query(
        `UPDATE thundercats
        SET name=$1,
            age=$2,
            weight=$3
        WHERE id = $4
        RETURNING *
        `,
        [updatedthundercat.name, updatedthundercat.age, updatedthundercat.weight, id]
      );

      return new Thundercat(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM thundercats WHERE id = $1 RETURNING *', 
        [id]
      );

      return new Thundercat(rows[0]);
    }
}

module.exports = Thundercat;
