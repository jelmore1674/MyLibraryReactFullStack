import { React, useState } from 'react';
import Input from '../input/input';
import { MDBAnimation } from 'mdbreact';

export default function Register({ setUser, setSignin }) {
	const [input, setInput] = useState({
		email: '',
		password: '',
		name: '',
	});

	const handleChange = (event) => {
		setInput({
			...input,
			[event.target.id]: event.target.value,
		});
	};
	const saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};

	const handleSubmit = async (event) => {
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
				`${process.env.REACT_APP_HOST}/user/${data.userId}`,
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
				setUser(user);
				setSignin(true);
			}
		} else if (!data.success) {
			console.log(data.message);
		}
	};

	return (
		<MDBAnimation type='slideInLeft' duration='1.2s'>
			<div className='mt-5 d-flex justify-content-center '>
				<div className='container-fluid col-8 offset-2 bg-primary-trans  overflow-hidden  shadow-lg p-3 mb-5 rounded'>
					<form className='w-100'>
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
									onClick={handleSubmit}
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
