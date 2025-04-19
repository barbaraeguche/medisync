import { useState } from 'react';
import { useAppSelector } from '@/hooks/useAppDispatch';
import { formatDate } from '@/utils/utils';
import { MMM_comma_dd_yyyy } from '@/utils/constants';
import { MedicalHistory as MedicalHistoryType } from '@/lib/definitions';
import { Card, Pagination, Accordion } from '@/components/ui';

export default function MedicalHistory() {
	const itemsPerPage = 3;
	const [currentPage, setCurrentPage] = useState(1);
	const { medicalHistory } = useAppSelector((state) => state.patientSlice.patient);
	
	const paginatedHistory = (medicalHistory ?? []).slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	return (
		<Card className={'max-w-[800px]'}>
			<div className={'flex justify-between m-0'}>
				<Card.Header title={medicalHistory?.length === 0 ? 'No Medical History' : 'Medical History'}/>
				<Pagination
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalItems={(medicalHistory ?? []).length}
				/>
			</div>

			<Card.Content className={'space-y-4 overflow-y-auto'}>
				{paginatedHistory.length ? paginatedHistory.map((history) => (
					<Card
						key={history._id}
						className={'max-w-full bg-white border'}
					>
						<Card.Content>
							{/* header */}
							<div className={'text-gray-500 text-sm font-medium flex justify-between items-center'}>
								<span>Medical Record</span>
								<span>ID: {history._id}</span>
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
											<p>{formatDate(history.diagnosisDate, MMM_comma_dd_yyyy)}</p>
										</div>
									</div>
								</div>
	
								{/* medication */}
								<div>
									<h4 className={'font-semibold'}>Medications</h4>
									{history.medications?.length ? (
										<Medications history={history}/>
									) : (
										<p className={'text-sm'}>No medication prescribed.</p>
									)}
								</div>
							</div>
						</Card.Content>
					</Card>
				)) : (
					<p className={'text-sm'}>No medical history yet.</p>
				)}
			</Card.Content>
		</Card>
	);
}

function Medications({ history }: {
	history: MedicalHistoryType
}) {
	return (
		<Accordion type={'single'} collapsible aria-label={'Medications'}>
			{history.medications!.map((med, idx) => (
				<Accordion.Item
					key={idx}
					value={`medication${idx}`}
				>
					<Accordion.Trigger>
						<div className={'flex justify-between items-center w-full pr-4'}>
							<span className={'font-medium'}>{med.drugName}</span>
							<span className={'text-sm text-gray-500'}>{med.dosage}</span>
						</div>
          </Accordion.Trigger>
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