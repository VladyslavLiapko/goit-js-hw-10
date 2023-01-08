import './css/styles.css';
import fetchCountries from './fetchCountries.mjs';

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box');
const infoEl = document.querySelector('.country-info');

inputEl.addEventListener("input", (event) => {
    fetchCountries(inputEl.value);
});

