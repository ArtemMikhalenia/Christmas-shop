import { fetchData } from "./database.js";
import { bestCard } from "./components.js";
import { categoryData } from "./data.js";
import { openModal, giftsDatabase, modalBlock } from "./gifts.js";

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

		const bestId = gift.name.toLowerCase().replaceAll(" ", "-");

		bestCardsContainer.innerHTML += bestCard.render(
			bestId,
			categoryInfo.imageSrc,
			categoryInfo.imageAlt,
			categoryInfo.categoryTag,
			gift.category,
			gift.name
		);

		const bestItem = document.querySelectorAll(".best-card");

		bestItem.forEach((el) => {
			el.addEventListener("click", openModal);
		});
	});
}
