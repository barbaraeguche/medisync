import { Link } from 'react-router-dom';
import { Cookie } from 'lucide-react';
import { Button } from '@/components/ui';

export default function Cookies() {
	return (
		<div className={'container max-w-4xl mx-auto py-12 px-4 text-justify'}>
			<div className={'flex items-center gap-2 mb-8'}>
				<Cookie className={'size-6 text-primary'}/>
				<h1 className={'text-3xl font-bold'}>Cookie Policy</h1>
			</div>
			
			<div className={'prose prose-slate max-w-none'}>
				<p className={'text-lg text-muted-foreground mb-8'}>Last updated: March 15, 2025</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-4'}>1. Introduction</h2>
				<p>
					This Cookie Policy explains how QuantumCare uses cookies and similar technologies to recognize you when you visit
					our website and use our services. It explains what these technologies are and why we use them, as well as your
					rights to control our use of them.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-4'}>2. What Are Cookies?</h2>
				<p>
					Cookies are small data files that are placed on your computer or mobile device when you visit a website.
					Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well as
					to provide reporting information.
				</p>
				<p>
					Cookies set by the website owner (in this case, QuantumCare) are called 'first-party cookies.' Cookies set by
					parties other than the website owner are called 'third-party cookies.' Third-party cookies enable third-party
					features or functionality to be provided on or through the website (e.g., advertising, interactive content,
					and analytics).
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-4'}>3. Types of Cookies We Use</h2>
				
				<h3 className={'text-xl font-medium mt-6 mb-3'}>3.1 Essential Cookies</h3>
				<p>
					These cookies are necessary for the website to function and cannot be switched off in our systems. They are
					usually only set in response to actions made by you which amount to a request for services, such as setting
					your privacy preferences, logging in, or filling in forms. You can set your browser to block or alert you
					about these cookies, but some parts of the site will not work.
				</p>
				
				<h3 className={'text-xl font-medium mt-6 mb-3'}>3.2 Performance Cookies</h3>
				<p>
					These cookies allow us to count visits and traffic sources so we can measure and improve the performance of
					our site. They help us to know which pages are the most and least popular and see how visitors move around the
					site. All information these cookies collect is aggregated and therefore anonymous.
				</p>
				
				<h3 className={'text-xl font-medium mt-6 mb-3'}>3.3 Functionality Cookies</h3>
				<p>
					These cookies enable the website to provide enhanced functionality and personalization. They may be set by us
					or by third-party providers whose services we have added to our pages. If you do not allow these cookies, then
					some or all of these services may not function properly.
				</p>
				
				<h3 className={'text-xl font-medium mt-6 mb-3'}>3.4 Targeting Cookies</h3>
				<p>
					These cookies may be set through our site by our advertising partners. They may be used by those companies to
					build a profile of your interests and show you relevant advertisements on other sites. They do not store
					directly personal information but are based on uniquely identifying your browser and internet device.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-4'}>4. How to Manage Cookies</h2>
				<p>
					You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access
					cookies. If you disable or refuse cookies, please note that some parts of this website may become inaccessible
					or not function properly.
				</p>
				<p>
					Most web browsers allow some control of most cookies through the browser settings. To find out more about
					cookies, including how to see what cookies have been set, visit{' '}
					<a
						href={'https://www.allaboutcookies.org'}
						target={'_blank'}
						rel={'noopener noreferrer'}
						className={'text-teal-800 underline underline-offset-2'}
					>
						www.allaboutcookies.org
					</a>
					.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-4'}>5. Cookie Preferences</h2>
				<p>
					When you first visit our website, we will present you with a cookie consent banner that allows you to accept
					or decline non-essential cookies. You can change your cookie preferences at any time by clicking on the
					'Cookie Settings' link in the footer of our website.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-4'}>6. Changes to This Cookie Policy</h2>
				<p>
					We may update this Cookie Policy from time to time in order to reflect changes to the cookies we use or for
					other operational, legal, or regulatory reasons. Please revisit this Cookie Policy regularly to stay informed
					about our use of cookies and related technologies.
				</p>
				
				<h2 className={'text-2xl font-semibold mt-8 mb-4'}>7. Contact Us</h2>
				<p>If you have any questions about our use of cookies or this Cookie Policy, please contact us at:</p>
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
				<Link to={'/privacy'}>
					<Button variant={'outline'}>Privacy Policy</Button>
				</Link>
				<Link to={'/'}>
					<Button>Return Home</Button>
				</Link>
			</div>
		</div>
	);
}