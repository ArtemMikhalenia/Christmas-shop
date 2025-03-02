const burgerButton = document.querySelector(".menu-burger");
const headerList = document.querySelector(".header-list");
const headerContentLinks = headerList.querySelectorAll(".header-list-link");

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

		headerContentLinks.forEach((el) => {
			el.addEventListener("click", removeClasses);
		});
	});
}

window.addEventListener("resize", () => {
	if (document.documentElement.clientWidth > 768) {
		removeClasses();
	}
});

function removeClasses() {
	if (burgerButton.classList.contains("active")) {
		burgerButton.classList.add("inactive");
		burgerButton.classList.remove("active");
		headerList.classList.remove("active");
		document.body.classList.remove("lock");
	}
}
