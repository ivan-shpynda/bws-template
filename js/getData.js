'use strict';

const URL = 'https://ivan-shpynda.github.io/cards-info/data.json';

export async function getData() {
  try {
    const res = await fetch(URL);
    const { products } = await res.json();

    return products;
  } catch (error) {
    console.log(error);
  }
}
