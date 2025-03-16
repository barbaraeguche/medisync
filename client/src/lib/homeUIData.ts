import {
	Baby, Brain, Clock, Droplets, Ear, Eye, Heart, Shield,
	Smartphone, Stethoscope, Trees, TrendingUp, Users, Zap
} from 'lucide-react';
import { ServiceType } from '@/lib/types';

export const stats = [
	{ title: 'Active Patients', value: '10,000+' },
	{ title: 'Specialists', value: '100+' },
	{ title: 'Satisfaction', value: '98%' }
];

const servicesPrefix = '/services';
export const services: ServiceType[] = [
	{
		title: 'Ophthalmology', icon: Eye, link: `${servicesPrefix}/ophthalmology`,
		description: {
			min: 'Expert ophthalmology consultations with state-of-the-art virtual diagnostics.',
			exp: 'Comprehensive eye care, including vision assessment, eye disease management, and treatment recommendations.'
		},
		servicesOffered: ['Vision assessment', 'Eye disease evaluation', 'Glaucoma management', 'Diabetic eye exam', 'Dry eye treatment', 'Post-operative care']
	},
	{
		title: 'ENT Care', icon: Ear, link: `${servicesPrefix}/ent-care`,
		description: {
			min: 'Specialized ear, nose, and throat care from leading specialists.',
			exp: 'Specialized care for ear, nose, and throat conditions, including diagnostic evaluation and treatment planning.'
		},
		servicesOffered: ['Ear infection management', 'Hearing loss evaluation', 'Sinus problem assessment', 'Throat condition diagnosis', 'Voice disorder consultation', 'Allergy symptom management']
	},
	{
		title: 'Neurology', icon: Brain, link: `${servicesPrefix}/neurology`,
		description: {
			min: 'Advanced neurological consultations and follow-ups.',
			exp: 'Expert care for brain, spinal cord, and nervous system disorders, from diagnosis to management.'
		},
		servicesOffered: ['Headache and migraine management', 'Seizure disorder evaluation', 'Memory disorder assessment', 'Neuropathy management', 'Movement disorder consultation', 'Neurological symptom evaluation']
	},
	{
		title: 'Pulmonology', icon: Trees, link: `${servicesPrefix}/pulmonology`,
		description: {
			min: 'Comprehensive respiratory care and treatment plans.',
			exp: 'Expert care for respiratory conditions, including diagnostic evaluation, treatment, and management.'
		},
		servicesOffered: ['Asthma management', 'COPD care', 'Sleep apnea assessment', 'Respiratory infection treatment', 'Chronic cough evaluation', 'Pulmonary function assessment']
	},
	{
		title: 'General Medicine', icon: Stethoscope, link: `${servicesPrefix}/general-medicine`,
		description: {
			min: 'Primary care consultations for various health concerns.',
			exp: 'Primary care for adults, including preventive care, chronic disease management, and acute illness treatment.'
		},
		servicesOffered: ['Annual physical examinations', 'Preventive health screenings', 'Chronic disease management', 'Acute illness diagnosis and treatment', 'Prescription management', 'Health education and counseling']
	},
	{
		title: 'Mental Health', icon: Brain, link: `${servicesPrefix}/mental-health`,
		description: {
			min: ' Compassionate support for mental well-being and therapy.',
			exp: 'Compassionate mental health care, including assessment, therapy, and medication management.'
		},
		servicesOffered: ['Depression and anxiety treatment', 'Stress management', 'Medication management', 'Therapy sessions', 'Mental health assessment', 'Crisis intervention']
	},
	{
		title: 'Cardiology', icon: Heart, link: `${servicesPrefix}/cardiology`,
		description: {
			min: 'Expert heart care, including diagnosis, treatment, and prevention.',
			exp: 'Specialized care for heart conditions, including diagnostic testing, treatment, and ongoing management.'
		},
		servicesOffered: ['Heart disease evaluation', 'Hypertension management', 'Cholesterol management', 'Heart rhythm disorder assessment', 'Preventive cardiology', 'Post-cardiac event follow-up care']
	},
	{
		title: 'Pediatrics', icon: Baby, link: `${servicesPrefix}/pediatrics`,
		description: {
			min: 'Comprehensive medical care for infants, children, and adolescents.',
			exp: 'Comprehensive healthcare for children, including well-child visits, developmental assessments, and illness treatment.'
		},
		servicesOffered: ['Well-child check-ups', 'Developmental assessments', 'Childhood illness treatment', 'Immunizations', 'Behavioral health screening', 'Parental guidance and education']
	},
	{
		title: 'Dermatology', icon: Droplets, link: `${servicesPrefix}/dermatology`,
		description: {
			min: 'Specialized treatment for skin conditions and preventive care.',
			exp: 'Specialized care for skin conditions, including diagnostic evaluation, treatment, and management.'
		},
		servicesOffered: ['Acne treatment', 'Eczema and psoriasis management', 'Skin infection treatment', 'Rash evaluation', 'Skin lesion assessment', 'Preventive skin care guidance']
	}
];
export const additionalServices = [
	{
		title: 'Prescription Management', description: 'Convenient medication management',
		content: 'Manage your prescriptions online, request refills, and receive medication guidance from our healthcare professionals.'
	},
	{
		title: 'Lab Test Reviews', description: 'Expert analysis of your test results',
		content: 'Upload your lab results for review by our specialists who will provide detailed explanations and recommendations.'
	},
	{
		title: 'Second Opinions', description: 'Additional expert perspectives',
		content: 'Get a second opinion from our board-certified specialists to help you make informed decisions about your healthcare.'
	},
	{
		title: 'Chronic Care Management', description: 'Ongoing support for chronic conditions',
		content: 'Comprehensive care plans and regular check-ins to help manage chronic health conditions effectively.'
	},
	{
		title: 'Preventive Health', description: 'Proactive healthcare guidance',
		content: 'Personalized preventive health recommendations based on your age, gender, family history, and risk factors.'
	},
	{
		title: 'Health Coaching', description: 'Guidance for lifestyle improvements',
		content: 'Work with our health coaches to develop personalized plans for nutrition, exercise, stress management, and more.'
	}
];

export const whyChooseUs = [
	{ icon: Clock, title: '24/7 Availability', description: 'Access healthcare professionals around the clock, whenever you need them.' },
	{ icon: Smartphone, title: 'Convenient Access', description: 'Connect with doctors from the comfort of your home, office, or anywhere.' },
	{ icon: Users, title: 'Expert Specialists', description: 'Consult with a diverse range of experienced healthcare specialists.' },
	{ icon: Zap, title: 'Quick Response', description: 'Get rapid responses and reduce waiting times for consultations.' },
	{ icon: Shield, title: 'Secure & Private', description: 'Your health information is protected with state-of-the-art security measures.' },
	{ icon: TrendingUp, title: 'Continuous Care', description: 'Enjoy seamless follow-ups and ongoing care management.' }
];

export const checkUpReasons = [
	'Early detection of health issues',
	'Reduced risk of complications',
	'Updated health records for better care',
	'Personalized health advice',
	'Peace of mind and reduced anxiety',
];

export const footerLinks = [
	{
		title: 'Product',
		links: [
			{ title: 'Features', href: '#' }, { title: 'Pricing', href: '#' }, { title: 'Services', href: '/services' }
		]
	},
	{
		title: 'Company',
		links: [
			{ title: 'About', href: '/about' }, { title: 'Careers', href: '#' }, { title: 'Contact', href: '/contact' }
		]
	},
	{
		title: 'Resources',
		links: [
			{ title: 'Blog', href: '#' }, { title: 'Support', href: '#' }, { title: 'Documentation', href: '#' }
		]
	}
];