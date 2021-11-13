import React from 'react';

interface Props {
	onClick: (x: any) => any;
	classes: string;
}

export default function AddBookButton({
	onClick,
	classes,
}: Props): JSX.Element {
	return (
		<div className='d-grid'>
			<button
				className={`btn btn-large btn-success rounded ${classes}`}
				onClick={onClick}>
				Add Book
			</button>
		</div>
	);
}
