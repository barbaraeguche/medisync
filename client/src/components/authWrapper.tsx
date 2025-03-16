import { ReactNode } from 'react';
import useAuthVerification from '@/hooks/useAuthVerification';
import LoadingSpinner from '@/components/loading';

export default function AuthWrapper({ children }: {
	children: ReactNode;
}) {
	const { isVerifying } = useAuthVerification();
	
	if (isVerifying) {
		return (
			<div className={'flex justify-center items-center h-screen'}>
				<LoadingSpinner size={'medium'}/>
			</div>
		);
	}
	
	return <>{children}</>;
}