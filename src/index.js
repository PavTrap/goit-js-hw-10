import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';


const DEBOUNCE_DELAY = 300;

const inputElem = document.querySelector('#search-box');
const countryListElem = document.querySelector('.country-list');
const countryInfoElem = document.querySelector('.country-info');

const body = document.querySelector('body');
body.style.display = 'flex';
body.style.flexDirection = 'column';
body.style.alignItems = 'center';
body.style.textAlign = 'center';


inputElem.addEventListener('input', debounce(handlerCountrySearch, DEBOUNCE_DELAY, { trailing: true }));


  //------------------------------функція на введення із debounce------------------------------//
  function handlerCountrySearch(e) {
    //заборона перевантаження сторінки
    e.preventDefault();

    //------------------------------у місці введення беремо дані------------------------------//
    const searchedCountry = e.target.value.trim();

    countryListElem.innerHTML = '';
	 countryListElem.style.listStyle = 'none';

    countryInfoElem.innerHTML = '';
	 countryInfoElem.style.listStyle = 'none';

    //------------------------------якщо порожня стрічка виходимо------------------------------//
    if (!searchedCountry) {
      countryListElem.innerHTML = '';
      countryInfoElem.innerHTML = '';
      return;
    }

    //------------------------------запуск функції із зовнішнього файлу, яка приймає введені дані------------------------------//
    fetchCountries(searchedCountry)
      .then(result => {
      if (result.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name');
        return;
      }
      foundCountries(result);
    })
      .catch(error => {
        countryListElem.innerHTML = '';
        countryInfoElem.innerHTML = '';
        Notiflix.Notify.failure('Oops, there is no country with that name');
      })
  };

//------------------------------приймаємо результати------------------------------//
function foundCountries(result) {
  //------------------------------перевіряємо кількість знайдених даних------------------------------//
  let inputData = result.length;

  //------------------------------якщо знайдено від 2-10, ми виводимо просту розмітку------------------------------//
  if (inputData >= 2 && inputData <= 10) {
    const mark = result
    .map(res => {
      return `<li>
      <img src="${res.flags.svg}" alt="Flag of ${res.name.official}" width="30" hight="20">
        <p><b>${res.name.official}</b></p>
      </li>`;
    })
    .join('');
    countryListElem.innerHTML = mark;

  //------------------------------якщо знайдено 1 результат, ми виводимо розширену розмітку------------------------------//
        } else if (inputData === 1) {

    const mark = result
    .map(res => {
      return `<li>
      <img src="${res.flags.svg}" alt="Flag of ${res.name.official}" width="30" hight="20">
        <p><b>${res.name.official}</b></p>
        <p>Capital: ${res.capital}</p>
        <p>Population: ${res.population}</p>
        <p>Languages: ${Object.values(res.languages)} </p>
      </li>`;
    })
    .join('');
    countryListElem.innerHTML = mark;
        }
};

