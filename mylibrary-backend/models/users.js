const bcrypt = require('bcrypt');

const db = require('./knex').db;

module.exports = {
    createUser: async(email, password, name) => {
        const hash = await bcrypt.hashSync(password, 10);
        try {
            const loginEmail = await db
                .insert({
                    hash: hash,
                    email: email,
                })
                .into('login')
                .onConflict('email', 'hash')
                .ignore()
                .returning('email');
            const newUser = await db('users').returning('*').insert({
                email: loginEmail[0],
                name: name,
            });
            return newUser[0];
        } catch (err) {
            return Promise.reject('Unable to add user');
        }
    },
    getUserByEmail: async(email) => {
        const user = await db.select('*').from('users').where('email', email);
        return user[0];
    },
    getUserHashByEmail: async(email) => {
        const user = await db('login')
            .select('email', 'hash')
            .where('email', '=', email);
        return user[0];
    },
    getUserByID: async(userId) => {
        const user = await db
            .select('*')
            .from('users')
            .where('userid', '=', userId);
        return user[0];
    },
};