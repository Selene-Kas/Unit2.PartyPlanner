const BASE_URL = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/$%7BCOHORT%7D/events';

const mainEl = document.querySelector('main');
const formEl = document.querySelector('form');
const eventName = document.getElementById('eventName');
const description = document.getElementById('description');
const eventDate = document.getElementById('eventDate');
const eventLocation = document.getElementById('eventLocation');

async function getEvents() {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        console.log(data.data);
        return data.data;
    } catch (err) {
        console.error(err);
    }
}
/** Render Events */
function render(events) {
    /*if (!state.events.length) {
        e.innerHTML = "<li>No events.</li>";
        return;
      }*/
    const template = events.map(event => {
         return (
             `<section>
               <h2>${event.name}</h2>
               <p>${event.description}</p>
               <h3>${event.date}</h3>
               <p>${event.location}</p>
               <button data-id="${event.id}">Delete Recipe</button> 
             </section>`
         )
    }).join('');
    mainEl.innerHTML = template;
 }

 async function eventApp() {
    const events = await getEvents();
    render(events);
 }
 eventApp();

 formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
        await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify ({
                name: eventName.value,
                description: description.value,
                date: eventDate.value,
                location: eventLocation.value,
            })
        });
    //Clear all the form fields 
    eventName.value = '';
    description.value = '';
    eventDate.value = '';
    eventLocation.value = '';

    eventApp(); 
    if (!response.ok) {
        throw new Error("Failed to create artist");
      }   
    } catch (err) {
        console.error(err);
    }
 });

mainEl.addEventListener('click', async (e) => {
    if(e.target.matches('button')) {
        const id = e.target.dataset.id;
        await fetch(`${BASE_URL}/${id}`, {
            method: 'DELETE',
        });
        eventApp();
    }
})