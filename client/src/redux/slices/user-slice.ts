import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signInUser, registerUser, logoutUser } from '@/redux/thunks/auth-thunk';
import { fetchUsers, saveUser } from '@/redux/thunks/user-thunk';
import { User } from '@/lib/definitions';
import { ThunkStatus, ThunkError } from '@/lib/types';
import { userInitState } from '@/redux/initial-states';

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
		setUser: (state, action: PayloadAction<User>) => {
			state.status = 'fulfilled';
			state.isAuthenticated = true;
			state.user = action.payload;
		},
		deleteUser: (state, action: PayloadAction<string>) => {
			// reset the current user if it was deleted
			if (state.user._id === action.payload) {
				state.users = state.users.filter((user) => user._id !== action.payload);
				
				state.isAuthenticated = false;
				state.user = userInitState;
			}
		},
		clearAuth: (state) => {
			state.isAuthenticated = false;
			state.user = userInitState;
		},
		resetStatus: (state) => {
			state.status = 'idle';
			state.error = null;
		}
	},
	extraReducers: (builder) => {
		builder
			// ---- authentication ---- //
			// signInUser
			.addCase(signInUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.isAuthenticated = true;
				state.user = action.payload;
			})
			.addCase(signInUser.rejected, (state) => {
				state.isAuthenticated = false;
			})
			
			// registerUser
			.addCase(registerUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.isAuthenticated = true;
				state.user = action.payload;
			})
			
			// logoutUser
			.addCase(logoutUser.fulfilled, (state) => {
				state.isAuthenticated = false;
				state.user = userInitState;
			})
			.addCase(logoutUser.rejected, (state) => {
				// still clear the auth state even if the server-side logout fails
				state.isAuthenticated = false;
				state.user = userInitState;
			})
			
			// ---- crud operations ---- //
			// fetchUsers
			.addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
				state.users = action.payload;
			})
			
			// saveUser
			.addCase(saveUser.fulfilled, (state, action: PayloadAction<User>) => {
				state.user = action.payload;
			})
			
			// ---- general matchers ---- //
			
			.addMatcher(
				(action) => action.type.endsWith('/fulfilled'),
        (state) => {
          state.status = 'fulfilled';
        }
			)
			.addMatcher(
				(action) => action.type.endsWith('/pending'),
				(state) => {
					state.status = 'pending';
					state.error = null;
				}
			)
			.addMatcher(
				(action) => action.type.endsWith('/rejected'),
				(state, action: PayloadAction<string | undefined>) => {
					state.status = 'rejected';
					state.error = action.payload as string;
				}
			);
	}
});

export const { setUser, deleteUser, clearAuth, resetStatus } = userSlice.actions;
export default userSlice.reducer;