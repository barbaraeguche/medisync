import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	fetchUser, fetchUsers, saveUser, saveAddress, saveEmergencyContact, deleteUser
} from '@/redux/thunks/userThunk';
import { User } from '@/lib/definitions';
import { ThunkStatus, ThunkError } from '@/lib/types';
import { userInitState } from '@/redux/initialStates';

interface UserState {
	user: User;
	users: User[];
	status: ThunkStatus;
	error: ThunkError;
}

const initialState: UserState = {
  user: userInitState,
  users: [],
	status: 'idle',
	error: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		resetStatus: (state) => {
			state.status = 'idle';
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			// fetchUser
			.addCase(fetchUser.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
				state.status = 'fulfilled';
				state.user = action.payload.user;
			})
			.addCase(fetchUser.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
		
			// fetchUsers
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<{ users: User[] }>) => {
				state.status = 'fulfilled';
				state.users = action.payload.users;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// saveUser
			.addCase(saveUser.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveUser.fulfilled, (state, action: PayloadAction<Partial<User>>) => {
				state.status = 'fulfilled';
				state.user = {
					...state.user,
					...action.payload
				};
			})
			.addCase(saveUser.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// saveAddress
			.addCase(saveAddress.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveAddress.fulfilled, (state, action: PayloadAction<NonNullable<User['address']>>) => {
				state.status = 'fulfilled';
				state.user.address = {
					...state.user.address,
					...action.payload
				};
			})
			.addCase(saveAddress.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// saveEmergencyContact
			.addCase(saveEmergencyContact.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(saveEmergencyContact.fulfilled, (state, action: PayloadAction<NonNullable<User['emergencyContact']>>) => {
				state.status = 'fulfilled';
				state.user.emergencyContact = {
					...state.user.emergencyContact,
					...action.payload
				};
			})
			.addCase(saveEmergencyContact.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
			
			// deleteUser
			.addCase(deleteUser.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(deleteUser.fulfilled, (state, action: PayloadAction<string>) => {
				state.status = 'fulfilled';
				
				// reset the current user if it was deleted
				if (state.user._id === action.payload) {
					state.user = userInitState;
				}
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as unknown as string;
			})
	}
});

export const { resetStatus } = userSlice.actions;
export default userSlice.reducer;