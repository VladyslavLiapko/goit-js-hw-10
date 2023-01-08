import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import './css/styles.css';

const countryListRef = document.querySelector('.country-list');

const fetchCountries = debounce(async (name) => {
    countryListRef.innerHTML = "";
    const bastURL = 'https://restcountries.com/v3.1/name/';
    const fields = "?fields=name,capital,currencies,flags,population,languages";
    
    return fetch(bastURL + name.trim() + fields)
    .then((data) => data.json())
    .then((data) => renderCountriesList(data))
    .catch((error) => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
    });
}, 300);


function renderCountriesList(countriesData) {
    const resLength = countriesData.length;
    if (resLength > 10) {
        Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
    } else if (resLength >= 2 && resLength <= 10){
        const markup = countriesData.map((country) => {
                return `<li>
                            <div id="country-flag-and-name">
                                <div>
                                    <img src="${country.flags.svg}" alt="${country.name.official}" width ="45"/>
                                </div>
                                <div id="country-official-name">
                                    <p>${country.name.official}</p>
                                </div>
                            </div>
                        </li>`;
            })
            .join("");
            countryListRef.innerHTML = markup;
    } else {
        const markup = countriesData.map((country) => {
                var dictVal = Object.keys(country.languages).map(key => country.languages[key]);
                let languages = dictVal.join(", ");

                return `<li>
                            <div id="country-flag-and-name">
                                <div>
                                    <img src="${country.flags.svg}" alt="${country.name.official}" width ="45"/>
                                </div>
                                <div id="country-official-name">
                                    <h1>${country.name.official}</h1>
                                </div>
                            </div>
                        </li>
                        <li>
                            <b>Capital:</b> ${country.capital[0]}
                        </li>
                        <li>
                            <b>Popultaion:</b> ${country.population}
                        </li>
                        <li>
                            <b>Languages:</b> ${languages}
                        </li>`;
            })
            .join("");
            countryListRef.innerHTML = markup;
    }
}

export default fetchCountries;
