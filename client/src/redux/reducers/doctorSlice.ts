import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Doctor } from '@/lib/definitions';
import { doctorInitState } from '@/redux/initial-states';

interface DoctorState {
	doctor: Doctor;
	doctors: Doctor[];
}

const initialState: DoctorState = {
  doctor: doctorInitState,
  doctors: []
};

const doctorSlice = createSlice({
	name: 'doctor',
	initialState,
	reducers: {
		getDoctor: (state, action: PayloadAction<{ doctor: Doctor }>) => {
			state.doctor = action.payload.doctor;
		},
		updateAvailabilities: (state, action: PayloadAction<NonNullable<Doctor['availabilities']>>) => {
			state.doctor.availabilities = {
				...state.doctor.availabilities,
				...action.payload
			};
		}
	}
});

export const { getDoctor, updateAvailabilities } = doctorSlice.actions;
export default doctorSlice.reducer;