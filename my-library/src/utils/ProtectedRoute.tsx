import React from 'react';

import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { RootState } from '../redux/store';

interface Props {
	children: React.ReactNode;
	path: string;
}

export default function ProtectedRoute({
	children,
	...rest
}: Props): JSX.Element {
	const isSignedIn = useSelector((state: RootState) => state.user.isSignedIn);
	if (isSignedIn) {
		return <Route {...rest}>{children}</Route>;
	} else return <Redirect to='/signin' />;
}
