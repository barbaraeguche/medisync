import { combineReducers } from '@reduxjs/toolkit';

import userSlice from '@/redux/slices/user-slice';
import doctorSlice from '@/redux/slices/doctor-slice';
import patientSlice from '@/redux/slices/patient-slice';

const rootReducer = combineReducers({
	userSlice,
	doctorSlice,
	patientSlice
});

export default rootReducer;