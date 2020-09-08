DROP TABLE IF EXISTS llamas;

CREATE TABLE llamas (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    age INT CHECK (age > 0),
    weight TEXT
);
