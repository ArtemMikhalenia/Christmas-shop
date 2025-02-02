const sliderWrapper = document.querySelector(".slider-wrapper");
const slides = document.querySelectorAll(".slide");
const sliderLine = document.querySelector(".slider-line");

const sliderBtnLeft = document.querySelector(".slider-left-btn");
const sliderBtnRight = document.querySelector(".slider-right-btn");

let counter = 0;
const numberOfClicks = 4;
let width;
let paddingWidth = 164;

function init() {
	width =
		(sliderLine.scrollWidth - sliderWrapper.offsetWidth + paddingWidth) /
		numberOfClicks;
	swipeSlider();
}

init();

window.addEventListener("resize", init);

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
