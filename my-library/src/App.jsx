import './App.css';
import React, { useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Nav from './components/navbar/navbar';
import BookCollection from './components/book-collection/BookCollection';
import Form from './components/form/form';
import Signin from './components/signin/signin';
import Register from './components/register/register';
import { handleToken } from './utils/handleToken';

function App() {
	let defaultModal = {
		display: 'none',
	};

	let modalStyle = {
		display: 'block',
		backgroundColor: 'rgba(0, 0, 0, .8)',
	};

	const [showModal, setShowModal] = useState(defaultModal);
	const [show, setShow] = useState('');
	const [isSignedIn, setSignin] = useState(false);
	const [user, setUser] = useState('');
	const [changedLibrary, setChangedLibrary] = useState(0);

	useEffect(() => {
		const token = window.sessionStorage.getItem('token');
		if (token) {
			const loadUser = async () => {
				const user = await handleToken(token);
				if (user) {
					setUser(user);
					setSignin(true);
					setChangedLibrary((prev) => prev++);
				} else return <Redirect to='signin' />;
			};
			loadUser();
			return <Redirect to='/home' />;
		}
	}, []);

	const handleSignOut = () => {
		window.sessionStorage.removeItem('token');
		setSignin(false);
		setUser('');
	};

	function openForm() {
		setShowModal(modalStyle);
		setShow('show');
	}

	function handleSubmit(event, title) {
		event.preventDefault();
		setShow('');
		setShowModal(defaultModal);
	}

	function removeModal() {
		setShowModal(defaultModal);
		setShow('');
	}

	return (
		<Router className='App'>
			<Nav
				openModal={openForm}
				isSignedIn={isSignedIn}
				setUser={setUser}
				user={user}
				handleSignOut={handleSignOut}
				setSignin={setSignin}
			/>
			<Switch>
				<Route path='/signin'>
					{!isSignedIn ? (
						<Signin setUser={setUser} setSignin={setSignin} />
					) : (
						<Redirect to='/' />
					)}
				</Route>
				<Route data-testid='/register' exact path='/register'>
					{!isSignedIn ? (
						<Register setUser={setUser} setSignin={setSignin} />
					) : (
						<Redirect to='/' />
					)}
				</Route>
				<ProtectedRoute isSignedIn={isSignedIn} path='/'>
					<div>
						<Form
							show={show}
							showModal={showModal}
							handleSubmit={handleSubmit}
							removeModal={removeModal}
							user={user}
							changedLibrary={changedLibrary}
							setChangedLibrary={setChangedLibrary}
						/>
						<BookCollection
							user={user}
							changedLibrary={changedLibrary}
							setChangedLibrary={setChangedLibrary}
						/>
					</div>
				</ProtectedRoute>
			</Switch>
		</Router>
	);
}

export default App;
