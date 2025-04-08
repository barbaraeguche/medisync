import { Link } from 'react-router-dom';
import { Calendar, Check, Phone } from 'lucide-react';
import { stats, services, whyChooseUs, checkUpReasons } from '@/lib/placeholders';
import Button from '@/components/ui/button';

export default function HomePage() {
	return (
		<main>
			{/* hero section */}
			<section className={'relative overflow-hidden'}>
				<div className={'absolute inset-0 bg-gradient-to-br from-primary/10 to-teal-600/10 -z-10'}/>
				<div className={'absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-primary/10 to-transparent -z-10'}/>
				<div className={'container px-4 py-20 md:py-32 lg:py-40'}>
					<div className={'grid gap-8 lg:grid-cols-2 lg:gap-12'}>
						<div className={'flex flex-col justify-center space-y-8 animate-fade-in'}>
							<div className={'space-y-4'}>
								<div className={'inline-block rounded-full bg-teal-600/10 px-4 py-1.5 text-sm font-medium text-teal-600'}>
									The Future of Healthcare
								</div>
								<h1 className={'text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl xl:text-7xl'}>
									<span className={'bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent'}>
										Healthcare
									</span>
									<br/>
									at your <i>Fingertips</i>
								</h1>
								<p className={'max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400'}>
									Experience the next generation of medical care. Connect with top healthcare professionals instantly,
									anytime, anywhere.
								</p>
							</div>
							<div className={'flex flex-col gap-4 sm:flex-row'}>
								<Link to={'/book-appointment'}>
									<Button
										size={'lg'}
										className={'bg-gradient-to-r from-primary to-teal-600 hover:opacity-90 group'}
									>
										<Calendar className={'mr-2 h-4 w-4 group-hover:rotate-12 transition-transform'}/>
										Book Consultation
									</Button>
								</Link>
								<Button
									size={'lg'}
									variant={'outline'}
									className={'border-primary hover:bg-primary/10'}
								>
									Learn More
								</Button>
							</div>
							<div className={'grid grid-cols-3 gap-4 pt-8'}>
								{stats.map((stat) => (
									<div
										key={stat.title}
										className={'space-y-2'}
									>
										<div className={'text-3xl font-bold bg-gradient-to-r from-primary to-teal-600 bg-clip-text text-transparent'}>
											{stat.value}
										</div>
										<p className={'text-sm text-gray-500 dark:text-gray-400'}>{stat.title}</p>
									</div>
								))}
							</div>
						</div>
						<div className={'relative lg:mt-0'}>
							<div className={'absolute inset-0 bg-gradient-to-tr from-primary to-teal-600 rounded-full blur-3xl opacity-20'}/>
							<img
								src={'/placeholder.svg?height=600&width=600'}
								alt={'Telehealth consultation'}
								className={'relative rounded-2xl object-cover shadow-2xl'}
							/>
						</div>
					</div>
				</div>
			</section>
			
			{/* services */}
			<section id={'services'}
			         className={'relative py-20 md:py-32'}
			>
				<div className={'absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10'}/>
				<div className={'container px-4'}>
					<div className={'flex flex-col items-center justify-center space-y-4 text-center mb-12'}>
						<div className={'inline-block rounded-full bg-teal-600/10 px-4 py-1.5 text-sm font-medium text-teal-600'}>
							Our Services
						</div>
						<h2 className={'text-3xl font-bold tracking-tighter sm:text-5xl'}>Comprehensive Care Solutions</h2>
						<p className={'max-w-[900px] text-gray-500 md:text-xl/relaxed dark:text-gray-400'}>
							Expert healthcare services tailored to your needs
						</p>
					</div>
					<div className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}>
						{services.slice(0, 6).map((service) => {
							const Icon = service.icon;
							
							return (
								<div
									key={service.title}
									className={'group relative overflow-hidden rounded-2xl bg-gradient-to-b from-primary/5 via-background to-background p-1'}
								>
									<div className={'absolute inset-0 bg-gradient-to-b from-primary/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity'}/>
									<div className={'relative space-y-4 p-6'}>
										<div className={'inline-flex items-center justify-center rounded-xl bg-primary/10 p-3 group-hover:bg-primary/20 transition-colors'}>
											<Icon className={'h-6 w-6 text-teal-600'}/>
										</div>
										<h3 className={'text-xl font-bold'}>{service.title}</h3>
										<p className={'text-gray-500 dark:text-gray-400'}>{service.description.min}</p>
										<Link
											to={service.link}
											className={'inline-flex items-center text-teal-600 hover:text-teal-600 transition-colors'}
										>
											Learn more →
										</Link>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			
			{/* why choose us */}
			<section className={'relative py-20 md:py-32 bg-gradient-to-b from-background to-primary/5'}>
				<div className={'container px-4'}>
					<div className={'flex flex-col items-center justify-center space-y-4 text-center mb-12'}>
						<div className={'inline-block rounded-full bg-teal-600/10 px-4 py-1.5 text-sm font-medium text-teal-600'}>
							Why Choose Quantum Care
						</div>
						<h2 className={'text-3xl font-bold tracking-tighter sm:text-5xl'}>Revolutionizing Healthcare Access</h2>
						<p className={'max-w-[800px] text-gray-500 md:text-xl/relaxed dark:text-gray-400'}>
							Experience the future of healthcare with our cutting-edge telehealth platform
						</p>
					</div>
					<div className={'grid gap-8 md:grid-cols-2 lg:grid-cols-3'}>
						{whyChooseUs.map((reason, idx) => {
							const Icon = reason.icon;
							
							return (
								<div
									key={idx}
									className={'flex flex-col items-center text-center space-y-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg transition-transform hover:scale-105'}
								>
									<div className={'p-3 bg-primary/10 rounded-full'}>
										<Icon className={'h-8 w-8 text-teal-600'}/>
									</div>
									<h3 className={'text-xl font-bold'}>{reason.title}</h3>
									<p className={'text-gray-500 dark:text-gray-400'}>{reason.description}</p>
								</div>
							);
						})}
					</div>
				</div>
			</section>
			
			{/* why health matters */}
			<section className={'relative py-20 md:py-32 bg-gradient-to-t from-teal-600/10 to-background'}>
				<div className={'container px-4'}>
					<div className={'flex flex-col lg:flex-row items-center gap-12'}>
						<div className={'lg:w-1/2 space-y-6'}>
							<div className={'inline-block rounded-full bg-teal-600/10 px-4 py-1.5 text-sm font-medium text-teal-600'}>
								Health Matters
							</div>
							<h2 className={'text-3xl font-bold tracking-tighter sm:text-5xl'}>Why Regular Check-ups are Crucial</h2>
							<p className={'text-gray-500 dark:text-gray-400 text-lg'}>
								Regular health check-ups are essential for maintaining your well-being and catching potential issues
								early. With QuantumCare, staying on top of your health has never been easier.
							</p>
							<ul className={'space-y-4'}>
								{checkUpReasons.map((reason, idx) => (
									<li
										key={idx}
										className={'flex items-start space-x-3'}
									>
										<div className={'shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center'}>
											<Check className={'w-4 h-4 text-teal-600'}/>
										</div>
										<span className={'text-gray-700 dark:text-gray-300'}>{reason}</span>
									</li>
								))}
							</ul>
							<Link to={'/book-appointment'}>
								<Button
									size={'lg'}
									className={'bg-gradient-to-r from-primary to-teal-600 hover:opacity-90'}
								>
									Schedule Your Check-up
								</Button>
							</Link>
						</div>
						<div className={'lg:w-1/2 relative'}>
							<div className={'absolute inset-0 bg-gradient-to-tr from-primary to-teal-600 rounded-2xl blur-2xl opacity-20 transform rotate-3'}/>
							<img
								src={'/placeholder.svg?height=600&width=600'}
								alt={'Doctor consultation'}
								className={'relative rounded-2xl object-cover shadow-2xl'}
							/>
						</div>
					</div>
				</div>
			</section>
			
			{/* cta */}
			<section className={'relative py-20 md:py-32'}>
				<div className={'absolute inset-0 bg-gradient-to-r from-primary to-teal-600 opacity-90'}/>
				<div className={'relative container px-4'}>
					<div className={'flex flex-col items-center space-y-8 text-center text-white'}>
						<h2 className={'text-3xl font-bold tracking-tighter sm:text-5xl'}>
							Ready to Transform Your Healthcare Experience?
						</h2>
						<p className={'mx-auto max-w-[600px] text-primary-foreground/90 md:text-xl'}>
							Join thousands of satisfied patients who have chosen our telehealth platform.
						</p>
						<div className={'flex flex-col gap-4 sm:flex-row'}>
							<Link to={'/contact'}>
								<Button
									size={'lg'}
									variant={'secondary'}
									className={'bg-white text-teal-600 hover:bg-white/90 group'}
								>
									<Phone className={'mr-2 h-4 w-4 group-hover:rotate-6'}/>
									Schedule a Call
								</Button>
              </Link>
							<Button
								size={'lg'}
								variant={'outline'}
								className={'border-white text-white hover:bg-white/10'}
							>
								View Pricing
							</Button>
						</div>
					</div>
				</div>
			</section>
		</main>
	);
}