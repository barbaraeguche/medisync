import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	signInUser, registerUser, logoutUser, fetchUsers, saveUser
} from '@/redux/thunks/userThunk';
import { User } from '@/lib/definitions';
import { ThunkStatus, ThunkError } from '@/lib/types';
import { userInitState } from '@/redux/initialStates';

interface UserState {
	// auth related states
	isAuthenticated: boolean;
	user: User;
	
	// user management states
	users: User[];
	status: ThunkStatus;
	error: ThunkError;
}

const initialState: UserState = {
	isAuthenticated: false,
  user: userInitState,
  users: [],
	status: 'idle',
	error: null
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		deleteUser: (state, action: PayloadAction<string>) => {
			// reset the current user if it was deleted
			if (state.user._id === action.payload) {
				state.users = state.users.filter((user) => user._id !== action.payload);
				
				state.isAuthenticated = false;
				state.user = userInitState;
			}
		},
		resetStatus: (state) => {
			state.status = 'idle';
			state.error = null;
		},
		clearAuth: (state) => {
			state.isAuthenticated = false;
			state.user = userInitState;
		}
	},
	extraReducers: (builder) => {
		builder
			// ---- authentication ---- //
			// signInUser
			.addCase(signInUser.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(signInUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
				state.status = 'fulfilled';
				state.isAuthenticated = true;
				state.user = action.payload.user;
			})
			.addCase(signInUser.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
				state.isAuthenticated = false;
			})
			
			// registerUser
			.addCase(registerUser.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User }>) => {
				state.status = 'fulfilled';
				state.isAuthenticated = true;
				state.user = action.payload.user;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			
			// logoutUser
			.addCase(logoutUser.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.status = 'fulfilled';
				state.isAuthenticated = false;
				state.user = userInitState;
			})
			.addCase(logoutUser.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
				
				// still clear the auth state even if the server-side logout fails
				state.isAuthenticated = false;
				state.user = userInitState;
			})
			
			// ---- crud operations ---- //
			// fetchUsers
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
				state.status = 'fulfilled';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
			
			// saveUser
			.addCase(saveUser.pending, (state) => {
				state.status = 'pending';
				state.error = null;
			})
			.addCase(saveUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.status = 'fulfilled';
				state.user = action.payload;
			})
			.addCase(saveUser.rejected, (state, action) => {
				state.status = 'rejected';
				state.error = action.payload as string;
			})
	}
});

export const { clearAuth, deleteUser, resetStatus } = userSlice.actions;
export default userSlice.reducer;