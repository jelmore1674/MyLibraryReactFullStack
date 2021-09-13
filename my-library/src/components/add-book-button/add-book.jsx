import React from 'react';

export default function AddBookButton({ openModal }) {
	return (
		<div className='d-grid'>
			<button
				className='btn btn-large btn-success rounded'
				onClick={openModal}>
				Add Book
			</button>
		</div>
	);
}
