const userModel = require('../models/users');
const libraryModel = require('../models/library');
const auth = require('../utils/auth');

module.exports = {
    handleRegister: async(req, res) => {
        // Destruct the Request object
        const { email, name, password } = req.body;
        // If missing crediential, return missing credientials

        if (!email || !name || !password) {
            res.status(401).json('Missing credentials');
        } else {
            try {
                // Create New User
                const user = await userModel.createUser(email, password, name);
                // Create Default library
                await libraryModel.createDefaultLibrary(user);
                const token = await auth.createSessions(user);
                res.status(201).json(token);
                // Return User
            } catch (err) {
                res.status(400).json({ message: err });
            }
        }
    },
};