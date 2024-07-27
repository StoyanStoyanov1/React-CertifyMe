import { useState, useEffect } from 'react';

// Custom hook to manage state with persistence in localStorage
function usePersistedState(key, initialState) {
	// Initialize state with value from localStorage or initial state
	const [state, setState] = useState(() => {
		try {
			const persistedState = localStorage.getItem(key);
			return persistedState !== null ? JSON.parse(persistedState) : initialState;
		} catch (error) {
			console.error('Failed to parse JSON from localStorage', error);
			return initialState;
		}
	});

	// Update localStorage whenever the state changes
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
