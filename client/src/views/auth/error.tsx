import { Link } from 'react-router-dom';
import { AlertCircle, ShieldAlert } from 'lucide-react';
import { Button } from '@/ui/index';

export function NotFound() {
	return (
		<div className={'min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5'}>
			<div className={'container flex flex-col items-center justify-center max-w-md text-center space-y-6 p-6'}>
				<div className={'rounded-full bg-primary/10 p-4 w-fit'}>
					<AlertCircle className={'size-12 text-primary'}/>
				</div>
				<h1 className={'text-3xl font-bold tracking-tight text-primary'}>404 - Not Found</h1>
				<p className={'text-lg text-muted-foreground'}>The page you're looking for doesn't exist.</p>
				<Button className={'bg-gradient-to-r from-primary to-teal-600 hover:opacity-90'}>
					<Link to={'/'}>Return Home</Link>
				</Button>
			</div>
		</div>
	);
}

export function UnAuthorized() {
	return (
		<div className={'min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5'}>
			<div className={'container flex flex-col items-center justify-center max-w-md text-center space-y-6 p-6'}>
				<div className={'rounded-full bg-primary/10 p-4 w-fit'}>
					<ShieldAlert className={'size-12 text-primary'}/>
				</div>
				<h1 className={'text-3xl font-bold tracking-tight text-primary'}>401 - Unauthorized</h1>
				<p className={'text-lg text-muted-foreground'}>You don't have permission to access this page.</p>
				<div className={'flex gap-4'}>
					<Button
						variant={'outline'}
						className={'border-primary hover:bg-primary/10'}
					>
						<Link to={'/sign-in'}>Sign In</Link>
					</Button>
					<Button className={'bg-gradient-to-r from-primary to-teal-600 hover:opacity-90'}>
						<Link to={'/'}>Return Home</Link>
					</Button>
				</div>
			</div>
		</div>
  );
}