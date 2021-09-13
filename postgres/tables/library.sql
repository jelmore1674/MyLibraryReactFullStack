BEGIN TRANSACTION;

CREATE TABLE library (
  id serial PRIMARY KEY,
  email text NOT NULL,
  title VARCHAR(100) NOT NULL,
  author text NOT NULL, 
  pages smallint NOT NULL,
  completed boolean NOT NULL,
  userid smallint NOT NULL  
);

COMMIT;