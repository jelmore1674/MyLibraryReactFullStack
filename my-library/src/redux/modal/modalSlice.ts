import { createSlice } from '@reduxjs/toolkit';

interface ModalStyles {
	display: string;
	backgroundColor?: string;
}

export interface ModalState {
	show: string;
	showModal: ModalStyles;
}

let defaultModal = {
	display: 'none',
};

let modalStyle = {
	display: 'block',
	backgroundColor: 'rgba(0, 0, 0, .8)',
};

const initialState: ModalState = {
	show: '',
	showModal: defaultModal,
};

export const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		openModal: (state) => {
			state.show = 'show';
			state.showModal = modalStyle;
		},
		closeModal: (state) => {
			state.show = '';
			state.showModal = defaultModal;
		},
	},
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
