'use strict';

import { getData } from './getData.js';
import { renderCards } from './render.js';
import { sortBy } from './sort.js';

const data = await getData();
renderCards(data);

const select = document.getElementById('shop__select');

select.addEventListener('input', (evt) => sortBy(evt, data));
