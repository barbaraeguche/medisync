import Select from 'react-select';

const options = [
	{ value: 'chocolate', label: 'Chocolate' },
	{ value: 'strawberry', label: 'Strawberry' },
	{ value: 'vanilla', label: 'Vanilla' }
];

const TailwindSelect = () => {
	const customStyles = {
		control: (provided, state) => ({
			...provided,
			'@apply border rounded-md': true,
			backgroundColor: state.isFocused ? '#FEF9C3' : 'white', // yellow-100 on focus
			'&:hover': {
				backgroundColor: 'pink',
			},
			color: 'rgba(114,168,101,0.9)', // text-red-500
		}),
		option: (provided, state) => ({
			...provided,
			backgroundColor: state.isFocused ? '#e7d51c' : 'white',
			color: '#44e1ef',
			'&:hover': {
				backgroundColor: 'black',
				color: 'white',
			},
		}),
		singleValue: (provided) => ({
			...provided,
			color: '#8f39e0', // text-red-500
		}),
	};
	
	return (
		<Select
			options={options}
			styles={customStyles}
			className="w-full"
		/>
	);
};

export default TailwindSelect;