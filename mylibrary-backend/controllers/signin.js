// Import models
const libraryModel = require('../models/library');
const auth = require('../utils/auth');

module.exports = {
    handleSignin: async(req, res) => {
        // Destruct the Request Object
        const { email, password } = req.body;

        // Check for email and password
        if (!email || !password) {
            res.status(401).json('Invalid User Credentials');
        } else if (email && password) {
            // Query database for match
            await libraryModel.deleteDemoLibrary();
            await libraryModel.createDemoLibrary(64);
            const user = await auth.userSignin(email, password);
            res.status(202).json(user);
        }
    },
    signinAuthentication: async(req, res) => {
        const { authorization } = req.headers;
        const { email, password } = req.body;
        if (authorization) {
            try {
                const tokenId = await auth.getAuthTokenId(req, res);
                return tokenId;
            } catch (err) {
                res.status(500).json({ message: err });
            }
        } else {
            try {
                const data = await auth.userSignin(email, password);
                if (data.userid && data.email) {
                    // await libraryModel.deleteDemoLibrary();
                    // await libraryModel.createDemoLibrary(1);
                    const session = await auth.createSessions(data);
                    console.log(session);
                    res.status(202).json(session);
                } else {
                    Promise.reject(data);
                }
            } catch (err) {
                res.status(401).json(err);
            }
        }
    },
};