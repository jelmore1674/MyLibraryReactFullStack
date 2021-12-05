import App from '../App';
import { render, screen, fireEvent } from '../test-utils/render';
import * as reactRedux from 'react-redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';

describe('<App />', () => {
	const useSelectorMock = jest.spyOn(reactRedux, 'useSelector');
	const useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

	beforeEach(() => {
		useSelectorMock.mockClear();
		useDispatchMock.mockClear();
	});

	it('should render the header when not signed in', () => {
		useSelectorMock.mockReturnValue(false);
		const history = createMemoryHistory();
		history.push('/signin');
		render(
			<Router history={history}>
				<App />
			</Router>
		);
		expect(screen.getByText('My Library')).toBeInTheDocument();
	});
	it('should render signed in', () => {
		useSelectorMock.mockReturnValue(true);
		const history = createMemoryHistory();
		history.push('/');
		render(
			<Router history={history}>
				<App />
			</Router>
		);
		expect(screen.getByText('My Library')).toBeInTheDocument();
	});
	it('should render signin form', () => {
		useSelectorMock.mockReturnValue(false);
		const history = createMemoryHistory();
		history.push('/signin');
		render(
			<Router history={history}>
				<App />
			</Router>
		);
		expect(screen.getByTestId('sign-in')).toBeInTheDocument();
	});
	it('should render register form when clicking register button', () => {
		useSelectorMock.mockReturnValue(false);
		const history = createMemoryHistory();
		history.push('/signin');
		render(
			<Router history={history}>
				<App />
			</Router>
		);
		fireEvent.click(screen.getByTestId('register-button'));
		const registerForm = screen.getByTestId('register-form');
		expect(registerForm).toBeInTheDocument();
	});
	it('should change user to demo when demo button is clicked', () => {
		useSelectorMock.mockReturnValue(false);
		const history = createMemoryHistory();
		history.push('/signin');
		render(
			<Router history={history}>
				<App />
			</Router>
		);
		fireEvent.click(screen.getByTestId('demo-button'));
		expect(useDispatchMock).toHaveBeenCalled();
		
	});
});
