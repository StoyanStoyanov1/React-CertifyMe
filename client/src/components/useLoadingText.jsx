import { useState, useEffect } from "react";

function useLoadingText(isLoading) {
	const [count, setCount] = useState(0);

	useEffect(() => {

		const intervalId = setInterval(() => {
			setCount(prevCount => {
				if (!isLoading) {
					clearInterval(intervalId); // Спиране на интервала, ако isLoading е false
					return prevCount;
				}


				return prevCount >= 3 ? 0 : prevCount + 1;
			});
		}, 600);


		return () => clearInterval(intervalId);
	}, [isLoading]);


	return `Loading${'.'.repeat(count)}`;
}

export default useLoadingText;
