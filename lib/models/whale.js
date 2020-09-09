const pool = require('../utils/pool');

class Whale {
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

    static async insert(whale) {
      const { rows } = await pool.query(
        'INSERT INTO whales (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
        [whale.name, whale.age, whale.weight]
      );

      return new Whale(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM whales WHERE id = $1',
        [id]
      );
      
      if(!rows[0]) return null;
      else return new Whale(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * from whales'
      );

      return rows.map(row => new Whale(row));
    }

    static async update(id, updatedwhale) {
      const { rows } = await pool.query(
        `UPDATE whales
        SET name=$1,
            age=$2,
            weight=$3
        WHERE id = $4
        RETURNING *
        `,
        [updatedwhale.name, updatedwhale.age, updatedwhale.weight, id]
      );

      return new Whale(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM whales WHERE id = $1 RETURNING *', 
        [id]
      );

      return new Whale(rows[0]);
    }
}

module.exports = Whale;
