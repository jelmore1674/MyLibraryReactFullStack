const knex = require('knex');
let db = null;

if (process.env.NODE_ENV === 'test') {
    db = knex({
        client: 'pg',
        connection: {
            host: '127.0.0.1',
            user: '',
            password: '',
            database: 'library-test',
        },
    });
} else {
    db = knex({
        client: 'pg',
        connection: process.env.POSTGRES_URI,
    });
}

module.exports = {
    db,
};