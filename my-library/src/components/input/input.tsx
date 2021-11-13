interface Props {
	type: string;
	placeholder: string;
	handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	setValue: string | number;
	label: string;
	labelFor: string;
	id: string;
	name: string;
}

export default function Input({
	type,
	id,
	name,
	placeholder,
	labelFor,
	label,
	handleChange,
	setValue,
}: Props): JSX.Element {
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
