import { Link } from 'react-router-dom';
import { Button, Card } from '@/ui';
import { 
	Mail, Phone, MapPin, Clock, MessageSquare, HelpCircle
} from 'lucide-react';

export default function Contact() {
	return (
		<div className={'container max-w-7xl mx-auto py-12 px-4 text-justify'}>
			<div className={'text-center mb-16'}>
				<h1 className={'text-4xl font-bold mb-4'}>Contact Us</h1>
				<p className={'text-xl text-muted-foreground max-w-3xl mx-auto'}>
					Have questions or need assistance? Our team is here to help you with any inquiries about our telehealth
					services.
				</p>
			</div>
			
			<div className={'grid md:grid-cols-2 gap-12 items-center mb-16'}>
				<div>
					<h2 className={'text-3xl font-bold mb-8'}>Get in Touch</h2>
					
					<div className={'space-y-8'}>
						<div className={'flex items-start'}>
							<div className={'bg-primary/10 p-3 rounded-full mr-4'}>
								<Mail className={'size-6 text-primary'}/>
							</div>
							<div>
								<h3 className={'text-xl font-semibold mb-1'}>Email Us</h3>
								<p className={'text-muted-foreground mb-2'}>For general inquiries and support</p>
								<a href={'mailto:contact@quantum-care.ca'} className={'text-teal-800 underline underline-offset-2 font-medium'}>
									contact@quantum-care.ca
								</a>
							</div>
						</div>
						
						<div className={'flex items-start'}>
							<div className={'bg-primary/10 p-3 rounded-full mr-4'}>
								<Phone className={'size-6 text-primary'}/>
							</div>
							<div>
								<h3 className={'text-xl font-semibold mb-1'}>Call Us</h3>
								<p className={'text-muted-foreground mb-2'}>Speak directly with our support team</p>
								<a href={'tel:+18005551234'} className={'text-teal-800 underline underline-offset-2 font-medium'}>
									+1 (800) 555-1234
								</a>
							</div>
						</div>
						
						<div className={'flex items-start'}>
							<div className={'bg-primary/10 p-3 rounded-full mr-4'}>
								<MapPin className={'size-6 text-primary'}/>
							</div>
							<div>
								<h3 className={'text-xl font-semibold mb-1'}>Visit Our Office</h3>
								<p className={'text-muted-foreground mb-2'}>Our headquarters location</p>
								<address className={'not-italic'}>
									123 Health Street
									<br/>
									Vieux Medical, QC W4X 1U8
									<br/>
									Canada
								</address>
							</div>
						</div>
						
						<div className={'flex items-start'}>
							<div className={'bg-primary/10 p-3 rounded-full mr-4'}>
								<Clock className={'size-6 text-primary'}/>
							</div>
							<div>
								<h3 className={'text-xl font-semibold mb-1'}>Hours of Operation</h3>
								<p className={'text-muted-foreground mb-2'}>When you can reach our team</p>
								<div className={'grid grid-cols-2 gap-x-4'}>
									<div>Monday - Saturday:</div>
									<div>8:00 AM - 8:00 PM EST</div>
									<div>Sunday:</div>
									<div>Closed</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				
				<div className={'relative h-[400px] rounded-lg overflow-hidden'}>
					<img
						src={'/placeholder.svg?height=400&width=600'}
						alt={'Quantum Care Office Location'}
						className={'relative rounded-2xl object-cover shadow-2xl'}
					/>
					<div className={'absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end'}>
						<div className={'p-6 text-white'}>
							<h3 className={'text-xl font-semibold mb-1'}>Quantum Care Headquarters</h3>
							<p>123 Health Street, Medical City</p>
						</div>
					</div>
				</div>
			</div>
			
			<div className={'grid md:grid-cols-3 gap-6 mb-16'}>
				<Card>
					<Card.Header
						title={
							<div className={'flex items-center'}>
								<MessageSquare className={'size-5 text-primary mr-2'}/>
								24/7 Virtual Support
							</div>
						}
						description={'For urgent medical questions'}
					/>
					<Card.Content>
						<p className={'mb-4'}>
							Our virtual support team is available 24/7 for urgent medical questions through our telehealth platform.
						</p>
						<Link to={'/auth/signin'}>
							<Button variant={'outline'} className={'w-full'}>
								Log in for Support
							</Button>
						</Link>
					</Card.Content>
				</Card>
				
				<Card>
					<Card.Header
						title={
							<div className={'flex items-center'}>
								<HelpCircle className='size-5 text-primary mr-2'/>
								Frequently Asked Questions
							</div>
						}
						description={'Find quick answers to common questions'}
					/>
					<Card.Content>
						<p className='mb-4'>
							Browse our comprehensive FAQ section for answers to common questions about our services, billing, and
							more.
						</p>
						<Link to={'/how-it-works#faq'}>
							<Button variant={'outline'} className={'w-full'}>
								View FAQs
							</Button>
						</Link>
					</Card.Content>
				</Card>
				
				<Card>
					<Card.Header
						title={
							<div className={'flex items-center'}>
								<Mail className={'size-5 text-primary mr-2'}/>
								Media Inquiries
							</div>
						}
						description={'For press and partnership opportunities'}
					/>
					<Card.Content>
						<p className={'mb-4'}>
							For media inquiries, partnership opportunities, or speaking engagements, please contact our PR team.
						</p>
						<a href={'mailto:media@Quantum Care.example.com'} className={'text-teal-800 underline underline-offset-2 font-medium'}>
							media@Quantum Care.example.com
						</a>
					</Card.Content>
				</Card>
			</div>
			
			<div className={'bg-primary/10 rounded-xl p-8 text-center'}>
				<h2 className={'text-3xl font-bold mb-4'}>Need Immediate Medical Attention?</h2>
				<p className={'text-lg mb-8 max-w-2xl mx-auto'}>
					Our telehealth service is not intended for medical emergencies. If you are experiencing a medical emergency,
					please dial 911 or go to your nearest emergency room immediately.
				</p>
				<Link to={'/services'}>
					<Button size={'lg'}>Explore Our Services</Button>
				</Link>
			</div>
		</div>
	);
}