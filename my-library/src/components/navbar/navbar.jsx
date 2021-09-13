import React from 'react';
import AddBookButton from '../add-book-button/add-book';

export default function Nav({
	openModal,
	isSignedIn,
	setUser,
	handleSignOut,
	setSignin,
}) {
	const handleDemo = async () => {
		const saveAuthTokenInSession = (token) => {
			window.sessionStorage.setItem('token', token);
		};
		try {
			const response = await fetch(
				`${process.env.REACT_APP_HOST}/signin`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: 'demo@demo.com',
						password: 'demo',
					}),
				}
			);
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
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<nav
			data-testid='nav'
			className='navbar navbar-expand-sm sticky-top navbar-light bg-light'>
			<div className='container-fluid justify-content-between'>
				<div className='ms-2 navbar-brand'>
					<span className='h1 mb-0 textColorGradient'>
						<i className='fas fa-book-reader'></i>
					</span>
					<span className='mb-0 h1'>My Library</span>
				</div>
				<button
					className='navbar-toggler'
					type='button'
					data-bs-toggle='collapse'
					data-bs-target='#navbarTogglerDemo03'
					aria-controls='navbarTogglerDemo03'
					aria-expanded='false'
					aria-label='Toggle navigation'>
					<span className='navbar-toggler-icon'></span>
				</button>
				{isSignedIn === true ? (
					<div
						className='collapse navbar-collapse justify-content-sm-end'
						id='navbarTogglerDemo03'>
						<AddBookButton
							className='.d-none .d-sm-block .d-md-none'
							openModal={openModal}
						/>
						<div className='d-grid'>
							<button
								onClick={handleSignOut}
								className='btn btn-danger '>
								Sign Out
							</button>
						</div>
					</div>
				) : (
					<div>
						<button onClick={handleDemo} className='btn btn-info '>
							Demo
						</button>
					</div>
				)}
			</div>
		</nav>
	);
}
