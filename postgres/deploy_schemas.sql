-- create new tables for database
\i '/docker-entrypoint-initdb.d/tables/users.sql'
\i '/docker-entrypoint-initdb.d/tables/login.sql'
\i '/docker-entrypoint-initdb.d/tables/library.sql'

\i '/docker-entrypoint-initdb.d/seed/seed.sql'