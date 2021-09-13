import { React, useEffect, useState } from 'react';
import BookCard from '../book-card/BookCard';
import { getLibrary } from './list';

export default function BookCollection({
	user,
	changedLibrary,
	setChangedLibrary,
}) {
	const [library, setLibrary] = useState([]);

	// useEffect is used to fetch the library collection
	useEffect(() => {
		async function fetchLibrary() {
			const books = await getLibrary(
				`${process.env.REACT_APP_HOST}/library-item/${user.userid}`
			);
			setLibrary((prevState) => books);
		}
		fetchLibrary();
	}, [changedLibrary, user.userid]);

	const removeBook = async (id) => {
		try {
			const response = await fetch(
				`${process.env.REACT_APP_HOST}/library-item`,
				{
					method: 'delete',
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						id: id,
						remove: true,
					}),
				}
			);
			const data = await response.json();
			if (data === 'success') {
				setChangedLibrary((prevStatus) => prevStatus + 1);
			} else {
				Promise.reject('could not remove book from library');
			}
		} catch (err) {
			console.log(err);
		}
	};

	const updateBook = async (id) => {
		try {
			for (var i = 0; i < library.length; i++) {
				if (library[i].id === id) {
					const completedStatus = !library[i].completed;
					const response = await fetch(
						`${process.env.REACT_APP_HOST}/library-item`,
						{
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
						}
					);
					const data = await response.json();
					if (data === 'success') {
						setChangedLibrary((prevStatus) => ++prevStatus);
					} else return Promise.reject(data);
				}
			}
		} catch (err) {
			console.log(err);
		}
	};

	function createBookCard(book) {
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
