import { Request, Response } from 'express';
import { LibraryModel, UserModel } from '../models';
import { Auth } from '../utils/auth';
import { controller, post } from './decorators';

interface RegisterUserRequest extends Request {
	body: {
		email: string;
		password: string;
		name: string;
	};
}

@controller('/register')
class RegisterController {
	@post('/')
	async handleRegister(
		req: RegisterUserRequest,
		res: Response
	): Promise<void> {
		const { email, name, password } = req.body;
		// If missing crediential, return missing credientials
		if (!email || !name || !password) {
			res.status(401).json('Missing credentials');
		} else {
			try {
				// Create New User
				const user = await UserModel.createUser(email, password, name);
				// Create Default library
				await LibraryModel.createDefaultLibrary(user);
				// Create JWT
				const token = await Auth.createSessions(user);
				// Return token
				res.status(201).json(token);
			} catch (err) {
				res.status(400).json({ message: err });
			}
		}
	}
}
