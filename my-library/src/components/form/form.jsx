import { React, useState } from 'react';
import Input from '../input/input';

// Used to reset input state
const emptyInput = {
	title: '',
	author: '',
	pages: '',
	completed: false,
};

export default function Form({
	show,
	showModal,
	removeModal,
	handleSubmit,
	user,
	setChangedLibrary,
}) {
	const [input, setInput] = useState(emptyInput);

	const handleChange = (event) => {
		setInput({
			...input,
			[event.target.id]: event.target.value,
		});
	};

	const addBook = async (event) => {
		event.preventDefault();

		const data = await fetch(`${process.env.REACT_APP_HOST}/library-item`, {
			method: 'POST',
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userid: user.userid,
				title: input.title,
				author: input.author,
				pages: input.pages,
				completed: input.completed,
				email: user.email,
			}),
		});
		const book = await data.json();
		if (book === 'Successfully added book') {
			console.log(book);
			handleSubmit(event);
			setInput(emptyInput);
			setChangedLibrary((prevStatus) => prevStatus + 1);
		}
	};

	return (
		<div
			className={`modal ${show} fade `}
			id='exampleModal'
			tabIndex='1'
			role='dialog'
			aria-labelledby='exampleModalLabel'
			aria-hidden='true'
			style={showModal}>
			<div className='modal-dialog' role='document'>
				<div className='modal-content text-center'>
					<div className='modal-header text-center'>
						<h5
							className='modal-title text-uppercase text-center'
							id='exampleModalLabel'>
							Add Book To Library
						</h5>
						<button
							type='button'
							className='btn-close'
							data-dismiss='modal'
							aria-label='Close'
							onClick={() => {
								removeModal();
								setInput(emptyInput);
							}}></button>
					</div>
					<div className='modal-body text-center'>
						<form onSubmit={(e) => addBook(e)}>
							<Input
								type='text'
								id='title'
								name='title'
								label='Title'
								placeholder='Title'
								labelFor='title'
								setValue={input.title}
								handleChange={handleChange}
							/>
							<Input
								type='text'
								id='author'
								name='author'
								label='Author'
								placeholder='Author'
								labelFor='author'
								setValue={input.author}
								handleChange={handleChange}
							/>
							<Input
								type='number'
								id='pages'
								name='pages'
								label='Pages'
								placeholder='Pages'
								labelFor='pages'
								setValue={input.pages}
								handleChange={handleChange}
							/>
							<div className='form-group'>
								<label htmlFor='finished'>
									Have you finished the book?
								</label>
								<select
									onChange={handleChange}
									className='form-select form-select-lg mb-3'
									id='finished'
									aria-label='.form-select-lg form'>
									<option value={true}>Yes</option>
									<option value={false}>No</option>
								</select>
							</div>
							<button
								onClick={(e) => addBook(e)}
								className='btn rounded-pill btn-primary'>
								Submit
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
}
