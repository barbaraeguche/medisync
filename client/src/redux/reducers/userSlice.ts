import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/lib/definitions';
import { userInitState } from '@/redux/initial-states';

interface UserState {
	user: User;
	users: User[];
}

const initialState: UserState = {
  user: userInitState,
  users: []
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<{ user: User }>) => {
			state.user = action.payload.user;
		},
		updateUser: (state, action: PayloadAction<Partial<User>>) => {
			state.user = {
				...state.user,
				...action.payload
			};
		},
		updateAddress: (state, action: PayloadAction<NonNullable<User['address']>>) => {
			state.user.address = {
				...state.user.address,
				...action.payload
			};
		},
		updateEmergencyContact: (state, action: PayloadAction<NonNullable<User['emergencyContact']>>) => {
			state.user.emergencyContact = {
				...state.user.emergencyContact,
				...action.payload
			};
		}
	}
});

export const {
	setUser, updateUser, updateAddress, updateEmergencyContact
} = userSlice.actions;
export default userSlice.reducer;