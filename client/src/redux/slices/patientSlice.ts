import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchPatient, fetchPatients, savePatient, saveHealthMetrics, saveAppointment
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
      .addCase(fetchPatient.fulfilled, (state, action: PayloadAction<{ patient: Patient }>) => {
        state.status = 'fulfilled';
        state.patient = action.payload.patient;
      })
      .addCase(fetchPatient.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload as unknown as string;
      })
			
      // fetchPatients
			.addCase(fetchPatients.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchPatients.fulfilled, (state, action: PayloadAction<{ patients: Patient[] }>) => {
				state.status = 'fulfilled';
				state.patients = action.payload.patients;
			})
			.addCase(fetchPatients.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// savePatient
			.addCase(savePatient.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(savePatient.fulfilled, (state, action: PayloadAction<Partial<Patient>>) => {
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
			
			// saveHealthMetrics
			.addCase(saveHealthMetrics.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveHealthMetrics.fulfilled, (state, action: PayloadAction<Patient['healthMetrics']>) => {
				state.status = 'fulfilled';
				state.patient.healthMetrics = {
					...state.patient.healthMetrics,
					...action.payload
				};
			})
			.addCase(saveHealthMetrics.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// saveAppointment
			.addCase(saveAppointment.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveAppointment.fulfilled, (state, action: PayloadAction<NonNullable<Appointments[]>>) => {
				state.status = 'fulfilled';
				state.patient.appointments = {
					...state.patient.appointments,
					...action.payload
				};
			})
			.addCase(saveAppointment.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
	}
});

export const { resetStatus } = patientSlice.actions;
export default patientSlice.reducer;