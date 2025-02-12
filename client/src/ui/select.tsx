// import { forwardRef, SelectHTMLAttributes } from 'react';
// import Select, { StylesConfig, SelectInstance } from 'react-select';
// import { useFormContext } from 'react-hook-form';
//
// type OptionType = {
// 	value: string,
// 	label: string
// }
//
// type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
// 	options?: OptionType[],
// 	placeholder?: string
// }
//
// export default forwardRef<SelectInstance<OptionType>, SelectProps>(
// 	function CustomSelect(
// 		{ options = [], placeholder = '' },
// 		ref
// 	) {
// 		const customStyles: StylesConfig<OptionType, false> = {
// 			control: (provided, state) => ({
// 				...provided,
// 				boxShadow: 'none',
// 				borderRadius: '5px',
// 				transition: 'all 150ms',
// 				backgroundColor: 'hsl(var(--background))',
// 				border: state.isFocused ? '1px solid hsl(var(--ring))' : '',
//
// 				'&:hover': {
// 					border: '1px solid hsl(var(--ring))',
// 				}
// 			}),
// 			option: (provided, state) => ({
// 				...provided,
// 				cursor: 'pointer',
// 				color: 'hsl(var(--foreground))',
// 				backgroundColor: state.isFocused
// 					? 'hsl(var(--accent))'
// 					: 'hsl(var(--background))',
//
// 				'&:hover': {
// 					backgroundColor: 'hsl(var(--accent-foreground))',
// 				}
// 			})
// 		};
//
// 		return (
// 			<Select
// 				ref={ref}
// 				options={options}
// 				styles={customStyles}
// 				placeholder={placeholder}
// 				className={'w-full text-sm'}
// 			/>
// 		);
// 	});