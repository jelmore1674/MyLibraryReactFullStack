import { MDBAnimation } from 'mdbreact';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getToken } from '../../redux/user/userSlice';
import Input from '../input/input';

export default function Signin(): JSX.Element {
	const [input, setInput] = useState({
		email: '',
		password: '',
	});

	const dispatch = useDispatch();

	const handleChange = (
		event: React.SyntheticEvent<HTMLInputElement>
	): void => {
		setInput({
			...input,
			[event.currentTarget.id]: event.currentTarget.value,
		});
	};

	const handleSubmit = async (event: React.SyntheticEvent): Promise<void> => {
		event.preventDefault();
		try {
			dispatch(getToken(input));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<MDBAnimation type='slideInDown' duration={1.4}>
			<div className='mt-5 d-flex justify-content-center '>
				<div className='container-fluid col-8 offset-2 bg-primary-trans  overflow-hidden  shadow-lg p-3 mb-5 rounded'>
					<div className='w-100'>
						<div className='border-bottom h2 p-2 text-white'>
							Sign In
						</div>
						<form
							onSubmit={(e) => handleSubmit(e)}
							data-testid='sign-in'>
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
							<div className='d-flex justify-content-between flex-column'>
								<button className='btn btn-primary btn-lg col-xs-12 w-100'>
									Sign In
								</button>
								<Link to='/register' className='col-xs-12'>
									<button
										className='btn btn-secondary btn-lg w-100'
										data-testid='register-button'>
										Register
									</button>
								</Link>
							</div>
						</form>
					</div>
				</div>
			</div>
		</MDBAnimation>
	);
}
