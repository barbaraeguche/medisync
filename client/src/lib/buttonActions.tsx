import { Trash2 } from 'lucide-react';
import { Button } from '@/ui/index';

export const EditAppointment = ({ id }: {
	id: number
}) => {
	return (
		<Button
      size={'icon'}
      variant={'destructive'}
      className={'shadow-none bg-transparent hover:bg-transparent text-red-600 hover:text-red-400'}
      onClick={() => {
        // todo: this should edit the appointment
        // deleteAppointment(id);
	      console.log(id);
      }}
    >
      <span className={'sr-only'}>Edit Appointment</span>
      <Trash2 className={'size-4'}/>
    </Button>
	);
};