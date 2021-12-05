import { EnhancedStore } from '@reduxjs/toolkit'; // for redux-toolkit
// import { Store } from 'redux' // for non-toolkit
import {
	render as rtlRender,
	RenderOptions,
	RenderResult,
} from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { Provider } from 'react-redux';

import { createTestStore, RootState } from '../redux/store';

type ReduxRenderOptions = {
	preloadedState?: RootState | {};
	store?: EnhancedStore; // for redux-toolkit
	// store?: Store // for non-toolkit
	renderOptions?: Omit<RenderOptions, 'wrapper'>;
};

function render(
	ui: ReactElement,
	{
		preloadedState = {},
		store = createTestStore(preloadedState),
		...renderOptions
	}: ReduxRenderOptions = {}
): RenderResult {
	function Wrapper({ children }: { children?: ReactNode }): ReactElement {
		return <Provider store={store}>{children}</Provider>;
	}
	return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';

// override render method
export { render };
