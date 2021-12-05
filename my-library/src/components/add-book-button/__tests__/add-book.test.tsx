import AddBookButton from '../add-book';
import { fireEvent, render, screen } from '@testing-library/react';

const mockOnClick = jest.fn(() => 'clicked');

describe('<AddBookButton />', () => {
	it('should render', () => {
		render(<AddBookButton onClick={mockOnClick} classes={''} />);
		expect(screen.getByText('Add Book')).toBeInTheDocument();
	});
	it('should have button role', () => {
		render(<AddBookButton onClick={mockOnClick} classes={''} />);
		expect(screen.getByRole('button')).toBeInTheDocument();
	});
	it('should return clicked when clicked', () => {
		render(<AddBookButton onClick={mockOnClick} classes={''} />);
		fireEvent.click(screen.getByText('Add Book'));
		expect(mockOnClick).toHaveBeenCalled();
	});
	it('should match snapshot', () => {
		const { asFragment } = render(
			<AddBookButton onClick={mockOnClick} classes={''} />
		);
		expect(asFragment()).toMatchSnapshot();
	});
});
