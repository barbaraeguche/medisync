import { Component, ErrorInfo, ReactNode } from 'react';
import { Bomb } from 'lucide-react';
import { Button } from '@/components/ui';

interface Props {
	children: ReactNode;
}
interface State {
	hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}
	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static getDerivedStateFromError(_: Error): State {
		return { hasError: true };
	}
	
	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		console.error('Error caught by ErrorBoundary:', error, errorInfo);
	}
	
	handleRetry = () => {
		window.location.reload();
	};
	
	render() {
		if (this.state.hasError) {
			return (
				<div className={'min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-primary/5'}>
					<div className={'container flex flex-col items-center justify-center max-w-md text-center space-y-6 p-6'}>
						<div className={'rounded-full bg-primary/10 p-4 w-fit'}>
							<Bomb className={'size-10 text-primary'}/>
						</div>
						<h1 className={'text-3xl font-bold tracking-tight text-primary'}>An error occurred</h1>
						<p className={'text-lg text-muted-foreground'}>Something went wrong. Please try again.</p>
						<Button
							type={'reset'}
							onClick={this.handleRetry}
							className={'bg-gradient-to-r from-primary to-teal-600 hover:opacity-90'}
						>
							Retry Application
						</Button>
					</div>
				</div>
			);
		}
		return this.props.children;
	}
}