import { User } from '../redux/user/userSlice';

export const handleToken = async (token: string): Promise<User | void> => {
	try {
		const res = await fetch(`${process.env.REACT_APP_HOST}/signin`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: token,
			},
		});
		const data = await res.json();
		if (data.id) {
			const resp = await fetch(
				`${process.env.REACT_APP_HOST}/users/${data.id}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token,
					},
				}
			);
			const user: User = await resp.json();
			return user;
		} else {
			throw new Error('Invalid token');
		}
	} catch (err) {
		console.error(err);
	}
};
