export default function AboutUs() {
	return (
		<div className={'container mx-auto py-16 px-4'}>
			<div className={'text-center mb-16'}>
				<h1 className={'text-4xl font-bold mb-4 tracking-tighter'}>About QuantumCare</h1>
				<p className={'text-xl text-muted-foreground max-w-3xl mx-auto'}>
					Revolutionizing healthcare through technology and compassion
				</p>
			</div>
			
			<div className={'grid lg:grid-cols-2 gap-12 items-center mb-16'}>
				<div className={'relative h-fit rounded-lg overflow-hidden'}>
					<img
						loading={'lazy'}
						src={'/about-brain.jpg'}
						alt={'QuantumCare Mission'}
						className={'object-cover shadow-xl lg:grayscale h-[550px]'}
					/>
				</div>
				
				<div className={'space-y-8 text-justify'}>
					<div>
						<h2 className={'text-2xl font-bold mb-4 flex items-center'}>
							<span className={'bg-primary/10 text-primary p-2 rounded-full mr-3'}>01</span>
							Our Mission
						</h2>
						<p className={'text-md'}>
							At QuantumCare, our mission is to democratize access to quality healthcare by leveraging cutting-edge
							technology. We believe that everyone deserves timely, personalized medical attention regardless of their
							location or circumstances. Through our telehealth platform, we're breaking down geographical barriers and
							connecting patients with expert healthcare providers at the touch of a button.
						</p>
					</div>
					
					<div>
						<h2 className={'text-2xl font-bold mb-4 flex items-center'}>
							<span className={'bg-primary/10 text-primary p-2 rounded-full mr-3'}>02</span>
							What We Strive For
						</h2>
						<p className={'text-md'}>
							We strive to create a healthcare ecosystem where technology enhances rather than replaces the human
							connection between patients and providers. Our goal is to make healthcare more accessible, efficient, and
							personalized while maintaining the highest standards of medical care and data privacy. We're committed to
							continuous innovation, ensuring our platform evolves to meet the changing needs of both patients and
							healthcare professionals.
						</p>
					</div>
					
					<div>
						<h2 className={'text-2xl font-bold mb-4 flex items-center'}>
							<span className={'bg-primary/10 text-primary p-2 rounded-full mr-3'}>03</span>
							Why We Started
						</h2>
						<p className={'text-md'}>
							QuantumCare was born from a simple observation: too many people were delaying or foregoing medical care
							due to accessibility challenges. Our founders, a team of healthcare professionals and technology experts,
							witnessed firsthand the gaps in traditional healthcare delivery. They envisioned a future where technology
							could bridge these gaps, making quality healthcare available to everyone. What began as a solution to
							address healthcare disparities has evolved into a comprehensive telehealth platform that's transforming
							how people experience healthcare.
						</p>
					</div>
				</div>
			</div>
			
			<div className={'bg-primary/10 rounded-xl p-8 text-center'}>
				<h2 className={'text-3xl font-bold mb-4'}>Join Us in Transforming Healthcare</h2>
				<p className={'text-lg max-w-3xl mx-auto'}>
					Whether you're a patient seeking convenient care or a healthcare provider looking to expand your reach,
					QuantumCare is building the future of healthcare—one virtual consultation at a time.
				</p>
			</div>
		</div>
	)
}