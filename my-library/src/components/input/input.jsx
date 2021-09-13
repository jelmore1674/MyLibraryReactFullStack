import React from 'react';

export default function Input({
	type,
	id,
	name,
	placeholder,
	labelFor,
	label,
	handleChange,
	setValue,
}) {
	return (
		<div className='form-floating mb-3'>
			<input
				type={type}
				className='form-control'
				id={id}
				name={name}
				placeholder={placeholder}
				onChange={handleChange}
				value={setValue}
			/>
			<label htmlFor={labelFor}>{label}</label>
		</div>
	);
}
