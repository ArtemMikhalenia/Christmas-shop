import {
	giftsCard,
	modal,
	activeSnowflake,
	inactiveSnowflake,
} from "./components.js";
import { fetchData } from "./database.js";
import { categoryData } from "./data.js";

export let giftsDatabase;

const link =
	"https://raw.githubusercontent.com/ArtemMikhalenia/christmas-shop-database/refs/heads/main/gifts.json";
const giftsContainer = document.querySelector(".gifts-cards");
const tabsContainer = document.querySelector(".tabs-container");
const tabs = document.querySelectorAll(".tab");
export const modalBlock = document.querySelector(".modal-block");

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
		giftsDatabase = giftsData;
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

			const giftId = gift.name.toLowerCase().replaceAll(" ", "-");

			if (categoryInfo) {
				giftsContainer.innerHTML += giftsCard.render(
					giftId,
					categoryInfo.imageSrc,
					categoryInfo.imageAlt,
					categoryInfo.categoryTag,
					gift.category,
					gift.name
				);
			}
		}
	});

	const giftsItem = document.querySelectorAll(".gifts-card");

	giftsItem.forEach((el) => {
		el.addEventListener("click", openModal);
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

export function openModal() {
	modalBlock && modalBlock.classList.add("opened");
	let id = this.getAttribute("id");
	let databaseName = "";
	const totalSnowflakes = 5;

	for (let key in giftsDatabase) {
		databaseName = giftsDatabase[key].name.toLowerCase().replaceAll(" ", "-");

		const categoryInfo = categoryData.find(
			(el) => giftsDatabase[key].category === el.category
		);

		if (databaseName === id) {
			const superpowerLive = giftsDatabase[key].superpowers.live[1];
			const superpowerCreate = giftsDatabase[key].superpowers.create[1];
			const superpowerLove = giftsDatabase[key].superpowers.love[1];
			const superpowerDream = giftsDatabase[key].superpowers.dream[1];

			modalBlock.innerHTML = modal.render(
				categoryInfo.imageSrc,
				categoryInfo.imageAlt,
				categoryInfo.categoryTag,
				giftsDatabase[key].category,
				giftsDatabase[key].name,
				giftsDatabase[key].description,
				giftsDatabase[key].superpowers.live,
				giftsDatabase[key].superpowers.create,
				giftsDatabase[key].superpowers.love,
				giftsDatabase[key].superpowers.dream
			);

			const superpowerLiveBlock = document.querySelector(".live-snowflakes");
			const superpowerCreateBlock =
				document.querySelector(".create-snowflakes");
			const superpowerLoveBlock = document.querySelector(".love-snowflakes");
			const superpowerDreamBlock = document.querySelector(".dream-snowflakes");

			superpowerLiveBlock.innerHTML =
				activeSnowflake.render().repeat(superpowerLive) +
				inactiveSnowflake.render().repeat(totalSnowflakes - superpowerLive);

			superpowerCreateBlock.innerHTML =
				activeSnowflake.render().repeat(superpowerCreate) +
				inactiveSnowflake.render().repeat(totalSnowflakes - superpowerCreate);

			superpowerLoveBlock.innerHTML =
				activeSnowflake.render().repeat(superpowerLove) +
				inactiveSnowflake.render().repeat(totalSnowflakes - superpowerLove);

			superpowerDreamBlock.innerHTML =
				activeSnowflake.render().repeat(superpowerDream) +
				inactiveSnowflake.render().repeat(totalSnowflakes - superpowerDream);
		}
	}

	const closeModalBtn = document.querySelector(".close-btn");
	closeModalBtn.addEventListener("click", closeModal);

	document.querySelector(".modal").addEventListener("click", (event) => {
		if (
			!event.target.closest(".modal-body") &&
			!event.target.closest(".close-btn")
		) {
			closeModal();
		}
	});
	document.body.classList.add("lock");
}

function closeModal() {
	modalBlock && modalBlock.classList.remove("opened");
	modalBlock.innerHTML = "";
	document.body.classList.remove("lock");
}

if (modalBlock) {
	document.addEventListener("keydown", (event) => {
		if (event.code === "Escape") {
			closeModal();
		}
	});
}
