import { FC } from 'react';
import clsx from 'clsx';

type LoadingSpinnerProps = {
	size?: 'small' | 'medium';
};

const Spinner: FC<LoadingSpinnerProps> = (
	{ size = 'small' }
) => {
	// size classes
	const sizeClasses = {
		small: 'w-[18px] h-[18px] border-[3px]',
		medium: 'w-12 h-12 border-[4px]',
	};
	const isSmall = size === 'small';
	
	return (
		<div className={'flex flex-col items-center justify-center'}>
			<div className={clsx(
				`${sizeClasses[size]} border-teal-600/80 rounded-full border-t-transparent animate-spin`,
				{ 'mr-1.5': isSmall }
			)}/>
			{!isSmall && (
				<p className={'mt-5 text-lg'}>Authenticating... Please wait.</p>
			)}
		</div>
	);
};

export default Spinner;