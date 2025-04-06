import {
	Baby, Brain, Calendar, Clock, CreditCard, Droplets, Ear, Eye, Heart, MessageSquare,
	Shield, Smartphone, Stethoscope, Trees, TrendingUp, UserPlus, Users, Video, Zap
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

export const steps = [
	{
		icon: UserPlus, title: 'Create Your Account',
		description: 'Sign up for QuantumCare by providing your basic information and creating secure login credentials.',
	},
	{
		icon: Calendar, title: 'Book an Appointment',
		description: 'Browse available doctors, select your preferred specialist, and choose a convenient time slot.',
	},
	{
		icon: Video, title: 'Attend Virtual Consultation',
		description: 'Connect with your doctor via secure video call at your scheduled appointment time.',
	},
	{
		icon: MessageSquare, title: 'Receive Treatment Plan',
		description: 'Get personalized treatment recommendations, prescriptions, and follow-up instructions.',
	},
	{
		icon: CreditCard, title: 'Payment & Insurance',
		description: 'Pay for your consultation securely online, with options for insurance coverage where applicable.',
	}
];

export const faqs = [
	{
		question: 'How do I prepare for a telehealth appointment?',
		answer: 'Find a quiet, private space with good internet connection. Test your camera and microphone beforehand. Have a list of your symptoms, medications, and questions ready. Keep a pen and paper handy to take notes during your consultation.',
	},
	{
		question: 'What technology do I need for a virtual visit?',
		answer: "You'll need a device with a camera and microphone (smartphone, tablet, or computer), a stable internet connection, and an up-to-date web browser. Our platform works best with Chrome, Firefox, Safari, or Edge.",
	},
	{
		question: 'Are telehealth visits covered by insurance?',
		answer: 'Many insurance providers now cover telehealth services. Coverage varies by plan and provider. We recommend checking with your insurance company before your appointment to confirm coverage details and any applicable co-payments.',
	},
	{
		question: 'How secure is my medical information?',
		answer: 'QuantumCare is fully HIPAA-compliant and uses end-to-end encryption for all video consultations. Your medical information is stored securely, and we never share your data with third parties without your explicit consent.',
	},
	{
		question: 'Can doctors prescribe medication during a telehealth visit?',
		answer: 'Yes, doctors can prescribe many medications during telehealth visits. Prescriptions are sent electronically to your preferred pharmacy. However, certain controlled substances may require in-person visits according to state regulations.',
	},
	{
		question: 'What if I need lab work or imaging?',
		answer: 'If your doctor determines you need lab work or imaging, they will provide you with a requisition form. You can then visit a local lab or imaging center of your choice. Results will be sent to your doctor and discussed in a follow-up appointment.',
	}
];

export const boardDoctors = [
	{
		name: 'Dr. Sarah Johnson',
		specialty: 'Cardiology',
		image: '/placeholder.svg?height=300&width=300',
		rating: 4.9,
		reviewCount: 127,
		education: 'Harvard Medical School',
		experience: '15+ years',
		languages: 'English, Spanish',
		bio: 'Dr. Johnson is a board-certified cardiologist specializing in preventive cardiology and heart disease management. She has extensive experience in treating complex cardiac conditions and is committed to patient-centered care.',
	},
	{
		name: 'Dr. Michael Chen',
		specialty: 'General Medicine',
		image: '/placeholder.svg?height=300&width=300',
		rating: 4.8,
		reviewCount: 203,
		education: 'Johns Hopkins University',
		experience: '12+ years',
		languages: 'English, Mandarin',
		bio: 'Dr. Chen is a dedicated primary care physician focused on preventive care and chronic disease management. He believes in building strong doctor-patient relationships and empowering patients through education.',
	},
	{
		name: 'Dr. Amara Patel',
		specialty: 'Neurology',
		image: '/placeholder.svg?height=300&width=300',
		rating: 4.9,
		reviewCount: 156,
		education: 'Stanford University',
		experience: '10+ years',
		languages: 'English, Hindi, Gujarati',
		bio: "Dr. Patel is a neurologist specializing in headache disorders, stroke management, and neurodegenerative diseases. She combines cutting-edge research with compassionate care to improve her patients' quality of life.",
	},
	{
		name: 'Dr. James Wilson',
		specialty: 'Pulmonology',
		image: '/placeholder.svg?height=300&width=300',
		rating: 4.7,
		reviewCount: 118,
		education: 'Yale School of Medicine',
		experience: '18+ years',
		languages: 'English, French',
		bio: 'Dr. Wilson is a pulmonologist with expertise in asthma, COPD, and sleep disorders. He is dedicated to helping patients manage respiratory conditions and improve their breathing and overall health.',
	},
	{
		name: 'Dr. Maria Rodriguez',
		specialty: 'Pediatrics',
		image: '/placeholder.svg?height=300&width=300',
		rating: 4.9,
		reviewCount: 215,
		education: 'University of California, San Francisco',
		experience: '14+ years',
		languages: 'English, Spanish',
		bio: 'Dr. Rodriguez is a compassionate pediatrician dedicated to providing comprehensive care for children from birth through adolescence. She specializes in developmental pediatrics and preventive care.',
	},
	{
		name: 'Dr. Robert Kim',
		specialty: 'Dermatology',
		image: '/placeholder.svg?height=300&width=300',
		rating: 4.8,
		reviewCount: 142,
		education: 'Columbia University',
		experience: '11+ years',
		languages: 'English, Korean',
		bio: 'Dr. Kim is a board-certified dermatologist specializing in medical and cosmetic dermatology. He is passionate about skin health and helping patients address concerns ranging from acne to complex skin conditions.',
	},
	{
		name: 'Dr. Emily Taylor',
		specialty: 'Psychiatry',
		image: '/placeholder.svg?height=300&width=300',
		rating: 4.9,
		reviewCount: 189,
		education: 'University of Pennsylvania',
		experience: '13+ years',
		languages: 'English',
		bio: "Dr. Taylor is a psychiatrist specializing in mood disorders, anxiety, and trauma. She takes a holistic approach to mental health, combining medication management with therapeutic techniques to support her patients' wellbeing.",
	},
	{
		name: 'Dr. David Nguyen',
		specialty: 'Ophthalmology',
		image: '/placeholder.svg?height=300&width=300',
		rating: 4.7,
		reviewCount: 131,
		education: 'Duke University',
		experience: '16+ years',
		languages: 'English, Vietnamese',
		bio: "Dr. Nguyen is an ophthalmologist with expertise in comprehensive eye care, including the diagnosis and management of eye diseases. He is committed to preserving and improving his patients' vision and eye health.",
	},
];