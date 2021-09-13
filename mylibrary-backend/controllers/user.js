const userModel = require('../models/users');

module.exports = {
    getSingleUser: async(req, res) => {
        const { id } = req.params;
        const user = await userModel.getUserByID(id);
        res.status(202).json(user);
    },
};