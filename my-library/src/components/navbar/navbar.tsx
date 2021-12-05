import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../redux/modal/modalSlice';
import { getToken, logout } from '../../redux/user/userSlice';
import AddBookButton from '../add-book-button/add-book';

export default function Nav(): JSX.Element {
	const dispatch = useDispatch();
	const { isSignedIn } = useSelector((state: any) => state.user);

	const handleSignOut = () => {
		window.sessionStorage.removeItem('token');
		window.sessionStorage.removeItem('id');
		dispatch(logout());
	};

	const handleDemo = async (): Promise<void> => {
		try {
			dispatch(getToken({ email: 'demo@demo.com', password: 'demo' }));
		} catch (error) {
			return;
		}
	};

	const showForm = (): void => {
		dispatch(openModal());
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
							classes='.d-none .d-sm-block .d-md-none'
							onClick={showForm}
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
						<button
							onClick={handleDemo}
							className='btn btn-info '
							data-testid='demo-button'>
							Demo
						</button>
					</div>
				)}
			</div>
		</nav>
	);
}
