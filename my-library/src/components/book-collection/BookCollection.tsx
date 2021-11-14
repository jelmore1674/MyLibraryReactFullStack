import { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Book, fetchLibraryByUserId } from '../../redux/library/librarySlice';
import { RootState } from '../../redux/store';

import BookCard from '../book-card/BookCard';

export default function BookCollection(): JSX.Element {
	const { library } = useSelector((state: RootState) => state.library);
	const { user } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	// useEffect is used to fetch the library collection
	useEffect(() => {
		if (user) {
			dispatch(fetchLibraryByUserId(user.userid));
		}
	}, [dispatch, user]);

	const removeBook = async (id: number): Promise<void> => {
		try {
			const response = await fetch(`/api/library-item`, {
				method: 'delete',
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: id,
					remove: true,
				}),
			});
			const data = await response.json();
			if (data === 'success') {
				if (user) {
					dispatch(fetchLibraryByUserId(user.userid));
				}
			} else {
				throw new Error('could not remove book from library');
			}
		} catch (err) {
			console.error(err);
		}
	};

	const updateBook = async (id: number): Promise<void> => {
		try {
			for (var i = 0; i < library.length; i++) {
				if (library[i].id === id) {
					const completedStatus = !library[i].completed;
					const response = await fetch(`/api/library-item`, {
						method: 'put',
						headers: {
							'Access-Control-Allow-Origin': '*',
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							id: id,
							update: true,
							completed: completedStatus,
						}),
					});
					const data = await response.json();
					if (data === 'Success') {
						if (user) {
							dispatch(fetchLibraryByUserId(user.userid));
						}
					} else {
						throw new Error('could not update book in library');
					}
				}
			}
		} catch (err) {
			console.error(err);
		}
	};

	function createBookCard(book: Book): JSX.Element | undefined {
		if (book.id) {
			return (
				<BookCard
					key={book.id}
					id={book.id}
					title={book.title}
					author={book.author}
					pages={book.pages}
					finished={book.completed}
					removeBook={removeBook}
					updateBook={updateBook}
				/>
			);
		}
	}

	return (
		<div className='container mt-5'>
			<div
				data-testid='bookCollection'
				className='row rol-cols-xs-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 gy-4 justify-content-center align-items-center'>
				{library.map(createBookCard)}
			</div>
		</div>
	);
}
