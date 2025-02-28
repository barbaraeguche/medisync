import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Patient } from '@/lib/definitions';
import { patientInitState } from '@/redux/initialStates';

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
		updatePatient: (state, actions: PayloadAction<Partial<Patient>>) => {
			state.patient = {
				...state.patient,
				...actions.payload
			};
		},
		updateHealthMetrics: (state, action: PayloadAction<Patient['healthMetrics']>) => {
			state.patient.healthMetrics = {
				...state.patient.healthMetrics,
				...action.payload
			};
		}
	}
});

export const { getPatient, updateHealthMetrics } = patientSlice.actions;
export default patientSlice.reducer;