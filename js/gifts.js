import { giftsCard, modal } from "./components.js";
import { fetchData } from "./database.js";
import { categoryData } from "./data.js";

let giftsDatabase;

const link =
	"https://raw.githubusercontent.com/ArtemMikhalenia/christmas-shop-database/refs/heads/main/gifts.json";
const giftsContainer = document.querySelector(".gifts-cards");
const tabsContainer = document.querySelector(".tabs-container");
const tabs = document.querySelectorAll(".tab");
const modalBlock = document.querySelector(".modal-block");

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

function openModal() {
	let id = this.getAttribute("id");
	let currentPrice = 0;
	for (let key in giftsDatabase) {
		if (giftsDatabase[key].name === id) {
			modalBlock.innerHTML = modal.render(giftsDatabase[key].background);
			currentPrice = giftsDatabase[key].price;
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

	updatePrice(currentPrice);

	document.querySelectorAll(".price-label").forEach((el) => {
		el.addEventListener("click", (event) => {
			let currentOption = document.querySelector(".selected");
			if (!event.target.classList.contains("add")) {
				if (!event.target) return;
				if (event.target.classList.contains("selected")) return;

				if (!event.target.classList.contains("selected")) {
					event.target.classList.add("selected");
					currentOption.classList.remove("selected");
				}
				updatePrice(currentPrice);
			} else {
				if (!event.target) return;
				event.target.classList.toggle("selected");
				updatePrice(currentPrice);
			}
		});
	});
}

function closeModal() {
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
