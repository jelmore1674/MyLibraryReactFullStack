import { Request, Response } from 'express';
import { UserModel } from '../models';
import { controller, get } from './decorators';

@controller('/users')
class UserController {
	@get('/:id')
	async getSingleUser(req: Request, res: Response): Promise<void> {
		try {
			const id = parseInt(req.params.id);
			const user = await UserModel.getUserByID(id);
			res.status(202).json(user);
		} catch (e) {
			res.status(404).json(e);
		}
	}
	@get('/')
	async getAllUsers(req: Request, res: Response): Promise<void> {
		try {
			const users = await UserModel.getAllUsers();
			res.status(202).json(users);
		} catch (e) {
			res.status(404).json(e);
		}
	}
}
