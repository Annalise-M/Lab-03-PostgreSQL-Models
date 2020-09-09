const pool = require('../utils/pool');

class Shark {
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

    static async insert(shark) {
      const { rows } = await pool.query(
        'INSERT INTO sharks (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
        [shark.name, shark.age, shark.weight]
      );

      return new Shark(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM sharks WHERE id = $1',
        [id]
      );
      
      if(!rows[0]) return null;
      else return new Shark(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * from sharks'
      );

      return rows.map(row => new Shark(row));
    }

    static async update(id, updatedshark) {
      const { rows } = await pool.query(
        `UPDATE sharks
        SET name=$1,
            age=$2,
            weight=$3
        WHERE id = $4
        RETURNING *
        `,
        [updatedshark.name, updatedshark.age, updatedshark.weight, id]
      );

      return new Shark(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM sharks WHERE id = $1 RETURNING *', 
        [id]
      );

      return new Shark(rows[0]);
    }
}

module.exports = Shark;
