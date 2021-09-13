const db = require('./knex').db;

module.exports = {
    addBook: async(newBook) => {
        try {
            await db('library').insert(newBook).into('library');
            return 'Success';
        } catch (err) {
            return 'Failure';
        }
    },
    createDemoLibrary: async(id) => {
        await db
            .insert([{
                    userid: id,
                    email: 'demo@demo.com',
                    title: 'Welcome to Your Library',
                    author: 'Created by Justin Elmore',
                    pages: 3,
                    completed: true,
                },
                {
                    userid: id,
                    email: 'demo@demo.com',
                    title: 'If you click the finished button',
                    author: 'It will change the status',
                    pages: 55,
                    completed: false,
                },
                {
                    userid: id,
                    email: 'demo@demo.com',
                    title: 'To save history of books',
                    author: 'Create an Account!',
                    pages: 35,
                    completed: true,
                },
            ])
            .into('library');
        return 'created library';
    },
    createDefaultLibrary: async(user) => {
        console.log(user);
        await db
            .insert([{
                    userid: user.userid,
                    email: user.email,
                    title: 'Welcome to Your Library',
                    author: 'Created by Justin Elmore',
                    pages: 3,
                    completed: true,
                },
                {
                    userid: user.userid,
                    email: user.email,
                    title: 'If you click the finished button',
                    author: 'It will change the status',
                    pages: 55,
                    completed: false,
                },
                {
                    userid: user.userid,
                    email: user.email,
                    title: 'To save history of books',
                    author: 'Create an Account!',
                    pages: 35,
                    completed: true,
                },
            ])
            .into('library');
        return 'created library';
    },
    deleteDemoLibrary: async() => {
        return await db('library')
            .del('*')
            .where('email', '=', 'demo@demo.com');
    },
    getLibrary: async(user) => {
        const library = await db
            .select('*')
            .from('library')
            .where('userid', '=', user.userid)
            .orderBy('id', 'asc');
        return library;
    },
    removeBook: async(id) => {
        try {
            await db('library').del().where('id', id);
            return 'success';
        } catch (err) {
            return 'error';
        }
    },
    updateCompletedStatus: async(id, completed) => {
        try {
            await db
                .select('*')
                .from('library')
                .where('id', id)
                .update({ completed: completed });
            return 'success';
        } catch (err) {
            return err;
        }
    },
};