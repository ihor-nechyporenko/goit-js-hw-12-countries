import './styles.scss';
import refs from './js/refs';
import API from './js/fetch-countries';
import countryCardTpl from './tamplates/country-card.hbs';
import countryListTpl from './tamplates/country-list.hbs';
import { warningNotice, errorNotice, clarificationNotice, successNotice } from './js/notice';

const _ = require('lodash.debounce');

refs.searchInput.addEventListener('input', _(onSearh, 500));

function onSearh(e) {
    API.fetchCountryByName(e.target.value)
        .then(dataProcessing)
        .catch(error => {
            removeMarkup();
            errorNotice();
        });
}

function dataProcessing(country) {
    removeMarkup()
    if (country.length > 10) {
        warningNotice();
    } else if (country.length >= 2) {
        renderCountryList(country);
        clarificationNotice();
    } else {
        renderCountryCard(country);
        successNotice();
    };
};

function renderCountryList(country) {
    const countryListMarkup = countryListTpl(country);
    refs.card.insertAdjacentHTML('beforeend', countryListMarkup);
};

function renderCountryCard(country) {
    const countryCardMarkup = countryCardTpl(country[0]);
    refs.card.insertAdjacentHTML('beforeend', countryCardMarkup);
};

function removeMarkup() {
    refs.card.innerHTML = '';
};

