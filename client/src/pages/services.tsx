import { ReactNode } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Check, type LucideIcon } from 'lucide-react';
import { ServiceType } from '@/lib/types';
import { additionalServices, services } from '@/lib/placeholders';
import { Button, Card } from '@/components/ui';

export default function Services() {
	const { serviceType } = useParams();
	const foundService = serviceType
		? services.find((service) => service.link.includes(serviceType))
		: undefined;
	
	return (
		<div className={'container max-w-7xl mx-auto py-12 px-4'}>
			<div className={'text-center mb-16'}>
				<h1 className={'text-4xl font-bold mb-4 tracking-tighter'}>Our Medical Services</h1>
				<p className={'text-xl text-muted-foreground max-w-3xl mx-auto'}>
					Quantum Care offers a comprehensive range of telehealth services across multiple specialties, providing quality
					healthcare from the comfort of your home.
				</p>
			</div>
			
			{!serviceType ? (
				<AllServices services={services}/>
			) : foundService
				? (
					<SingleService service={foundService}/>
				) : undefined}
			
			<div className={'mt-20'}>
				<h2 className={'text-3xl font-bold text-center mb-12'}>Additional Services</h2>
				<div className={'grid md:grid-cols-2 lg:grid-cols-3 gap-6'}>
					{additionalServices.map((addService, idx) => (
						<Card key={idx}>
							<Card.Header
								title={addService.title}
								description={addService.description}
							/>
							<Card.Content>
								<p>
									{addService.content}
								</p>
							</Card.Content>
						</Card>
					))}
				</div>
			</div>
			
			<div className={'mt-20 text-center'}>
				<h2 className={'text-3xl font-bold mb-6'}>Need Something Else?</h2>
				<p className={'text-lg mb-8 max-w-2xl mx-auto'}>
					If you don't see the service you're looking for, please contact us. Our team is continuously expanding our
					offerings to meet your healthcare needs.
				</p>
				<Link to={'/contact'}>
					<Button size={'lg'}>
						Contact Us
					</Button>
				</Link>
			</div>
		</div>
	);
}

function ServiceBase({ title, children }: {
	title: ServiceType['title'],
	children: ReactNode
}) {
	return (
		<div
			key={title}
			className={'group relative overflow-hidden rounded-2xl bg-gradient-to-b from-primary/5 via-background to-background p-1 w-fit'}
		>
			<div className={'absolute inset-0 bg-gradient-to-b from-primary/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity'}/>
			<div className={'relative p-6'}>
				{children}
			</div>
		</div>
	);
}
function ServiceList({ servicesOffered }: {
	servicesOffered: ServiceType['servicesOffered']
}) {
	return (
		<>
			<h3 className={'text-md font-semibold mb-4'}>Services Include:</h3>
			<ul className={'space-y-2'}>
				{servicesOffered.map((reason, idx) => (
					<li
						key={idx}
						className={'flex items-start space-x-3'}
					>
						<div className={'shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center'}>
							<Check className={'w-4 h-4 text-teal-600'}/>
						</div>
						<span className={'text-gray-700'}>{reason}</span>
					</li>
				))}
			</ul>
		</>
	);
}

function ServiceIcon({ icon }: {
	icon: LucideIcon
}) {
	const Icon = icon;
	return (
		<div className={'inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors'}>
			<Icon className={'h-6 w-6 text-teal-600'}/>
		</div>
	);
}
function ServiceCTAButton() {
	return (
		<div className={'mt-4'}>
			<Link to={'/book-appointment'}>
				<Button className={'w-full'}>
					Book Appointment
				</Button>
			</Link>
    </div>
  );
}


function AllServices({ services }: {
	services: ServiceType[]
}) {
	return (
		<div className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}>
			{services.map((service, idx) => (
				<ServiceBase key={idx} title={service.title}>
					<ServiceIcon icon={service.icon}/>
					<h3 className={'text-xl font-bold mt-4'}>{service.title}</h3>
					<p className={'text-gray-500 mt-4 mb-6'}>{service.description.exp}</p>
					
					<ServiceList servicesOffered={service.servicesOffered}/>
					<ServiceCTAButton/>
				</ServiceBase>
			))}
		</div>
	);
}
function SingleService({ service }: {
	service: ServiceType
}) {
	return (
		<div className={'mx-auto w-[90vw] max-w-3xl'}>
			<ServiceBase title={service.title}>
				<div className={'md:grid md:grid-cols-2 gap-12'}>
					<div>
						<ServiceIcon icon={service.icon}/>
						<h3 className={'text-xl font-bold mt-4'}>{service.title}</h3>
						<p className={'text-gray-500 mt-4 mb-6'}>{service.description.exp}</p>
					</div>
					<div>
						<ServiceList servicesOffered={service.servicesOffered}/>
					</div>
				</div>
				<div className={'mt-8'}>
					<ServiceCTAButton/>
				</div>
			</ServiceBase>
		</div>
	);
}