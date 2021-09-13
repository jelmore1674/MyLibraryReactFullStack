import { render } from '@testing-library/react';
import App from './App';

describe('first test in react', () => {
	it('should render nav', () => {
		const { getByTestId } = render(<App />);
		const nav = getByTestId('nav');
		expect(nav).toBeTruthy();
	});
});
