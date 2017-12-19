CREATE TABLE IF NOT EXISTS "user" (
  id        SERIAL PRIMARY KEY,
  email     VARCHAR(50) NOT NULL UNIQUE,
  password  VARCHAR(50) NOT NULL
);

-- I know it's quite a bad idea to store emails and passwords in repository
INSERT INTO "user" (email, password) VALUES ('dzhadzha.binks.the.main.sith@mail.ru', 'peace1sal1ie');
INSERT INTO "user" (email, password) VALUES ('tljtg@mail.ru', '71428z');
INSERT INTO "user" (email, password) VALUES ('leiawhereami@mail.ru', 'redirect1142');
INSERT INTO "user" (email, password) VALUES ('bestsingerever@mail.ru', 'tomakeyouthink');