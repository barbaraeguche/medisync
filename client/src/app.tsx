// import HomePage from '@/views/general/home';
// import UserInfo from '@/views/(common)/user-info';
// import ContactInfo from '@/views/(common)/contact-info';
// import PatientInfo from '@/views/patient/patient-info';
// import DoctorInfo from '@/views/doctor/doctor-info';
// import MedicalHistory from '@/views/patient/medical-history';
// import Availabilities from '@/views/doctor/availabilities';
// import Appointments from '@/views/patient/appointments';
// import Appointments from '@/views/doctor/appointments';
// import BookAppointment from '@/views/general/book-appointment';
// import AccountSettings from '@/views/(common)/account-settings';
import LoginForm from '@/views/auth/login';
import RegisterForm from '@/views/auth/register';

export default function App() {
	return (
		<div className={'space-y-6'}>
			{/*<HomePage/>*/}
			{/*<UserInfo/>*/}
			{/*<ContactInfo/>*/}
			{/*<PatientInfo/>*/}
      {/*<DoctorInfo/>*/}
			{/*<MedicalHistory medicalHistory={medicalHistories}/>*/}
			{/*<Availabilities/>*/}
			{/*<Appointments/>*/}
			{/*<BookAppointment/>*/}
			{/*<AccountSettings/>*/}
			<LoginForm/>
			<RegisterForm/>
		</div>
	);
}