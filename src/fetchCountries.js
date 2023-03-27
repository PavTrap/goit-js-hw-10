// const BASE_URL = 'https://restcountries.com/v3.1/name/'
// const fields = 'fields=name,capital,population,flags,languages'

// export function fetchCountries(name) {
//   return fetch(`${BASE_URL}${name}?${fields}`)
//     .then(response => response.json())
//     .catch(error => console.log(error))
// };
export const fetchCountries = function (name) {
  return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (response.status === 404) {
        return[];
      }
      return response.json();
    })
    .catch(error => {
      console.error(error);
    });
};