import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchPatient, fetchPatients, savePatient, deletePatient,
	createAppointment, saveAppointment, deleteAppointment
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
				state.error = null;
      })
      .addCase(fetchPatient.fulfilled, (state, action: PayloadAction<Patient>) => {
        state.status = 'fulfilled';
        state.patient = action.payload;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as string;
      })
			
      // fetchPatients
			.addCase(fetchPatients.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(fetchPatients.fulfilled, (state, action: PayloadAction<Patient[]>) => {
				state.status = 'fulfilled';
				state.patients = action.payload;
			})
			.addCase(fetchPatients.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			
			// savePatient
			.addCase(savePatient.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(savePatient.fulfilled, (state, action: PayloadAction<Patient>) => {
				state.status = 'fulfilled';
				state.patient = action.payload;
			})
			.addCase(savePatient.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			
			// createAppointment
			.addCase(createAppointment.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(createAppointment.fulfilled, (state, action: PayloadAction<Appointments>) => {
				state.status = 'fulfilled';
				(state.patient.appointments ??= []).push(action.payload);
			})
			.addCase(createAppointment.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			
			// saveAppointment
			.addCase(saveAppointment.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(saveAppointment.fulfilled, (state, action: PayloadAction<Appointments[]>) => {
				state.status = 'fulfilled';
				state.patient.appointments = action.payload;
			})
			.addCase(saveAppointment.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			
			// deleteAppointment
			.addCase(deleteAppointment.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(deleteAppointment.fulfilled, (state, action: PayloadAction<Appointments[]>) => {
				state.status = 'fulfilled';
				state.patient.appointments = action.payload;
			})
			.addCase(deleteAppointment.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			
			// deletePatient
			.addCase(deletePatient.pending, (state) => {
				state.status = 'pending';
				state.error = null;
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
				state.error = action.payload as string;
			})
	}
});

export const { resetStatus } = patientSlice.actions;
export default patientSlice.reducer;