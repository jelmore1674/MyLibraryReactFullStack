import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface Book {
	userid: number;
	id?: number;
	email: string;
	title: string;
	author: string;
	pages: number;
	completed: boolean;
}

export const fetchLibraryByUserId = createAsyncThunk(
	'library/fetchLibraryByUserId',
	async (userId: number, { rejectWithValue }) => {
		try {
			const response = await fetch(`api/library-item/${userId}`);
			const data = await response.json();
			return data;
		} catch (error: any) {
			return rejectWithValue(error);
		}
	}
);

interface LibraryState {
	library: Book[];
	loading: boolean;
	error: string | null;
}

const initialState: LibraryState = {
	library: [],
	loading: false,
	error: null,
};

export const librarySlice = createSlice({
	name: 'library',
	initialState,
	reducers: {
		setLibrary: (state, action) => {
			state.library = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchLibraryByUserId.pending, (state, action) => {
			state.loading = true;
		});
		builder.addCase(fetchLibraryByUserId.fulfilled, (state, action) => {
			state.loading = false;
			state.library = action.payload;
		});
		builder.addCase(fetchLibraryByUserId.rejected, (state, action: any) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export default librarySlice.reducer;
