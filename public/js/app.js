
fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#successMessage')
const messageTwo = document.querySelector('#failedMessage')



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error)
            {
                messageOne.textContent = ''
                messageTwo.textContent = data.error
            }else {
                messageOne.textContent = data.forecast
                messageTwo.textContent = data.location
            }
        })
    })
})