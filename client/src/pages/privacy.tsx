import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { Button } from '@/components/ui';

export default function Privacy() {
	return (
		<div className={'container max-w-4xl mx-auto py-12 px-4 text-justify'}>
			<div className={'flex items-center gap-2 mb-8'}>
				<Shield className={'size-6 text-primary'}/>
				<h1 className={'text-3xl font-bold'}>Privacy Policy</h1>
			</div>
			
			<div className={'prose prose-slate max-w-none'}>
				<p className={'text-lg text-muted-foreground mb-8'}>Last updated: March 15, 2025</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>1. Introduction</h2>
				<p>
					At QuantumCare, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
					safeguard your information when you use our telehealth platform. Please read this policy carefully to
					understand our practices regarding your personal data.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>2. Information We Collect</h2>
				
				<h3 className={'text-xl font-medium mt-6 mb-3'}>2.1 Personal Information</h3>
				<p>We may collect personal information that you provide directly to us, including:</p>
				<ul className={'list-disc pl-6 mb-2'}>
					<li>Contact information (name, email address, phone number)</li>
					<li>Date of birth and demographic information</li>
					<li>Medical history and health information</li>
					<li>Insurance information</li>
					<li>Payment details</li>
					<li>Communications with healthcare providers</li>
				</ul>
				
				<h3 className={'text-xl font-medium mt-6 mb-3'}>2.2 Automatically Collected Information</h3>
				<p>When you access or use our Service, we may automatically collect certain information, including:</p>
				<ul className={'list-disc pl-6 mb-2'}>
					<li>Device information (IP address, browser type, operating system)</li>
					<li>Usage data (pages visited, time spent on pages)</li>
					<li>Location information</li>
					<li>Cookies and similar tracking technologies</li>
				</ul>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>3. How We Use Your Information</h2>
				<p>We use the information we collect for various purposes, including:</p>
				<ul className={'list-disc pl-6 mb-2'}>
					<li>Providing and maintaining our telehealth services</li>
					<li>Processing and completing transactions</li>
					<li>Facilitating communication between patients and healthcare providers</li>
					<li>Improving and personalizing our Service</li>
					<li>Sending appointment reminders and service-related notifications</li>
					<li>Analyzing usage patterns and trends</li>
					<li>Complying with legal obligations</li>
				</ul>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>4. HIPAA Compliance</h2>
				<p>
					As a healthcare service provider, we are committed to complying with the Health Insurance Portability and
					Accountability Act (HIPAA). We implement appropriate physical, technical, and administrative safeguards to
					protect the confidentiality, integrity, and availability of your protected health information (PHI).
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>5. Information Sharing</h2>
				<p>We may share your information in the following circumstances:</p>
				<ul className={'list-disc pl-6 mb-2'}>
					<li>With healthcare providers involved in your care</li>
					<li>With third-party service providers who perform services on our behalf</li>
					<li>With your insurance provider for billing purposes</li>
					<li>When required by law or to protect our rights</li>
					<li>In connection with a business transaction, such as a merger or acquisition</li>
				</ul>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>6. Your Rights and Choices</h2>
				<p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
				<ul className={'list-disc pl-6 mb-2'}>
					<li>Accessing and updating your information</li>
					<li>Requesting deletion of your data</li>
					<li>Opting out of certain data collection or use</li>
					<li>Data portability</li>
					<li>Withdrawing consent</li>
				</ul>
				<p>To exercise these rights, please contact us using the information provided in the 'Contact Us' section.</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>7. Data Security</h2>
				<p>
					We implement appropriate security measures to protect your personal information from unauthorized access,
					alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
					storage is 100% secure, and we cannot guarantee absolute security.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>8. Children's Privacy</h2>
				<p>
					Our Service is not directed to children under the age of 13. We do not knowingly collect personal information
					from children under 13. If you are a parent or guardian and believe that your child has provided us with
					personal information, please contact us.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>9. Changes to This Privacy Policy</h2>
				<p>
					We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
					Privacy Policy on this page and updating the 'Last updated' date. You are advised to review this Privacy
					Policy periodically for any changes.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>10. Contact Us</h2>
				<p>If you have any questions about this Privacy Policy, please contact us at:</p>
				<p className={'mb-8'}>
					<strong>Email:</strong> privacy@quantumcare.ca
					<br/>
					<strong>Address:</strong> 123 Health Street, Vieux Medical, QC W4X 1U8
				</p>
			</div>
			
			<div className={'mt-12 flex flex-col sm:flex-row gap-4'}>
				<Link to={'/terms'}>
					<Button variant={'outline'}>Terms of Service</Button>
				</Link>
				<Link to={'/cookies'}>
					<Button variant={'outline'}>Cookie Policy</Button>
				</Link>
				<Link to={'/client/public'}>
					<Button>Return Home</Button>
				</Link>
			</div>
		</div>
	);
}