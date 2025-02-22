import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '@/lib/definitions';
import { patientInitState } from '@/redux/initial-states';

interface PatientState {
  patient: Patient;
  patients: Patient[];
}

const initialState: PatientState = {
  patient: patientInitState,
  patients: []
};

const patientSlice = createSlice({
	name: 'patient',
	initialState,
	reducers: {
		getPatient: (state, action: PayloadAction<{ patient: Patient }>) => {
			state.patient = action.payload.patient;
		},
		updateHealthMetrics: (state, action: PayloadAction<Patient['healthMetrics']>) => {
			state.patient.healthMetrics = {
				...state.patient.healthMetrics,
				...action.payload
			};
		},
	}
});

export const { getPatient, updateHealthMetrics } = patientSlice.actions;
export default patientSlice.reducer;