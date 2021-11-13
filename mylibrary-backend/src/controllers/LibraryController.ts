import { Request, Response } from 'express';
import { Book, LibraryModel, UserModel } from '../models';
import { controller, del, get, post, put } from './decorators';

interface UpdateBookRequest extends Request {
	body: {
		id: number;
		update: boolean;
		completed: boolean;
	};
}

interface BookRequestwithBody extends Request {
	body: Book;
}

interface RemoveBookRequest extends Request {
	body: {
		id: number;
		remove: boolean;
	};
}

@controller('/library-item')
class LibraryController {
	@post('/')
	async addToLibrary(req: BookRequestwithBody, res: Response): Promise<void> {
		const { title, author, pages, completed, userid, email } = req.body;
		const newBook: Book = {
			userid: userid,
			title: title,
			author: author,
			pages: pages,
			completed: completed,
			email: email,
		};
		// Insert into the databse
		try {
			const addBook = await LibraryModel.addBook(newBook);
			if (addBook === 'Success') {
				res.status(201).json('Successfully added book');
			}
		} catch (err) {
			res.status(401).json(err);
		}
	}

	@put('/')
	async updateLibrary(req: UpdateBookRequest, res: Response): Promise<void> {
		const { update, id, completed } = req.body;
		// Checks for update of book finished status
		if (update) {
			try {
				const updatedBook = await LibraryModel.updateCompletedStatus(
					id,
					completed
				);
				res.status(202).json(updatedBook);
			} catch (err) {
				res.status(406).json(err);
			}
		}
	}

	@del('/')
	async removeBook(req: RemoveBookRequest, res: Response): Promise<void> {
		const { remove, id } = req.body;
		if (remove) {
			try {
				const removedBook = await LibraryModel.removeBook(id);
				res.status(202).json(removedBook);
			} catch (err) {
				res.status(400).json(err);
			}
		}
	}

	@get('/:userid')
	async displayLibrary(req: Request, res: Response): Promise<void> {
		const userid = parseInt(req.params.userid);
		// Queries Database, returning all books for user
		const user = await UserModel.getUserByID(userid);
		const library = await LibraryModel.getLibrary(user);
		if (library.length === 0) {
			await LibraryModel.createDefaultLibrary(user);
			const library = await LibraryModel.getLibrary(user);
			res.status(202).json(library);
		} else {
			res.status(202).json(library);
		}
	}
}
