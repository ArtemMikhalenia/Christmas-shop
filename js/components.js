const bestCard = {
	render: (imageSrc, imageAlt, categoryTag, category, name) => {
		return `
        <div class="best-card">
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

const modal = {
	render: (
		background,
		title,
		text,
		sSize,
		mSize,
		lSize,
		additiveOne,
		additiveTwo,
		additiveThree,
		price,
		sSizeValue,
		mSizeValue,
		lSizeValue,
		additiveOnePrice,
		additiveTwoPrice,
		additiveThreePrice
	) => {
		return `
     <div class="modal">
        <div class="modal-body">
           <div class="modal-left">
              <div class="item-background ${background}"></div>
           </div>
           <div class="modal-right">
              <h3>${title}</h3>
              <p>${text}</p>
              <div class="size-block">
                 <h4>Size</h4>
                 <form class="size-buttons">
                    <input type="radio" class="radio" name="size" id="small" checked>
                    <label data-set="S" class="price-label selected" data-price="${sSizeValue}" for="small">${sSize}</label>
                    <input type="radio" class="radio" name="size" id="medium">
                    <label data-set="M" class="price-label" data-price="${mSizeValue}" for="medium">${mSize}</label>
                    <input type="radio" class="radio" name="size" id="large">
                    <label data-set="L" class="price-label" data-price="${lSizeValue}" for="large">${lSize}</label>
                 </form>
              </div>
              <div class="additives-block">
                 <h4>Additives</h4>
                 <form class="additives-buttons">
                    <input type="checkbox" class="checkbox" name="additives" id="first">
                    <label data-set="1" for="first" data-price="${additiveOnePrice}" class="price-label add">${additiveOne}</label>
                    <input type="checkbox" class="checkbox" name="additives" id="second">
                    <label data-set="2" for="second" data-price="${additiveTwoPrice}" class="price-label add">${additiveTwo}</label>
                    <input type="checkbox" class="checkbox" name="additives" id="third">
                    <label data-set="3" for="third" data-price="${additiveThreePrice}" class="price-label add">${additiveThree}</label>
                 </form>
              </div>
              <div class="price-block">
                 Total:
                 <span class="total-price">$${price}</span>
              </div>
              <div class="alert-block">
                 <img src="./images/menu-page/info-empty.svg" alt="info-empty">
                 <p>The cost is not final. Download our mobile app to see the final price and place your order. Earn
                    loyalty points and enjoy your favorite coffee with up to 20% discount.</p>
              </div>
              <button class="close-btn">Close</button>
           </div>
        </div>
     </div>
     `;
	},
};

export { bestCard, modal };
