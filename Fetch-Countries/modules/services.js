const url = 'https://restcountries.com/v3.1/all?fields=name,flags,region,capital,population,languages,currencies,timezones'

// export function fetchCountries() {
//     return fetch(url)
//         .then(response => response.json())
//         .then(data => data)
// }

export const fetchCountries = async () => {
    // const response = await fetch(url)
    // const data = await response.json()
    // return response.json()
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Error en el request: ' + response.status)
        }
        return response.json()
    } catch (error) {
        console.error(error)
    }
}