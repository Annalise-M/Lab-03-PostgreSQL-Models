const pool = require('../utils/pool');

class Lion {
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

    static async insert(lion) {
      const { rows } = await pool.query(
        'INSERT INTO lions (name, age, weight) VALUES ($1, $2, $3) RETURNING *',
        [lion.name, lion.age, lion.weight]
      );

      return new Lion(rows[0]);
    }

    static async findById(id) {
      const { rows } = await pool.query(
        'SELECT * FROM lions WHERE id = $1',
        [id]
      );
      
      if(!rows[0]) return null;
      else return new Lion(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * from lions'
      );

      return rows.map(row => new Lion(row));
    }

    static async update(id, updatedlion) {
      const { rows } = await pool.query(
        `UPDATE lions
        SET name=$1,
            age=$2,
            weight=$3
        WHERE id = $4
        RETURNING *
        `,
        [updatedlion.name, updatedlion.age, updatedlion.weight, id]
      );

      return new Lion(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM lions WHERE id = $1 RETURNING *', 
        [id]
      );

      return new Lion(rows[0]);
    }
}

module.exports = Lion;

// Fun facts about a lion...
// Average Weight: lions weigh between 330 and 500 pounds
// Life span: About 7 years
