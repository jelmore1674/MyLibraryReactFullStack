import { React, useState } from 'react';
import Input from '../input/input';
import { Link } from 'react-router-dom';
import { MDBAnimation } from 'mdbreact';

export default function Signin({ setUser, setSignin }) {
	const [input, setInput] = useState({
		email: '',
		password: '',
	});
	const saveAuthTokenInSession = (token) => {
		window.sessionStorage.setItem('token', token);
	};

	const url = `${process.env.REACT_APP_HOST}/signin`;

	const handleChange = (event) => {
		setInput({
			...input,
			[event.target.id]: event.target.value,
		});
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: input.email,
					password: input.password,
				}),
			});
			const data = await response.json();
			if (data.success) {
				saveAuthTokenInSession(data.token);
				const resp = await fetch(
					`${process.env.REACT_APP_HOST}/user/${data.userid}`,
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
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<MDBAnimation type='slideInDown' duration='1.4s'>
			<div className='mt-5 d-flex justify-content-center '>
				<div className='container-fluid col-8 offset-2 bg-primary-trans  overflow-hidden  shadow-lg p-3 mb-5 rounded'>
					<div className='w-100'>
						<div className='border-bottom h2 p-2 text-white'>
							Sign In
						</div>
						<form onSubmit={(e) => handleSubmit(e)}>
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
						</form>
						<div className='d-flex justify-content-between flex-column'>
							<button
								className='btn btn-primary btn-lg col-xs-12 w-100'
								onClick={(e) => handleSubmit(e)}>
								Sign In
							</button>
							<Link to='/register' className='col-xs-12'>
								<button className='btn btn-secondary btn-lg w-100  '>
									Register
								</button>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</MDBAnimation>
	);
}
