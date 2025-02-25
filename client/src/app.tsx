import { Routes, Route } from 'react-router-dom';
import {
	authRoutes, userRoutes, doctorRoutes, patientRoutes
} from '@/routes';
import SiteLayout from '@/layouts/site';
import DashboardLayout from '@/layouts/dashboard';
import ProtectedRoute from '@/components/protectedRoute';
import HomePage from '@/views/general/home';
import { NotFound, UnAuthorized } from '@/views/auth/error';

// import UserInfo from '@/views/(common)/user-info';
// import ContactInfo from '@/views/(common)/contact-info';
// import Settings from '@/views/(common)/account-settings';

// import PatientInfo from '@/views/patient/patient-info';
// import MedicalHistory from '@/views/patient/medical-history';
// import BookAppointment from '@/views/general/book-appointment';
// import PatientAppointments from '@/views/patient/appointments';

// import DoctorInfo from '@/views/doctor/doctor-info';
// import DoctorAppointments from '@/views/doctor/appointments';
// import Availabilities from '@/views/doctor/availabilities';

// import SignInForm from '@/views/auth/sign-in';
// import RegisterForm from '@/views/auth/register';

// import { NotFound, UnAuthorized } from '@/views/auth/error';

// import Sidebar from '@/components/sidebar';

export default function App() {
	return (
		<SiteLayout>
			<Routes>
				{/* public routes */}
				<Route path={'/'} element={<HomePage/>}/>
				
				{/* auth routes */}
				<Route element={<ProtectedRoute allowedRoles={['Auth']}/>}>
					{authRoutes.map((route, idx) => {
						const Component = route.component;
						
						return (
							<Route key={idx} path={route.path} element={<Component/>}/>
						);
					})}
				</Route>
				
				{/* user routes */}
				<Route element={<ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Patient']}/>}>
					<Route element={<DashboardLayout/>}>
						{userRoutes.map((route, idx) => {
							const Component = route.component;
							
							return (
								<Route key={idx} path={route.path} element={<Component/>}/>
							);
						})}
					</Route>
				</Route>
				
				{/* admin routes */}
				<Route element={<ProtectedRoute allowedRoles={['Admin']}/>}>
					<Route element={<DashboardLayout/>}>
						{/* todo */}
					</Route>
				</Route>
				
				{/* doctor routes */}
				<Route element={<ProtectedRoute allowedRoles={['Admin', 'Doctor']}/>}>
					<Route element={<DashboardLayout/>}>
						{doctorRoutes.map((route, idx) => {
							const Component = route.component;
							
							return (
								<Route key={idx} path={route.path} element={<Component/>}/>
							);
						})}
					</Route>
				</Route>
				
				{/* patient routes */}
				<Route element={<ProtectedRoute allowedRoles={['Admin', 'Patient']}/>}>
					<Route element={<DashboardLayout/>}>
						{patientRoutes.map((route, idx) => {
							const Component = route.component;
							
							return (
								<Route key={idx} path={route.path} element={<Component/>}/>
							);
						})}
					</Route>
				</Route>
				
				{/* error routes */}
				<Route path={'*'} element={<NotFound/>}/>
				<Route path={'/unauthorized'} element={<UnAuthorized/>}/>
			</Routes>
		</SiteLayout>
	);
}