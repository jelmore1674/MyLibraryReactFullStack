import { db, User } from '../models';

export interface Book {
	userid: number;
	id?: number;
	email: string;
	title: string;
	author: string;
	pages: number;
	completed: boolean;
}

export class LibraryModel {
	static addBook = async (newBook: Book): Promise<'Success' | 'Failure'> => {
		try {
			await db<Book>('library').insert(newBook);
			return 'Success';
		} catch (err) {
			return 'Failure';
		}
	};
	static createDemoLibrary = async (
		id: number
	): Promise<'created library' | 'failed to create library'> => {
		try {
			await db<Book>('library').insert([
				{
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
			]);
			return 'created library';
		} catch (err) {
			return 'failed to create library';
		}
	};
	static createDefaultLibrary = async (
		user: User
	): Promise<'created library' | 'failed to create library'> => {
		try {
			await db<Book>('library').insert([
				{
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
			]);
			return 'created library';
		} catch (err) {
			return 'failed to create library';
		}
	};
	static deleteDemoLibrary = async (): Promise<
		void | 'failed to delete library'
	> => {
		try {
			await db<Book>('library')
				.del('*')
				.where('email', '=', 'demo@demo.com');
		} catch (err) {
			return 'failed to delete library';
		}
	};
	static getLibrary = async (
		user: User
	): Promise<Book[] | 'failed to get library'> => {
		try {
			const library = await db<Book>('library')
				.select('*')
				.where('userid', user.userid)
				.orderBy('id', 'asc');
			return library;
		} catch (err) {
			return 'failed to get library';
		}
	};
	static removeBook = async (id: number): Promise<string> => {
		try {
			await db<Book>('library').del().where('id', id);
			return 'success';
		} catch (err) {
			return 'error';
		}
	};
	static updateCompletedStatus = async (
		id: number,
		completed: boolean
	): Promise<'Success' | 'Unable to update book status'> => {
		try {
			await db<Book>('library')
				.select('*')
				.where('id', id)
				.update({ completed: completed });
			return Promise.resolve('Success');
		} catch (err) {
			return Promise.reject('Unable to update book status');
		}
	};
}
