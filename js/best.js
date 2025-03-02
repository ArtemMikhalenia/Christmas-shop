import { fetchData } from "./database.js";
import { bestCard } from "./components.js";
import { categoryData } from "./data.js";

const link =
	"https://raw.githubusercontent.com/ArtemMikhalenia/christmas-shop-database/refs/heads/main/gifts.json";
const bestCardsContainer = document.querySelector(".best-cards");

async function processData() {
	try {
		const giftsData = await fetchData(link);
		renderCards(giftsData);
	} catch (error) {
		console.error("Ошибка:", error);
	}
}

processData();

function renderCards(giftsData) {
	if (!bestCardsContainer || !giftsData) return;

	bestCardsContainer.innerHTML = "";
	const keys = Object.keys(giftsData);
	const shuffledKeys = keys
		.sort(() => Math.random() - 0.5)
		.slice(0, Math.min(4, keys.length));

	shuffledKeys.forEach((key) => {
		const gift = giftsData[key];

		const categoryInfo = categoryData.find(
			(el) => gift.category === el.category
		);

		bestCardsContainer.innerHTML += bestCard.render(
			categoryInfo.imageSrc,
			categoryInfo.imageAlt,
			categoryInfo.categoryTag,
			gift.category,
			gift.name
		);
	});
}
