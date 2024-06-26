// usePersistedState.js

import { useState, useEffect } from 'react';

function usePersistedState(key, initialState) {
	const [state, setState] = useState(() => {
		try {
			const persistedState = localStorage.getItem(key);
			return persistedState !== null ? JSON.parse(persistedState) : initialState;
		} catch (error) {
			console.error('Failed to parse JSON from localStorage', error);
			return initialState;
		}
	});

	useEffect(() => {
		try {
			localStorage.setItem(key, JSON.stringify(state));
		} catch (error) {
			console.error('Failed to set JSON in localStorage', error);
		}
	}, [key, state]);

	return [state, setState];
}

export default usePersistedState;
