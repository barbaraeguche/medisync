import { Routes, Route } from 'react-router-dom';
import {
	authRoutes, userRoutes, doctorRoutes, patientRoutes
} from '@/routes';
import SiteLayout from '@/layouts/website';
import AuthLayout from '@/layouts/auth';
import DashboardLayout from '@/layouts/dashboard';
import ProtectedRoute from '@/components/protectedRoute';
import HomePage from '@/views/general/home';
import BookAppointment from '@/views/general/bookAppointment';
import { NotFound, UnAuthorized } from '@/views/auth/error';

export default function App() {
	return (
		<SiteLayout>
			<Routes>
				{/* public routes */}
				<Route path={'/'} element={<HomePage/>}/>
				
				{/* auth routes */}
				<Route element={<ProtectedRoute allowedRoles={['Auth']}/>}>
					<Route element={<AuthLayout/>}>
						{authRoutes.map((route, idx) => {
							const Component = route.component;
							
							return (
								<Route key={idx} path={route.path} element={<Component/>}/>
							);
						})}
					</Route>
				</Route>
				
				{/* user routes */}
				<Route element={<ProtectedRoute allowedRoles={['Admin', 'Doctor', 'Patient']}/>}>
					<Route path={'/book-appointment'} element={<BookAppointment/>}/>
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