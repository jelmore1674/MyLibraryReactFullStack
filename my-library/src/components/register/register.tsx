import { MDBAnimation } from 'mdbreact';

import React, { ChangeEvent, useState } from 'react';

import { useDispatch } from 'react-redux';
import { login } from '../../redux/user/userSlice';

import Input from '../input/input';

export default function Register(): JSX.Element {
	const [input, setInput] = useState({
		email: '',
		password: '',
		name: '',
	});

	const dispatch = useDispatch();

	const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
		setInput({
			...input,
			[event.target.id]: event.target.value,
		});
	};
	const saveAuthTokenInSession = (token: string): void => {
		window.sessionStorage.setItem('token', token);
	};

	const handleSubmit = async (
		event: React.SyntheticEvent<HTMLFormElement>
	): Promise<void> => {
		event.preventDefault();
		const response = await fetch(`${process.env.REACT_APP_HOST}/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name: input.name,
				email: input.email,
				password: input.password,
			}),
		});
		const data = await response.json();
		if (data.success) {
			saveAuthTokenInSession(data.token);
			const resp = await fetch(
				`${process.env.REACT_APP_HOST}/users/${data.userId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: data.token,
					},
				}
			);
			const user = await resp.json();
			if (user.userid) {
				await dispatch(login(user));
			}
		} else if (!data.success) {
			console.log(data.message);
		}
	};

	return (
		<MDBAnimation type='slideInLeft' duration={1.2}>
			<div className='mt-5 d-flex justify-content-center '>
				<div className='container-fluid col-8 offset-2 bg-primary-trans  overflow-hidden  shadow-lg p-3 mb-5 rounded'>
					<form className='w-100' onSubmit={handleSubmit}>
						<div className='border-bottom h2 p-2 text-white'>
							Register
						</div>
						<div>
							<Input
								type='text'
								id='name'
								name='name'
								label='Name'
								placeholder='Name'
								labelFor='name'
								setValue={input.name}
								handleChange={handleChange}
							/>
							<Input
								type='email'
								id='email'
								name='email'
								label='Email'
								placeholder='Email'
								labelFor='email'
								setValue={input.email}
								handleChange={handleChange}
							/>
							<Input
								type='password'
								id='password'
								name='password'
								label='Password'
								placeholder='Password'
								labelFor='password'
								setValue={input.password}
								handleChange={handleChange}
							/>
							<div className='d-flex justify-content-sm-between flex-column'>
								<button
									type='submit'
									className='btn btn btn-secondary btn-lg col-xs-12  '>
									Register
								</button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</MDBAnimation>
	);
}
