const burgerButton = document.querySelector(".menu-burger");
const headerList = document.querySelector(".header-list");
// const headerContentLinks = headerContent.querySelectorAll('.navigation-link');
// const menuLink = headerContent.querySelector('.menu-link');
// const menuBtn = document.querySelector('.menu-btn');

if (burgerButton) {
	burgerButton.addEventListener("click", () => {
		if (burgerButton.classList.contains("active")) {
			burgerButton.classList.add("inactive");
			headerList.classList.remove("active");
			document.body.classList.remove("lock");
			burgerButton.classList.remove("active");
		} else {
			burgerButton.classList.add("active");
			headerList.classList.add("active");
			document.body.classList.add("lock");
			burgerButton.classList.remove("inactive");
		}

		// headerContentLinks.forEach((el) => {
		// 	el.addEventListener("click", removeClasses);
		// });

		// if (menuLink) {
		// 	menuLink.addEventListener("click", (event) => {
		// 		event.preventDefault();
		// 		const linkToMenuPage = menuBtn.getAttribute("href").slice(2);
		// 		removeClasses();
		// 		headerContent.addEventListener("transitionend", () => {
		// 			window.location.href = linkToMenuPage;
		// 		});
		// 	});
		// }
	});
}

window.addEventListener("resize", () => {
	if (document.documentElement.clientWidth > 768) {
		removeClasses();
	}
});

function removeClasses() {
	burgerButton.classList.remove("active");
	headerList.classList.remove("active");
	document.body.classList.remove("lock");
}
