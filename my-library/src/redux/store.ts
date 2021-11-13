import { configureStore } from '@reduxjs/toolkit';
import modalReducer from './modal/modalSlice';
import userReducer from './user/userSlice';
import libraryReducer from './library/librarySlice';

export const store = configureStore({
	reducer: {
		modal: modalReducer,
		user: userReducer,
		library: libraryReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
