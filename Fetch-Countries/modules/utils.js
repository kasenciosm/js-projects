export const renderCountries = function (countries) {
    console.log(countries)
    const countryListElement = document.querySelector('.app__list')
    const moreInfoCountry = document.querySelector('.dialog__body')

    let countryList = ''
    let countryInfo = ''

    if (countries.length === 0) {
        countryListElement.classList.add('app__list--no-found')
        countryListElement.innerHTML = `
                <img src="./images/sad-emoji.svg"/>
                Sorry, No results found!
        `
        return
    }

    countryListElement.classList.remove('app__list--no-found')

    countries.forEach(country => {
        // console.log(country)
        countryList += `
        <div class= "country">
            <img class="country__flag" src="${country.flags.png}" alt="${country.name.common}" />
            <div class="country__wrapper">
                <h2 class="country__name">
                    ${country.name.common}
                </h2>
                <div class="country__description">
                    <strong>Population:</strong> ${formatNumber(country.population)}
                </div>
                <div class="country__description">
                    <strong>Region:</strong> ${country.region}
                </div>
                <div class="country__description">
                    <strong>Capital:</strong> ${country.capital}
                </div>
                <button class="country__moreinfo" data-country-name="${country.name.common}">More Info</button>
            </div>
     </div>`
    })

    countryListElement.innerHTML = countryList

}



const formatNumber = (number) => {
    return new Intl.NumberFormat('es-PE').format(number)
}
