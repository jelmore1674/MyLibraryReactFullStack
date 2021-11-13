import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
	userid: number;
	name: string;
	email: string;
}

interface UserState {
	user: User | null;
	isSignedIn: boolean;
}

const initialState: UserState = {
	user: null,
	isSignedIn: false,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, { payload }: PayloadAction<User>) => {
			state.isSignedIn = true;
			state.user = payload;
		},
		logout: (state) => {
			state.isSignedIn = false;
			state.user = null;
		},
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
