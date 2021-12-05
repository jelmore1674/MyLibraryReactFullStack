import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
	userid: number;
	name: string;
	email: string;
}

interface UserState {
	user: User | null;
	isSignedIn: boolean;
	token?: any;
}

interface UserLogin {
	email: string;
	password: string;
}

const initialState: UserState = {
	user: null,
	isSignedIn: false,
	token: null,
};

export const getToken = createAsyncThunk(
	'user/getToken',
	async (userLogin: UserLogin, { rejectWithValue }) => {
		try {
			const response = await fetch('http://localhost:5500/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: userLogin.email,
					password: userLogin.password,
				}),
			});
			const data = await response.json();
			if (data.success) {
				return data;
			}
			return data;
		} catch (error: any) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async (token: any, { rejectWithValue }) => {
		try {
			const resp = await fetch(
				`http://localhost:5500/users/${token.userid}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: token.token,
					},
				}
			);
			const user = await resp.json();
			if (user.userid) {
				return user;
			} else throw new Error('User not found');
		} catch (error: any) {
			console.error(error);
			return rejectWithValue(error);
		}
	}
);

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
	extraReducers: (builder) => {
		builder.addCase(loginUser.pending, (state) => {
			state.isSignedIn = false;
			state.user = null;
		});
		builder.addCase(loginUser.fulfilled, (state, { payload }) => {
			state.isSignedIn = true;
			state.user = payload;
		});
		builder.addCase(loginUser.rejected, (state) => {
			state.isSignedIn = false;
			state.user = null;
		});
		builder.addCase(getToken.pending, (state) => {
			state.isSignedIn = false;
			state.user = null;
		});
		builder.addCase(getToken.fulfilled, (state, { payload }) => {
			state.token = payload;
		});
		builder.addCase(getToken.rejected, (state) => {
			state.isSignedIn = false;
			state.user = null;
		});
	},
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
