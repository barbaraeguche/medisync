import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchDoctor, fetchDoctors, saveDoctor, saveAvailability, deleteDoctor
} from '@/redux/thunks/doctorThunk';
import { Availabilities, Doctor } from '@/lib/definitions';
import { ThunkStatus, ThunkError } from '@/lib/types';
import { doctorInitState } from '@/redux/initialStates';

interface DoctorState {
	doctor: Doctor;
	doctors: Doctor[];
	status: ThunkStatus;
	error: ThunkError;
}

const initialState: DoctorState = {
  doctor: doctorInitState,
  doctors: [],
	status: 'idle',
  error: null
};

const doctorSlice = createSlice({
	name: 'doctor',
	initialState,
	reducers: {
		resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
	},
	extraReducers: (builder) => {
		builder
			// fetchDoctor
			.addCase(fetchDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
				state.status = 'fulfilled';
				state.doctor = action.payload;
			})
			
			// fetchDoctors
			.addCase(fetchDoctors.fulfilled, (state, action: PayloadAction<Doctor[]>) => {
				state.status = 'fulfilled';
				state.doctors = action.payload;
			})
			
			// saveDoctor
			.addCase(saveDoctor.fulfilled, (state, action: PayloadAction<Doctor>) => {
				state.status = 'fulfilled';
				state.doctor = action.payload;
			})
			
			// saveAvailability
			.addCase(saveAvailability.fulfilled, (state, action: PayloadAction<Availabilities>) => {
				state.status = 'fulfilled';
				state.doctor.availabilities = action.payload;
			})
			
			// deleteDoctor
			.addCase(deleteDoctor.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = 'fulfilled';
				state.doctors = state.doctors.filter((doctor) => doctor._id !== action.payload);
				
				// reset the current doctor if it was deleted
				if (state.doctor._id === action.payload) {
					state.doctor = doctorInitState;
				}
			})
			
			// ---- general matchers ---- //
			
			.addMatcher(
				(action) => action.type.endsWith('/pending'),
				(state) => {
					state.status = 'pending';
					state.error = null;
				}
			)
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, action: PayloadAction<string | undefined>) => {
					state.status = 'rejected';
					state.error = action.payload as string;
				}
			);
	}
});

export const { resetStatus } = doctorSlice.actions;
export default doctorSlice.reducer;