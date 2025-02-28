import { combineReducers } from '@reduxjs/toolkit';

import userSlice from '@/redux/slices/userSlice';
import doctorSlice from '@/redux/slices/doctorSlice';
import patientSlice from '@/redux/slices/patientSlice';

const rootReducer = combineReducers({
	userSlice,
	doctorSlice,
	patientSlice
});

export default rootReducer;