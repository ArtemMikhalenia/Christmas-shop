import { giftsCard } from "./components.js";
import { fetchData } from "./database.js";
import { categoryData } from "./data.js";

const link =
	"https://raw.githubusercontent.com/ArtemMikhalenia/christmas-shop-database/refs/heads/main/gifts.json";
const giftsContainer = document.querySelector(".gifts-cards");
const tabsContainer = document.querySelector(".tabs-container");
const tabs = document.querySelectorAll(".tab");

const tabCategoryMap = {
	"tab-for-work": "For Work",
	"tab-for-health": "For Health",
	"tab-for-harmony": "For Harmony",
};

tabsContainer &&
	tabsContainer.addEventListener("click", (event) => {
		event.preventDefault();

		if (event.target.classList.contains("tab")) {
			tabs.forEach((tab) =>
				tab.classList.toggle("active", tab === event.target)
			);
			processData();
		}
	});

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
	if (!giftsContainer || !giftsData) return;

	const activeTab = document.querySelector(".tab.active");
	const activeCategory = activeTab
		? tabCategoryMap[activeTab.id] || "For All"
		: "For All";

	giftsContainer.innerHTML = "";

	Object.values(giftsData).forEach((gift) => {
		if (activeCategory === "For All" || activeCategory === gift.category) {
			const categoryInfo = categoryData.find(
				(el) => gift.category === el.category
			);

			if (categoryInfo) {
				giftsContainer.innerHTML += giftsCard.render(
					categoryInfo.imageSrc,
					categoryInfo.imageAlt,
					categoryInfo.categoryTag,
					gift.category,
					gift.name
				);
			}
		}
	});
}

const topBtn = document.querySelector(".top-btn");

if (topBtn) {
	window.addEventListener("scroll", function () {
		const block = document.querySelector(".wrapper");
		const getItemTopCoord = block.getBoundingClientRect().top;

		let blockCoords = -300;

		if (getItemTopCoord < blockCoords) {
			topBtn.classList.add("visible");
		} else {
			topBtn.classList.remove("visible");
		}
	});

	topBtn.addEventListener("click", scrollToTop);
}

function scrollToTop() {
	window.scrollTo({
		top: 0,
		behavior: "smooth",
	});
}
