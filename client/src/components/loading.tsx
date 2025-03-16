import { FC } from 'react';

type LoadingSpinnerProps = {
	size?: 'small' | 'medium';
};

const LoadingSpinner: FC<LoadingSpinnerProps> = (
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
			<div className={`${sizeClasses[size]} ${isSmall && 'mr-1.5'} border-teal-600/80 rounded-full
				border-t-transparent animate-spin`
			}/>
			{!isSmall && (
				<p className={'mt-5 text-lg'}>Authenticating... Please wait.</p>
			)}
		</div>
	);
};

export default LoadingSpinner;