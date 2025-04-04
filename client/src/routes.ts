import {
	User, BookUser, Cog, // user icons
	BriefcaseMedical, PillBottle, // admin icons
	CalendarClock, ClipboardList, Stethoscope, // doctor icons
	Activity, FilePlus // patient icons
} from 'lucide-react';
import { SidebarRoutes } from '@/lib/types';

// user
import UserInfo from '@/views/user/basic-info';
import ContactInfo from '@/views/user/contact-info';
import Settings from '@/views/user/settings';
// admin
import RegisteredDoctors from '@/views/admin/all-doctors';
import RegisteredPatients from '@/views/admin/all-patients';
// doctor
import Availabilities from '@/views/doctor/availabilities';
import DoctorAppointments from '@/views/doctor/appointments';
import DoctorInfo from '@/views/doctor/doctor-info';
// patient
import PatientAppointments from '@/views/patient/appointments';
import MedicalHistory from '@/views/patient/medical-history';
import PatientInfo from '@/views/patient/patient-info';
// authorization
import SignInForm from '@/views/auth/sign-in';
import RegisterForm from '@/views/auth/register';
// general
import Services from '@/pages/services';
import HowItWorks from '@/pages/how-it-works';
import OurDoctors from '@/pages/our-doctors';
import AboutUs from '@/pages/about';
import Contact from '@/pages/contact';
// legal
import TermsOfService from '@/pages/terms-of-service';
import Privacy from '@/pages/privacy';
import Cookies from '@/pages/cookies';

const userRoutes: SidebarRoutes[] = [
	{
		path: '/profile',
		icon: User,
		name: 'Profile',
		component: UserInfo
	},
	{
		path: '/contacts',
		icon: BookUser,
		name: 'Contacts',
		component: ContactInfo
	},
	{
		path: '/settings',
		icon: Cog,
		name: 'Settings',
		component: Settings
	}
];

const adminRoutes: SidebarRoutes[] = [
	{
		path: '/registered-doctors',
		icon: BriefcaseMedical,
		name: 'Doctors',
		component: RegisteredDoctors
	},
	{
		path: '/registered-patients',
		icon: PillBottle,
		name: 'Patients',
		component: RegisteredPatients
	}
];


const doctorRoutes: SidebarRoutes[] = [
	{
		path: '/availability',
		icon: CalendarClock,
		name: 'Availability',
		component: Availabilities
	},
	{
		path: '/doctor/appointments',
		icon: ClipboardList,
		name: 'Appointments',
		component: DoctorAppointments
	},
	{
		path: '/doctor/role-info',
		icon: Stethoscope,
		name: 'Role Information',
		component: DoctorInfo
	}
];

const patientRoutes: SidebarRoutes[] = [
	{
		path: '/patient/appointments',
		icon: ClipboardList,
		name: 'Appointments',
		component: PatientAppointments
	},
	{
		path: '/medical-history',
		icon: Activity,
		name: 'Medical History',
		component: MedicalHistory
	},
	{
		path: '/patient/role-info',
		icon: FilePlus,
		name: 'Role Information',
		component: PatientInfo
	}
];

const authRoutes: SidebarRoutes[] = [
	{
		path: '/auth/signin',
		component: SignInForm
	},
	{
		path: '/auth/register',
		component: RegisterForm
	}
];

const commonRoutes: SidebarRoutes[] = [
	{
		path: '/services',
		component: Services
	},
	{
		path: '/services/:serviceType',
		component: Services
	},
	{
		path: '/how-it-works',
		component: HowItWorks
	},
	{
		path: '/our-doctors',
		component: OurDoctors
	},
	{
		path: '/about',
		component: AboutUs
	},
	{
		path: '/contact',
		component: Contact
	},
	{
		path: '/terms',
		component: TermsOfService
	},
	{
		path: '/privacy',
		component: Privacy
	},
	{
		path: '/cookies',
		component: Cookies
	}
];

export {
	authRoutes, adminRoutes, userRoutes, doctorRoutes, patientRoutes, commonRoutes
};