import { fetchCountries } from './services.js'
import { renderCountries } from './utils.js'

const searchInput = document.querySelector('.app__search')
const filterSelect = document.querySelector('.app__filter')
const scrollTopButton = document.querySelector('.app_scrolltop')


let countryData = []

searchInput.addEventListener('input', (event) => {
    const value = event.target.value
    const filteredCountries = countryData.filter(country => {
        const loweredName = country.name.common.toLowerCase()
        const joinedCapital = country.capital.join(',')
        const loweredCapital = joinedCapital.toLowerCase()
        const loweredValue = value.toLowerCase()

        return loweredName.includes(loweredValue) || loweredCapital.includes(loweredValue)
    })
    renderCountries(filteredCountries)

})

filterSelect.addEventListener('input', (event) => {
    const value = event.target.value

    const filteredCountryByRegion = countryData.filter(country => {
        const loweredValue = country.region.toLowerCase()
        const loweredRegion = value.toLowerCase()
        return loweredValue.includes(loweredRegion)
    })
    renderCountries(filteredCountryByRegion)

})

document.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopButton.style.visibility = 'visible'
        scrollTopButton.style.opacity = 1
    } else {
        scrollTopButton.style.visibility = 'hidden'
        scrollTopButton.style.opacity = 0
    }
})

document.addEventListener('DOMContentLoaded', async () => {
    const iconTheme = document.querySelector('.app__theme')
    iconTheme.onclick = function (event) {
        document.body.classList.toggle("dark-theme")
    }

    const data = await fetchCountries()
    countryData = data
    renderCountries(data)

    scrollTopButton.style.visibility = 'hidden'
    scrollTopButton.style.opacity = 0

    const countryMoreInfoButton = document.querySelectorAll('.country__moreinfo')
    const dialog = document.querySelector('.app__dialog')
    const dialogBody = document.querySelector('.dialog__body')
    const dialogClose = document.querySelector('.dialog__close')

    countryMoreInfoButton.forEach(moreInfoButton => {
        moreInfoButton.addEventListener('click', (event) => {
            const { countryName } = event.target.dataset
            const countryFound = countryData.find(
                country => country.name.common === countryName
            )

            const { flags: { svg }, name: { official }, capital, languages, currencies, timezones } = countryFound
            // languages.map().join(',')
            const parsedLanguages = Object.values(languages).splice(0, 3)
            const parsedCurrencies = Object.values(currencies)
                .map(currency => `${currency.name}, (${currency.symbol})`)
                .join(', ')

            dialogBody.innerHTML = `
                <img src="${svg}" width="400" heigth="200"/>
                <h2 class="country__name">${official}</h2>
                <p class="country__description"><strong>Language(s): </strong> ${parsedLanguages}</p>
                <p class="country__description"><strong>Capital: </strong> ${capital}</p>
                <p class="country__description"><strong>Currencies: </strong>${parsedCurrencies}</p>
                <p class="country__description"><strong>Timezone(s): </strong>${timezones}</p>
            
            `

            dialog.showModal()
        })
    });

    dialogClose.addEventListener('click', (event) => {
        dialog.close()

    })
})