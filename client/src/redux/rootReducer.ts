import { combineReducers } from '@reduxjs/toolkit';

import userSlice from '@/redux/reducers/userSlice';
import doctorSlice from '@/redux/reducers/doctorSlice';
import patientSlice from '@/redux/reducers/patientSlice';

const rootReducer = combineReducers({
	userSlice,
	doctorSlice,
	patientSlice
});

export default rootReducer;