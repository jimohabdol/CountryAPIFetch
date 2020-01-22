//Get countries from api call
//variables
const btnToggle = document.getElementById("btn-toggle");
const dropdown = document.getElementById("dropdown");
const search = document.getElementById('search');
const regions = dropdown.querySelectorAll('li');
const modal = document.getElementById('myModal');
const close = document.getElementById("close");

getCountries();

async function getCountries() {
   const countriesAPI = await fetch("https://restcountries.eu/rest/v2/all")
   //convert countriesAPI result to json
   const countries = await countriesAPI.json();

   printContries(countries);
}

function printContries(countries) {
  // let HTMLTemplate = '';
  countries.forEach(country => {
  let countryDiv = document.createElement('div');
  countryDiv.classList.add("country-card");
    let HTMLTemplate = `
        <div>
          <img src="${country.flag}" alt="${country.name}">
        </div>
        <div class="country-card-body">
          <h2 class="country-name">${country.name}</h2>
          <p><strong>Population: </strong><span>${country.population}</span></p>
          <p class="region"><strong>Region: </strong><span>${country.region}</span></p>
          <p><strong>Capital: </strong><span>${country.capital}</span></p>
        </div>
      </div>
    `;
    countryDiv.innerHTML = HTMLTemplate;
    countryDiv.addEventListener('click', ()=>{
      modal.style.display = 'flex';
      modalCountryInfo(country);
    })
    document.getElementById('countries').appendChild(countryDiv);
  });

}

function modalCountryInfo(country) {
  const modalInfo = modal.querySelector('#modal-info');
  const modalInf = modal.querySelector('#modal-inf');
  const modalImg = modal.querySelector('img');

  modalImg.src = country.flag;
  modalInfo.innerHTML = `
  <h2>${country.name}</h2>
  <p><strong>Native: </strong><span>${country.nativeName}</span></p>
  <p><strong>Population: </strong><span>${country.population}</span></p>
  <p><strong>Region: </strong><span>${country.region}</span></p>
  <p><strong>Sub Region: </strong><span>${country.subregion}</span></p>
  <p><strong>Top Level Domain: </strong><span>${country.topLevelDomain[0]}</span></p>
  <p><strong>Currencies: </strong><span>${country.currencies.map(currency => currency.name)}</span></p>
  `;
  modalInf.innerHTML = `
  <p><strong>Langauge: </strong><span>${country.languages.map(language => language.name)}</span></p>
  <p><strong>Border Countries: </strong><span>${country.borders.map(border => border)}</span></p>
  <p><strong>Capital: </strong><span>${country.capital}</span></p>
  `;
}

//dark Mode

btnToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('dark');
})

dropdown.addEventListener('click', ()=>{
  console.log("Click");
  dropdown.classList.toggle('open');
})

close.addEventListener('click', ()=>{
  modal.style.display = 'none';
})

search.addEventListener('input', e => {
  const result = e.target.value;
  const list = document.querySelectorAll('.country-name')
  list.forEach(country => {
    if (country.innerHTML.toLowerCase().includes(result.toLowerCase())) {
      country.parentElement.parentElement.style.display = 'block';
    }else {
      country.parentElement.parentElement.style.display = 'none';
    }
  })
})

regions.forEach(region => {
  region.addEventListener("click", () => {
    const list = document.querySelectorAll('.region')
    list.forEach(r => {
      if (r.innerHTML.includes(region.innerHTML)) {
        r.parentElement.parentElement.style.display = 'block';
      }else {
        r.parentElement.parentElement.style.display = 'none';
      }
    })
  })
})
