const aboutSection = document.querySelector(".about-section");
const aboutContent = document.querySelector(".about-content");

const sliderWrapper = document.querySelector(".slider-wrapper");
const slides = document.querySelectorAll(".slide");
const sliderLine = document.querySelector(".slider-line");

const sliderBtnLeft = document.querySelector(".slider-left-btn");
const sliderBtnRight = document.querySelector(".slider-right-btn");

let counter = 0;
let numberOfClicks;
let width;

function numberOfClicksFunction() {
	if (document.documentElement.clientWidth < 768) {
		return (numberOfClicks = 6);
	} else {
		return (numberOfClicks = 3);
	}
}

function init() {
	if (sliderWrapper) {
		let paddingWidth = aboutSection.offsetWidth - aboutContent.offsetWidth;

		if (sliderLine) {
			width =
				(sliderLine.scrollWidth - sliderWrapper.offsetWidth + paddingWidth) /
				numberOfClicks;
		}

		sliderWrapper.style.padding = `0px ${paddingWidth / 2}px`;

		swipeSlider();
	}
}

numberOfClicksFunction();
init();

window.addEventListener("resize", () => {
	width = 0;
	counter = 0;

	numberOfClicksFunction();
	init();
});

if (sliderBtnLeft) sliderBtnLeft.addEventListener("click", prevSlider);
if (sliderBtnRight) sliderBtnRight.addEventListener("click", nextSlider);

function nextSlider() {
	counter++;
	if (counter >= slides.length) counter = 0;
	sliderButtonsState(counter, numberOfClicks, sliderBtnRight, sliderBtnLeft);
	swipeSlider();
}

function prevSlider() {
	counter--;
	if (counter < 0) counter = slides.length;
	sliderButtonsState(counter, 0, sliderBtnLeft, sliderBtnRight);
	swipeSlider();
}

function sliderButtonsState(counter, numberOfClicks, button1, button2) {
	counter === numberOfClicks
		? button1.setAttribute("disabled", true)
		: button1.removeAttribute("disabled");
	if (counter > 0) button2.removeAttribute("disabled");
}

function swipeSlider() {
	if (sliderLine) {
		sliderLine.style.transform = "translate(-" + counter * width + "px)";
	}
}
