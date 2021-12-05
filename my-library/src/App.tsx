import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import './App.css';
import BookCollection from './components/book-collection/BookCollection';
import Form from './components/form/form';
import Nav from './components/navbar/navbar';
import Register from './components/register/register';
import Signin from './components/signin/signin';
import { RootState } from './redux/store';
import { loginUser } from './redux/user/userSlice';
import ProtectedRoute from './utils/ProtectedRoute';

function App(): JSX.Element {
	const { isSignedIn, token } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	const saveAuthTokenInSession = (token: any) => {
		window.sessionStorage.setItem('token', token.token);
		window.sessionStorage.setItem('id', token.userid);
	};

	useEffect((): void => {
		if (token) {
			saveAuthTokenInSession(token);
		}
	}, [token]);

	useEffect((): void => {
		const tokenkey = window.sessionStorage.getItem('token');
		const tokenid = window.sessionStorage.getItem('id');
		if (tokenkey) {
			if (tokenid) {
				const user = {
					tokenkey,
					userid: tokenid,
				};
				dispatch(loginUser(user));
			}
		}
	}, [dispatch, token]);

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
