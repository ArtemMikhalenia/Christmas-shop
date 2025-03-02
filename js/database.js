const fetchData = async (url) => {
	try {
		const response = await fetch(url);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error(`Ошибка при получении данных: ${response.status}`);
		}
	} catch (error) {
		console.error("Ошибка:", error);
		return null;
	}
};

export { fetchData };
