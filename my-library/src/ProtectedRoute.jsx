import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ children, isSignedIn, ...rest }) {
	if (isSignedIn) {
		return <Route {...rest}>{children}</Route>;
	} else return <Redirect to='/signin' />;
}
