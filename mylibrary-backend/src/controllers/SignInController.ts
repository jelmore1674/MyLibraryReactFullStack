import { Request, Response } from 'express';
import { LibraryModel, UserModel } from '../models';
import { Auth } from '../utils/auth';
import { controller, post } from './decorators';

interface SigninRequestWithBody extends Request {
	body: {
		email: string;
		password: string;
	};
}

@controller('/signin')
class SignInController {
	@post('/test')
	async handleSignin(
		req: SigninRequestWithBody,
		res: Response
	): Promise<void> {
		const { email, password } = req.body;
		// Check for email and password
		if (!email || !password) {
			res.status(401).json('Invalid User Credentials');
		} else if (email && password) {
			// Query database for match
			await LibraryModel.deleteDemoLibrary();
			const demoUser = await UserModel.getUserByEmail('demo@demo.com');
			await LibraryModel.createDemoLibrary(demoUser.userid);
			const user = await Auth.userSignin(email, password);
			res.status(202).json(user);
		}
	}

	@post('/')
	async signinAuthentication(
		req: SigninRequestWithBody,
		res: Response
	): Promise<void> {
		const { authorization } = req.headers;
		const { email, password } = req.body;
		if (authorization) {
			try {
				await Auth.getAuthTokenId(req, res);
			} catch (err) {
				res.status(500).json({ message: err });
			}
		} else {
			try {
				const data = await Auth.userSignin(email, password);
				if (data) {
					const session = await Auth.createSessions(data);
					res.status(202).json(session);
				} else {
					Promise.reject(data);
				}
			} catch (err) {
				res.status(401).json({ message: err });
			}
		}
	}
}
