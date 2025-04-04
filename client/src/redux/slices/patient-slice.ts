import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchPatient, fetchPatients, savePatient, deletePatient,
	createAppointment, saveAppointment, deleteAppointment
} from '@/redux/thunks/patient-thunk';
import { Appointments, Patient } from '@/lib/definitions';
import { ThunkStatus, ThunkError } from '@/lib/types';
import { patientInitState } from '@/redux/initial-states';


interface PatientState {
  patient: Patient;
  patients: Patient[];
	status: ThunkStatus;
	error: ThunkError;
}

const initialState: PatientState = {
  patient: patientInitState,
  patients: [],
	status: 'idle',
  error: null,
};

const patientSlice = createSlice({
	name: 'patient',
	initialState,
	reducers: {
		resetStatus: (state) => {
      state.status = 'idle';
      state.error = null;
    }
	},
	extraReducers: (builder) => {
		builder
      // fetchPatient
      .addCase(fetchPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.patient = action.payload;
      })
			
      // fetchPatients
			.addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
				state.patients = action.payload;
			})
			
			// savePatient
			.addCase(savePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
				state.patient = action.payload;
			})
			
			// createAppointment
			.addCase(createAppointment.fulfilled, (state, action: PayloadAction<Appointments>) => {
				(state.patient.appointments ??= []).push(action.payload);
			})
			
			// saveAppointment
			.addCase(saveAppointment.fulfilled, (state, action: PayloadAction<Appointments[]>) => {
				state.patient.appointments = action.payload;
			})
			
			// deleteAppointment
			.addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<Appointments[]>) => {
				state.patient.appointments = action.payload;
			})
			
			// deletePatient
			.addCase(deletePatient.fulfilled, (state, action: PayloadAction<string>) => {
				state.patients = state.patients.filter((patient) => patient._id !== action.payload);
				
				// reset the current patient if it was deleted
				if (state.patient._id === action.payload) {
					state.patient = patientInitState;
				}
			})
		
			// ---- general matchers ---- //
		
			.addMatcher(
				(action) => action.type.endsWith('/fulfilled'),
				(state) => {
					state.status = 'fulfilled';
				}
			)
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

export const { resetStatus } = patientSlice.actions;
export default patientSlice.reducer;