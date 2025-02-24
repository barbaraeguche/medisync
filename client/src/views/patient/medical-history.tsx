import { useState } from 'react';
import { formatDate } from '@/utils/utils';
import { MedicalHistory as MedicalHistoryType } from '@/lib/definitions';
import { Card, Pagination, Accordion } from '@/ui/index';

export default function MedicalHistory({ medicalHistory }: {
	medicalHistory: MedicalHistoryType[]
}) {
	const [currentPage, setCurrentPage] = useState<number>(1);
	const itemsPerPage = 3;

	const paginatedHistory = medicalHistory.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<Card className={'max-w-[800px]'}>
			<div className={'flex justify-between m-0'}>
				<Card.Header title={'Medical History'}/>
				<Pagination
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalItems={medicalHistory.length}
				/>
			</div>

			<Card.Content className={'space-y-4 overflow-y-auto'}>
				{paginatedHistory.map((history) => (
					<Card
						key={history._id}
						className={'max-w-full bg-white border'}
					>
						<Card.Content>
							{/* header */}
							<div className={'text-sm font-medium flex justify-between items-center'}>
								<span className={'text-gray-500'}>Medical Record</span>
								<span className={'text-gray-500'}>ID: {history._id}</span>
							</div>
	
							<div className={'space-y-6'}>
								{/* diagnosis */}
								<div>
									<h4 className={'font-semibold mb-2'}>Diagnosis Information</h4>
									<div className={'grid grid-cols-2 gap-4'}>
										<div>
											<p className={'text-sm text-gray-500'}>Diagnosis</p>
											<p>{history.diagnosis}</p>
										</div>
										<div>
											<p className={'text-sm text-gray-500'}>Diagnosis Date</p>
											<p>{formatDate(history.diagnosisDate, 'MMM, dd yyyy')}</p>
										</div>
									</div>
								</div>
	
								{/* medication */}
								<div>
									<h4 className={'font-semibold'}>Medications</h4>
									{history.medications?.length ? (
										<Medications history={history}/>
									) : (
										<p className={'text-sm '}>No medication prescribed.</p>
									)}
								</div>
							</div>
						</Card.Content>
					</Card>
				))}
			</Card.Content>
		</Card>
	);
}

function Medications({ history }: {
	history: MedicalHistoryType
}) {
	return (
		<Accordion type={'single'} collapsible>
			{history.medications!.map((med, idx) => (
				<Accordion.Item
					key={idx}
					value={`medication${idx}`}
				>
					<Accordion.Button>
						<div className={'flex justify-between items-center w-full pr-4'}>
							<span className={'font-medium'}>{med.drugName}</span>
							<span className={'text-sm text-gray-500'}>{med.dosage}</span>
						</div>
          </Accordion.Button>
					<Accordion.Content>
						<div className={'grid grid-cols-2 gap-4 p-4'}>
							<div>
								<p className={'text-sm text-gray-500'}>Drug Name</p>
								<p className={'font-medium'}>{med.drugName}</p>
							</div>
							<div>
								<p className={'text-sm text-gray-500'}>Dosage</p>
								<p className={'font-medium'}>{med.dosage}</p>
							</div>
							<div>
								<p className={'text-sm text-gray-500'}>Frequency</p>
								<p className={'font-medium'}>{med.frequency}</p>
							</div>
							<div>
								<p className={'text-sm text-gray-500'}>Duration</p>
								<p className={'font-medium'}>{med.duration}</p>
							</div>
						</div>
					</Accordion.Content>
				</Accordion.Item>
			))}
		</Accordion>
	);
}