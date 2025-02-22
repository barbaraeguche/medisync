import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Doctor, Practitioner } from '@/lib/definitions';
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
		updateDoctor: (state, action: PayloadAction<Practitioner>) => {
			state.doctor.practitioner = {
				...state.doctor.practitioner,
				...action.payload
			};
		},
		updateEducation: (state, action: PayloadAction<NonNullable<Practitioner['education']>>) => {
			state.doctor.practitioner.education = {
				...state.doctor.practitioner.education,
        ...action.payload
			}
		},
		updateAvailabilities: (state, action: PayloadAction<NonNullable<Doctor['availabilities']>>) => {
			state.doctor.availabilities = {
				...state.doctor.availabilities,
				...action.payload
			};
		},
		getDoctors: (state, action: PayloadAction<{ doctors: Doctor[] }>) => {
			state.doctors = action.payload.doctors;
		}
	}
});

export const {
	getDoctor, updateDoctor, updateEducation, updateAvailabilities, getDoctors
} = doctorSlice.actions;
export default doctorSlice.reducer;