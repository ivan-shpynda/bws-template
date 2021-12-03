'use strict';

export function renderCards(cards) {
  let html = '';

  cards.forEach(({sale, image, title, price}) => {
      const isSale = sale ? `<div class="card__sale card__sale-shop">Sale</div>` : '';
      let htmlSegment = `<div class="trends__card card">
                            <img
                            src=${image}
                            alt="trends1"
                            width="304"
                            height="320"
                            class="card__img"
                          />
                          ${isSale}
                          <h3 class="card__title">${title}</h3>
                          <div class="card__buttom">
                            <div class="card__price">${price}</div>
                            <div class="card__heart-wrapper">
                              <span class="card__heart-icon"></span>
                            </div>
                            <div class="card__cart-wrapper">
                              <span class="card__cart-icon"></span>
                            </div>
                          </div>
                        </div>`;

      html += htmlSegment;
  });

  const container = document.querySelector('.shop__cards');
  container.innerHTML = html;

  // hearts functionality
  container.onclick = function(event) {
    const target = event.target.closest(".card__heart-wrapper");
    if (target) {
      target.firstElementChild.classList.toggle('card__heart-icon');
      target.firstElementChild.classList.toggle('card__heartToggled-icon');
    }
  }
}
