const Weatherform = document.querySelector('form');
const inputForm = document.querySelector('#inputForm');
const messageOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
Weatherform.addEventListener('submit', (e)=> {
    e.preventDefault();

    const location = inputForm.value;

    messageOne.textContent = 'Loading...'; 
    messageTwo.textContent = '';  

    fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
        if(data.error) {
            messageOne.textContent = data.error;
        } else {
            messageOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
        console.log(data);
    })
})
})

