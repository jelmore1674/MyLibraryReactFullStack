require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const redis = require('redis');
const userModel = require('../models/users');
let redisClient = redis.createClient(process.env.REDIS_URI);

function signToken(email) {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
}

function verifyToken(token) {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return { error: 'unable to verify token' };
    }
}

const setToken = (key, value) => {
    return Promise.resolve(redisClient.set(key, value));
};

module.exports = {
    getAuthTokenId: (req, res) => {
        const { authorization } = req.headers;
        const data = verifyToken(authorization);
        if (!data.error) {
            redisClient.get(authorization, (err, reply) => {
                if (err || !reply) {
                    return res.status(400).json('Unauthorized');
                } else {
                    res.json({ id: reply });
                }
            });
        } else {
            res.json({ message: 'Unauthorized' });
        }
    },

    createSessions: (user) => {
        // Create JWT, return user data
        const { email, userid } = user;
        console.log(userid);
        const token = signToken(email);
        return setToken(token, userid)
            .then(() => {
                return { success: true, userId: userid, token };
            })
            .catch(console.log);
    },
    userSignin: async(email, password) => {
        try {
            if (!email || !password) {
                return Promise.reject('incorrect form submission');
            }
            const data = await userModel.getUserHashByEmail(email);
            if (data) {
                const isValid = await bcrypt.compareSync(password, data.hash);
                if (isValid) {
                    const user = await userModel.getUserByEmail(email);
                    return user;
                }
            }
        } catch (err) {
            Promise.reject(err);
        }
    },
    redisClient: redisClient,
};