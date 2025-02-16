// import HomePage from './views/home';
// import UserInfo from './views/(common)/user-info';
// import ContactInfo from './views/(common)/contact-info';
// import PatientInfo from '@/views/patient/patient-info';
// import DoctorInfo from '@/views/doctor/doctor-info';
// import MedicalHistory from '@/views/patient/medical-history';
import Availabilities from '@/views/doctor/availabilities';
// import CustomTable from '@/ui/table';

export default function App() {
	return (
		<div className={'space-y-6'}>
			{/*<HomePage/>*/}
			{/*<UserInfo/>*/}
			{/*<ContactInfo/>*/}
			{/*<PatientInfo/>*/}
      {/*<DoctorInfo/>*/}
			{/*<MedicalHistory medicalHistory={medicalHistories}/>*/}
			<Availabilities/>
			{/*<CustomTable/>*/}
		</div>
	);
}