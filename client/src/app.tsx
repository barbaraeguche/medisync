// import HomePage from './views/home.tsx';
import UserInfo from './views/(common)/user-info.tsx';
import AdditionalUserinfo from './views/(common)/additional-userinfo.tsx';

export default function App() {
	return (
		<div className={'ml-10 space-y-24'}>
			{/*<HomePage/>*/}
			<UserInfo/>
			<AdditionalUserinfo/>
		</div>
	);
}