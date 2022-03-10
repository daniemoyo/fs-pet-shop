DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    name TEXT,
    age INTEGER,
    kind TEXT
);

INSERT INTO pets (age, name, kind) VALUES (7, 'daniel', 'dog');
INSERT INTO pets (age, name, kind) VALUES (10, 'mona', 'cat');
INSERT INTO pets (age, name, kind) VALUES (45, 'tindes', 'bird');
INSERT INTO pets (age, name, kind) VALUES (3, 'maize', 'tiger');
