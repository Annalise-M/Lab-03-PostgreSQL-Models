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

    static insert(lama) {
      
    }
}

module.exports = Lama;

// Average Weight: 300-450 pounds
// Life span: About 20-25 years
