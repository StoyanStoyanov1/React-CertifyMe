import { useState, useEffect } from "react";

function useLoadingText(isLoading) {
	const [count, setCount] = useState(0);

	useEffect(() => {
		if (!isLoading) {
			return;
		}

		const intervalId = setInterval(() => {
			setCount(prevCount => (prevCount >= 3 ? 0 : prevCount + 1));
		}, 600);

		return () => clearInterval(intervalId);
	}, [isLoading]);

	return `Loading${'.'.repeat(count)}`;
}

export default useLoadingText;
