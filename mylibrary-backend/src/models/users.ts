import bcrypt from 'bcrypt';
import { db } from '../models';

export interface User {
	userid: number;
	name: string;
	email: string;
}

export interface Login {
	email: string;
	hash: string;
}

export class UserModel {
	static createUser = async (
		email: string,
		password: string,
		name: string
	): Promise<User> => {
		try {
			const hash = await bcrypt.hashSync(password, 10);
			const loginEmail = await db<Login>('login')
				.insert({
					hash: hash,
					email: email,
				})

				.returning('email');
			const newUser = await db<User>('users')
				.insert({
					email: loginEmail[0],
					name: name,
				})
				.returning('*');
			return newUser[0];
		} catch (err) {
			return Promise.reject('Unable to add user');
		}
	};
	static getUserByEmail = async (email: string): Promise<User> => {
		const user = await db<User>('users').select('*').where('email', email);
		return user[0];
	};
	static getUserHashByEmail = async (
		email: string
	): Promise<Pick<Login, 'email' | 'hash'>> => {
		const user = await db<Login>('login')
			.select('email', 'hash')
			.where('email', email);
		return user[0];
	};
	static getUserByID = async (userId: number): Promise<User> => {
		try {
			const user = await db<User>('users').where('userid', userId);
			if (user.length) {
				return user[0];
			} else {
				throw new Error('User not found');
			}
		} catch (err) {
			return Promise.reject('Unable to get user');
		}
	};
	static getAllUsers = async (): Promise<User[]> => {
		const users = await db<User>('users').select('*');
		return users;
	};
}
