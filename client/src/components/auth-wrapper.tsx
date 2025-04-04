import { ReactNode } from 'react';
import useAuthVerification from '@/hooks/useAuthVerification';
import Spinner from '@/components/spinner';

export default function AuthWrapper({ children }: {
	children: ReactNode;
}) {
	const { isVerifying } = useAuthVerification();
	
	if (isVerifying) {
		return (
			<div className={'flex justify-center items-center h-screen'}>
				<Spinner size={'medium'}/>
			</div>
		);
	}
	
	return <>{children}</>;
}