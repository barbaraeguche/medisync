import { Link } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { Button } from '@/ui';

export default function TermsOfService() {
	return (
		<div className={'container max-w-4xl mx-auto py-12 px-4 text-justify'}>
			<div className={'flex items-center gap-2 mb-8'}>
				<FileText className={'size-6 text-primary'}/>
				<h1 className={'text-3xl font-bold'}>Terms of Service</h1>
			</div>
			
			<div className={'prose prose-slate max-w-none'}>
				<p className={'text-lg text-muted-foreground mb-8'}>Last updated: March 15, 2025</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>1. Introduction</h2>
				<p>
					Welcome to QuantumCare. These Terms of Service govern your use of our website, mobile application, and services.
					By accessing or using QuantumCare, you agree to be bound by these Terms. If you disagree with any part of the
					terms, you may not access our services.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>2. Definitions</h2>
				<p>
					<strong>'Service'</strong> refers to the QuantumCare website, mobile application, and telehealth services.
				</p>
				<p>
					<strong>'User'</strong> refers to individuals who access or use our Service, including patients and healthcare
					providers.
				</p>
				<p>
					<strong>'Content'</strong> refers to information, text, graphics, or other materials uploaded, downloaded, or
					appearing on the Service.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>3. Use of Service</h2>
				<p>
					QuantumCare provides a platform for telehealth consultations and healthcare management. Our Service is not
					intended to replace in-person medical care and should not be used in emergency situations. If you are
					experiencing a medical emergency, please call your local emergency services immediately.
				</p>
				<p>
					You are responsible for maintaining the confidentiality of your account information and for all activities
					that occur under your account.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>4. Medical Disclaimer</h2>
				<p>
					The information provided through our Service is for general informational purposes only and is not intended as
					medical advice. Always consult with a qualified healthcare provider regarding any medical conditions or
					treatments.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>5. Privacy</h2>
				<p>
					Your privacy is important to us. Our{' '}
					<Link to={'/privacy'} className={'text-teal-800 underline underline-offset-2'}>
						Privacy Policy
					</Link>{' '}
					explains how we collect, use, and protect your personal information. By using our Service, you consent to our
					collection and use of information as described in our Privacy Policy.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>6. User Content</h2>
				<p>
					You retain all rights to any content you submit, post, or display on or through the Service. By submitting
					content, you grant QuantumCare a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and
					distribute your content for the purpose of providing and improving our Service.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>7. Termination</h2>
				<p>
					We may terminate or suspend your account and access to the Service immediately, without prior notice or
					liability, for any reason, including breach of these Terms. Upon termination, your right to use the Service
					will cease immediately.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>8. Limitation of Liability</h2>
				<p>
					To the maximum extent permitted by law, QuantumCare shall not be liable for any indirect, incidental, special,
					consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or
					indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of our
					Service.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>9. Changes to Terms</h2>
				<p>
					We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide
					at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be
					determined at our sole discretion.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-2'}>10. Contact Us</h2>
				<p>If you have any questions about these Terms, please contact us at:</p>
				<p className={'mb-8'}>
					<strong>Email:</strong> legal@quantumcare.ca
					<br/>
					<strong>Address:</strong> 123 Health Street, Vieux Medical, QC W4X 1U8
				</p>
			</div>
			
			<div className={'mt-12 flex flex-col sm:flex-row gap-4'}>
				<Link to={'/privacy'}>
					<Button variant={'outline'}>Privacy Policy</Button>
				</Link>
				<Link to={'/cookies'}>
					<Button variant={'outline'}>Cookie Policy</Button>
				</Link>
				<Link to={'/'}>
					<Button>Return Home</Button>
				</Link>
			</div>
		</div>
	);
}