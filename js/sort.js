'use strict';

import { renderCards } from "./render.js";

export function sortBy(evt, data) {
  const option = evt.target.selectedIndex;

  switch (option) {
    case 1:
      data.sort((card1, card2) => card2.price - card1.price);
      break;
    case 2:
      data.sort((card1, card2) => card1.price - card2.price);
      break;
    case 3:
      data.sort((card1, card2) => card1.title.localeCompare(card2.title));
      break;
    default:
      data.sort((card1, card2) => card2.id - card1.id);
      break;
  }

  renderCards(data);
}
