import SiteLayout from '@/layouts/site';

// import HomePage from '@/views/general/home';

// import UserInfo from '@/views/(common)/user-info';
// import ContactInfo from '@/views/(common)/contact-info';
// import AccountSecurity from '@/views/(common)/account-settings';

// import PatientInfo from '@/views/patient/patient-info';
// import MedicalHistory from '@/views/patient/medical-history';
// import BookAppointment from '@/views/general/book-appointment';
// import PatientAppointments from '@/views/patient/appointments';

// import DoctorInfo from '@/views/doctor/doctor-info';
// import DoctorAppointments from '@/views/doctor/appointments';
// import Availabilities from '@/views/doctor/availabilities';

// import SignInForm from '@/views/auth/sign-in';
// import RegisterForm from '@/views/auth/register';

import { NotFound, UnAuthorized } from '@/views/auth/error-handlers';

export default function App() {
	return (
		<SiteLayout>
			{/*<HomePage/>*/}
			
			{/*<UserInfo/>*/}
			{/*<ContactInfo/>*/}
			{/*<AccountSecurity/>*/}
			
			{/*<PatientInfo/>*/}
			{/*<MedicalHistory/>*/}
			{/*<BookAppointment/>*/}
			
			{/*<DoctorInfo/>*/}
			{/*<Availabilities/>*/}
			
			{/* ----------- appointments used to be here ----------- */}
			
			{/*<SignInForm/>*/}
			{/*<RegisterForm/>*/}
			
			<NotFound/>
			<UnAuthorized/>
		</SiteLayout>
	);
}