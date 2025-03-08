import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchPatient, fetchPatients, savePatient, createAppointment, saveAppointment, deletePatient
} from '@/redux/thunks/patientThunk';
import { Appointments, Patient } from '@/lib/definitions';
import { ThunkStatus, ThunkError } from '@/lib/types';
import { patientInitState } from '@/redux/initialStates';


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
      .addCase(fetchPatient.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.status = 'fulfilled';
        state.patient = action.payload;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as unknown as string;
      })
			
      // fetchPatients
			.addCase(fetchPatients.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
				state.status = 'fulfilled';
				state.patients = action.payload;
			})
			.addCase(fetchPatients.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// savePatient
			.addCase(savePatient.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(savePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
				state.status = 'fulfilled';
				state.patient = {
					...state.patient,
          ...action.payload
				};
			})
			.addCase(savePatient.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// createAppointment
			.addCase(createAppointment.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(createAppointment.fulfilled, (state, action: PayloadAction<Appointments>) => {
				state.status = 'fulfilled';
				(state.patient.appointments ??= []).push(action.payload);
			})
			.addCase(createAppointment.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// saveAppointment
			.addCase(saveAppointment.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveAppointment.fulfilled, (state, action: PayloadAction<Appointments[]>) => {
				state.status = 'fulfilled';
				state.patient.appointments = action.payload;
			})
			.addCase(saveAppointment.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// deletePatient
			.addCase(deletePatient.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(deletePatient.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = 'fulfilled';
				state.patients = state.patients.filter((patient) => patient._id !== action.payload);
				
				// reset the current patient if it was deleted
				if (state.patient._id === action.payload) {
					state.patient = patientInitState;
				}
			})
			.addCase(deletePatient.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
	}
});

export const { resetStatus } = patientSlice.actions;
export default patientSlice.reducer;