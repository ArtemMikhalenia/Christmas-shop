const daysBlock = document.getElementById("days-number");
const hoursBlock = document.getElementById("hours-number");
const minutesBlock = document.getElementById("minutes-number");
const secondsBlock = document.getElementById("seconds-number");
const timerBlock = document.querySelector(".explore-timer");

function updateTimer() {
	const now = new Date();
	const newYear = new Date(now.getFullYear() + 1, 0, 1); // Новый год
	const timeRemaining = newYear - now;

	const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
	const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

	daysBlock.innerHTML = days;
	hoursBlock.innerHTML = hours;
	minutesBlock.innerHTML = minutes;
	secondsBlock.innerHTML = seconds;

	if (timeRemaining < 0) {
		clearInterval(timerId);
	}
}

if (timerBlock) {
	const timerId = setInterval(updateTimer, 1000);
}
