import { useEffect } from 'react';

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import ProtectedRoute from './utils/ProtectedRoute';

import BookCollection from './components/book-collection/BookCollection';
import Form from './components/form/form';
import Nav from './components/navbar/navbar';
import Register from './components/register/register';
import Signin from './components/signin/signin';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { login } from './redux/user/userSlice';
import { handleToken } from './utils/handleToken';

import './App.css';

function App(): JSX.Element {
	const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
	const dispatch = useDispatch();

	useEffect((): void => {
		const token = window.sessionStorage.getItem('token');
		if (token) {
			const loadUser = async () => {
				const user = await handleToken(token);
				if (user) {
					dispatch(login(user));
				}
			};
			loadUser();
		}
	}, [dispatch]);

	return (
		<Router>
			<main className='App'>
				<Nav />
				<Switch>
					<Route path='/signin'>
						{!isSignedIn ? <Signin /> : <Redirect to='/' />}
					</Route>
					<Route data-testid='/register' exact path='/register'>
						{!isSignedIn ? <Register /> : <Redirect to='/' />}
					</Route>
					<ProtectedRoute path='/'>
						<>
							<Form />
							<BookCollection />
						</>
					</ProtectedRoute>
				</Switch>
			</main>
		</Router>
	);
}

export default App;
