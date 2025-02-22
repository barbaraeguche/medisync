import {
	Eye, Ear, Brain, Trees, Stethoscope, Clock, Smartphone, Users, Zap, Shield, TrendingUp
} from 'lucide-react';

export const stats = [
	{ title: "Active Patients", value: "10,000+" },
	{ title: "Specialists", value: "100+" },
	{ title: "Satisfaction", value: "98%" }
];

export const services = [
	{ title: "Eye Care", description: "Expert ophthalmology consultations with state-of-the-art virtual diagnostics.", icon: Eye, link: "/services/eye-care" },
	{ title: "ENT Care", description: "Specialized ear, nose, and throat care from leading specialists.", icon: Ear, link: "/services/ent-care" },
	{ title: "Neurology", description: "Advanced neurological consultations and follow-ups.", icon: Brain, link: "/services/neurology" },
	{ title: "Pulmonology", description: "Comprehensive respiratory care and treatment plans.", icon: Trees, link: "/services/pulmonology" },
	{ title: "General Medicine", description: "Primary care consultations for various health concerns.", icon: Stethoscope, link: "/services/general-medicine" },
	{ title: "24/7 Support", description: "Round-the-clock medical assistance and emergency consultations.", icon: Clock, link: "/services/support" },
];

export const whyChooseUs = [
	{ icon: Clock, title: "24/7 Availability", description: "Access healthcare professionals around the clock, whenever you need them." },
	{ icon: Smartphone, title: "Convenient Access", description: "Connect with doctors from the comfort of your home, office, or anywhere." },
	{ icon: Users, title: "Expert Specialists", description: "Consult with a diverse range of experienced healthcare specialists." },
	{ icon: Zap, title: "Quick Response", description: "Get rapid responses and reduce waiting times for consultations." },
	{ icon: Shield, title: "Secure & Private", description: "Your health information is protected with state-of-the-art security measures." },
	{ icon: TrendingUp, title: "Continuous Care", description: "Enjoy seamless follow-ups and ongoing care management." }
];

export const checkUpReasons = [
	"Early detection of health issues",
	"Reduced risk of complications",
	"Updated health records for better care",
	"Personalized health advice",
	"Peace of mind and reduced anxiety",
];

export const footerLinks = [
	{
		title: "Product",
		links: [
			{ title: "Features", href: "#" }, { title: "Pricing", href: "#" }, { title: "Services", href: "#" }
		]
	},
	{
		title: "Company",
		links: [
			{ title: "About", href: "#" }, { title: "Careers", href: "#" }, { title: "Contact", href: "#" }
		]
	},
	{
		title: "Resources",
		links: [
			{ title: "Blog", href: "#" }, { title: "Support", href: "#" }, { title: "Documentation", href: "#" }
		]
	}
];