import { render, screen } from '@testing-library/react';

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom';
import BookCollection from './BookCollection';

describe('BookCollection', () => {
	const user = { userid: 64, email: 'demo@demo.com', name: 'Demo' };
	it('renders without crashing', () => {
		const div = document.createElement('div');
		ReactDOM.render(<BookCollection user={user} />, div);
	});

	it('should render Books', async () => {
		const { getByTestId } = render(<BookCollection user={user} />);
		await screen.findAllByTestId('bookCard');
		const bookCard = screen.queryAllByTestId('bookCard');
		expect(bookCard).toBeTruthy();
	});
	it('should match snapshot', async () => {
		const tree = renderer
			.create(await (<BookCollection user={user} />))
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
