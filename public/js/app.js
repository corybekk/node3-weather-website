console.log('client side js has loaded')

// retrieve form input from index page. 
const weatherForm = document.querySelector('form') //select the element we are trying to work with. it will always grab the first occrence
const search = document.querySelector('input')
const messageOne = document.querySelector('#message1') //grab the element <p> with id = "message1"
const messageTwo = document.querySelector('#message2')

// messageOne.textContent ='from javascript'

weatherForm.addEventListener('submit', (e) => {  // e for event
    e.preventDefault() //prevents default browser behavior. aka preventing page refresh after submit
    
    const location = search.value
    messageTwo.textContent = 'loading...'

    //** call the weather page to get location forecast **//
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error){
                messageTwo.textContent = data.error // populate <p> tag with data
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
                // console.log(data.location)
            }
        })
    }) 
})