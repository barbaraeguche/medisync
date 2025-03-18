import { useState } from 'react';
import { Link } from 'react-router-dom'
import { CheckCircle2, HelpCircle } from 'lucide-react';
import { faqs, steps } from '@/lib/homeUIData';
import { Button, Card } from '@/ui';

export default function HowItWorks() {
	const [activeTab, setActiveTab] = useState<'patient' | 'doctor'>('patient');
	
	return (
		<div className={'container mx-auto py-12 px-4'}>
			<div className={'text-center mb-16'}>
				<h1 className={'text-4xl font-bold mb-4'}>How TeleCare Works</h1>
				<p className={'text-xl text-muted-foreground max-w-3xl mx-auto'}>
					Experience healthcare from the comfort of your home with our simple, secure, and convenient telehealth
					platform.
				</p>
			</div>
			
			<div className={'relative mb-20'}>
				<div className={'absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-primary/20 hidden md:block bg-teal-800 rounded-full'}/>
				<div className={'space-y-8 relative'}>
					{steps.map((step, idx) => {
						const Icon = step.icon;
						return (
							<div
								key={idx}
								className={`flex flex-col md:flex-row gap-8 md:gap-16 items-center ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
							>
								<div className={'md:w-1/2 flex justify-center'}>
									<div className={'relative z-10 bg-white dark:bg-gray-950 p-4 rounded-full'}>
										<Icon className={'size-10 text-primary'}/>
									</div>
								</div>
								<div className={'md:w-1/2 text-center md:text-left'}>
									<h2 className={'text-xl font-bold mb-3'}>
										Step {idx + 1}: {step.title}
									</h2>
									<p className={'text-md text-muted-foreground'}>{step.description}</p>
								</div>
							</div>
						);
					})}
				</div>
			</div>
			
			<div className={'bg-muted rounded-xl p-8 mb-20'}>
				<div className={'text-center mb-12'}>
					<h2 className={'text-3xl font-bold mb-4'}>For Patients & Doctors</h2>
					<p className={'text-lg text-muted-foreground max-w-2xl mx-auto'}>
						TeleCare provides a seamless experience for both patients seeking care and healthcare providers delivering
						services.
					</p>
				</div>
				
				<div className={'w-full max-w-lg mx-auto p-1 bg-teal-700/40 rounded-md'}>
					<div data-ontab={activeTab} className={'group grid grid-cols-2'}>
						<Button
							variant={'outline'}
							size={'sm'}
							onClick={() => setActiveTab('patient')}
							className={'border-0 hover:bg-transparent group-data-[ontab=patient]:bg-white group-data-[ontab=patient]:hover:bg-white'}
						>
							For Patient
						</Button>
						<Button
							variant={'outline'}
							size={'sm'}
							onClick={() => setActiveTab('doctor')}
							className={'border-0 hover:bg-transparent group-data-[ontab=doctor]:bg-white group-data-[ontab=doctor]:hover:bg-white'}
						>
							For Doctors
						</Button>
					</div>
				</div>
				
				{activeTab === 'patient' ? (
					<PatientTab/>
				) : (
					<DoctorTab/>
				)}
			</div>
			
			<div className={'mb-20'}>
				<div className={'text-center mb-12'}>
					<h2 className={'text-3xl font-bold mb-4'}>Frequently Asked Questions</h2>
					<p className={'text-lg text-muted-foreground max-w-2xl mx-auto'}>
						Find answers to common questions about telehealth services and how to make the most of your virtual care
						experience.
					</p>
				</div>
				
				<div className={'grid md:grid-cols-2 gap-6 mx-auto w-fit'}>
					{faqs.map((faq, idx) => (
						<Card key={idx}>
							<Card.Header
								title={
									<div className={'flex items-start'}>
										<HelpCircle className={'h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5'}/>
										{faq.question}
									</div>
								}
							/>
							<Card.Content>
								<p>{faq.answer}</p>
							</Card.Content>
						</Card>
					))}
				</div>
			</div>
			
			<div className={'bg-primary/10 rounded-xl p-8 text-center'}>
				<h2 className={'text-3xl font-bold mb-4'}>Ready to Get Started?</h2>
				<p className={'text-lg mb-8 max-w-2xl mx-auto'}>
					Experience the convenience of telehealth with TeleCare. Create an account today and take control of your
					healthcare journey.
				</p>
				<div className={'flex flex-col sm:flex-row gap-4 justify-center'}>
					<Link to={'/auth/register'}>
						<Button size={'lg'}>Create Account</Button>
					</Link>
					<Link to={'/services'}>
						<Button variant={'outline'} size={'lg'} className={'bg-white'}>
							Explore Services
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}

function EntityContent({ entity, entityBenefits }: {
	entity: 'Patient' | 'Doctor',
	entityBenefits: string[]
}) {
	return (
		<div>
			<h3 className={'text-2xl font-bold mb-4'}>{entity} Benefits</h3>
			<ul className={'space-y-4'}>
				{entityBenefits.map((pb) => (
					<li className={'flex items-center'}>
						<CheckCircle2 className={'h-6 w-6 text-primary mr-2 flex-shrink-0 mt-0.5'}/>
						<span>{pb}</span>
					</li>
				))}
			</ul>
			<Link to={'/auth/register'}>
				<Button className={'mt-6'}>
					Create {entity} Account
				</Button>
			</Link>
		</div>
	);
}

function PatientTab() {
	const patientBenefits = [
		'Access healthcare from anywhere, eliminating travel time and costs',
		'Shorter wait times compared to in-person appointments',
		'Secure messaging with your healthcare team between appointments',
		'Digital prescription management and medication reminders',
		'Easy access to your medical records and test results'
	];
	return (
		<div className={'mt-8'}>
			<div className={'grid md:grid-cols-2 gap-8 items-center'}>
				<EntityContent entity={'Patient'} entityBenefits={patientBenefits}/>
				<div className={'relative h-[400px] rounded-lg overflow-hidden'}>
					<img
						src={'/placeholder.svg?height=400&width=600'}
						alt={'Patient using telehealth service'}
						className={'object-cover'}
					/>
				</div>
			</div>
		</div>
	);
}

function DoctorTab() {
	const doctorBenefits = [
		'Flexible scheduling and the ability to see patients from anywhere',
		'Reduced administrative burden with digital documentation',
		'Integrated electronic health records for streamlined care',
		'Secure communication tools for patient follow-up',
		'Expanded patient reach beyond geographical limitations'
	];
	return (
		<div className={'mt-8'}>
			<div className={'grid md:grid-cols-2 gap-8 items-center'}>
				<div className={'order-2 md:order-1 relative h-[400px] rounded-lg overflow-hidden'}>
					<img
						src={'/placeholder.svg?height=400&width=600'}
						alt={'Doctor using telehealth service'}
						className={'object-cover'}
					/>
				</div>
				<div className={'order-1 md:order-2'}>
					<EntityContent entity={'Doctor'} entityBenefits={doctorBenefits}/>
				</div>
			</div>
		</div>
	);
}