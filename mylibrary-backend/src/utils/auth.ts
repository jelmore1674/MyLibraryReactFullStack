import bcrypt from 'bcrypt';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import redis from 'redis';
import { User, UserModel } from '../models';

export const redisClient = redis.createClient(process.env.REDIS_URI as string);

interface JWT {
	token: string;
	success: boolean;
	userId: number;
}

function signToken(email: string): string {
	const jwtPayload = { email };
	return jwt.sign(jwtPayload, process.env.JWT_SECRET as string, {
		expiresIn: '7d',
	});
}

function verifyToken(token: string): string | JwtPayload | Promise<any> {
	try {
		return jwt.verify(token, process.env.JWT_SECRET as string);
	} catch (err) {
		return Promise.reject({ error: 'unable to verify token' });
	}
}
const setToken = (key: string, value: string) => {
	console.log('set token');
	return Promise.resolve(redisClient.set(key, value));
};

export class Auth {
	static getAuthTokenId = async (
		req: Request,
		res: Response
	): Promise<void> => {
		const { authorization } = req.headers;
		try {
			if (authorization) {
				const data = verifyToken(authorization);
				if (data) {
					redisClient.get(authorization, (err, reply) => {
						if (err || !reply) {
							return (
								res.status(401) &&
								res.json({ error: 'unauthorized' })
							);
						} else {
							res.json({ id: reply });
						}
					});
				} else {
					throw new Error('unauthorized');
				}
			} else {
				throw new Error('unauthorized');
			}
		} catch (err) {
			res.json({ message: 'Unauthorized' });
		}
	};

	static createSessions = (user: User): Promise<JWT | void> => {
		// Create JWT, return user data
		const { email, userid } = user;
		const token = signToken(email);
		return setToken(token, userid.toString())
			.then(() => {
				return { success: true, userId: userid, token };
			})
			.catch(console.error);
	};
	static userSignin = async (
		email: string,
		password: string
	): Promise<User | undefined> => {
		try {
			if (!email || !password) {
				throw new Error('Please enter email and password');
			}
			const data = await UserModel.getUserHashByEmail(email);
			console.log(data);
			if (!data) {
				throw new Error('User not found');
			}
			if (data) {
				const isValid = await bcrypt.compareSync(password, data.hash);
				if (isValid) {
					const user = await UserModel.getUserByEmail(email);
					return Promise.resolve(user);
				} else {
					return Promise.reject('password incorrect');
				}
			}
		} catch (err) {
			return Promise.reject(err);
		}
	};
	static requireAuth = (req: Request, res: Response, next: NextFunction) => {
		const { authorization } = req.headers;
		if (!authorization) {
			return res.status(401).json({ error: 'unauthorized' });
		}
		return redisClient.get(authorization, (err, reply) => {
			if (err || !reply) {
				return res.status(401).json({ error: 'unauthorized' });
			} else {
				return next();
			}
		});
	};
}
