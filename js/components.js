const bestCard = {
	render: (bestId, imageSrc, imageAlt, categoryTag, category, name) => {
		return `
        <div class="best-card wow zoomIn" id="${bestId}">
          <div class="card-image">
            <img src=${imageSrc} alt=${imageAlt}>
          </div>
          <div class="card-text">
            <h4 class="card-tag ${categoryTag}">${category}</h4>
            <h3 class="card-name">${name}</h3>
          </div>
        </div>
     `;
	},
};

const giftsCard = {
	render: (giftId, imageSrc, imageAlt, categoryTag, category, name) => {
		return `
    <div class="gifts-card wow zoomIn" id="${giftId}">
      <div class="gifts-card-image">
        <img src=${imageSrc} alt=${imageAlt}>
      </div>
      <div class="gifts-card-text">
        <h4 class="gifts-card-tag ${categoryTag}">${category}</h4>
        <h3 class="gifts-card-name">${name}</h3>
      </div>
    </div>`;
	},
};

const modal = {
	render: (
		imageSrc,
		imageAlt,
		categoryTag,
		category,
		name,
		description,
		liveNumber,
		createNumber,
		loveNumber,
		dreamNumber
	) => {
		return `
     <div class="modal">
        <div class="modal-body">
          <div class="modal-image">
            <img src="${imageSrc}" alt="${imageAlt}">
            <button class="close-btn"></button>
          </div>
          <div class="modal-content">
            <h4 class="gifts-card-tag ${categoryTag}">${category}</h4>
            <h3 class="gifts-card-name">${name}</h3>
            <p class="gifts-card-text">${description}</p>
            <h4 class="gifts-card-superpowers-heading">Adds superpowers to:</h4>
            <div class="superpowers-content">
              <div class="superpower-block live-superpower">
                <div class="superpower-text">Live</div>
                <div class="superpower-number">${liveNumber}</div>
                <div class="snowflakes live-snowflakes"></div>
              </div>
              <div class="superpower-block create-superpower">
                <div class="superpower-text">Create</div>
                <div class="superpower-number">${createNumber}</div>
                <div class="snowflakes create-snowflakes"></div>
              </div>
              <div class="superpower-block love-superpower">
                <div class="superpower-text">Love</div>
                <div class="superpower-number">${loveNumber}</div>
                <div class="snowflakes love-snowflakes"></div>
              </div>
              <div class="superpower-block dream-superpower">
                <div class="superpower-text">Dream</div>
                <div class="superpower-number">${dreamNumber}</div>
                <div class="snowflakes dream-snowflakes"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
     `;
	},
};

const activeSnowflake = {
	render: () => {
		return `<img src="./images/icons/snowflake-active.svg" alt="snowflake-active">`;
	},
};

const inactiveSnowflake = {
	render: () => {
		return `<img src="./images/icons/snowflake-inactive.svg" alt="snowflake-inactive">`;
	},
};

export { bestCard, giftsCard, modal, activeSnowflake, inactiveSnowflake };
