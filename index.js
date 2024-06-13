const API_URL =
  'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2404-FTB-MT-WEB-PT/events/';

const state = {
  events: [],
  event: '',
};

// table of the parties - names, dates, times, locations, descriptions
const eventsTable = document.querySelector('#events');
const addEventForm = document.querySelector('addEvent');
const button = document.querySelector('button');
addEventForm.addEventListener('submit', (e) => addOrEditEvent(e));

// fetch GET array of all the parties from the API
const retrieveAllEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    state.events = result.data;
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

// delete button next to each party

// event listener on form, trigger submit event

// DELETE remove party from the list
const deleteEvent = async (deletedID) => {
  console.log(deletedId);
  try {
    response = await fetch(`${API_URL}/${deletedId}`, {
      method: 'DELETE',
    });
    const index = state.events.findIndex((event) => event.id === deletedId);
    state.events.splice(index, 1);
    render();
  } catch (err) {
    console.log(err);
  }
};

// form to submit new party

// POST (name, date, time, location, description)
const createParty = async (newParty) => {
  console.log(newParty);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newParty),
    });
    const result = await response.json();
    console.log('This is the result: ', result);
    state.parties.push(result.data);
    render();
  } catch (err) {
    console.log(err);
  }
};

// event listener on form to add party to the list of parties

const render = async () => {
  const eventElements = [];
  console.log(state.events, 'here in render');
  for (let i = 0; i < state.events.length; i++) {
    const eventContainer = document.createElement('li');
    const eventName = document.createElement(h3);
    const eventDescription = document.createElement('p');
    const recipeImg = document.createElement('img');
    eventName.textContent = state.events[i].name;
    eventDate.textContent = state.date[i].date;
    eventTime.textContent = state.time[i].time;
    eventLocation.textContent = state.location[i].location;
    eventDescription.textContent = state.events[i].description;
    const deleteButton = document.createElement('button');
    deleteButton.addEventListener('click', () => {
      deleteEvent(state.events[i].id);
    });
    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';
    viewButton.addEventListener('click', () => {
      deleteRecipe(state.events[i].id);
    });
    eventContainer.append(
      eventName,
      eventDate,
      eventLocation,
      eventDescription,
      deleteButton
    );
  }
  eventsList.replaceChildren(...replaceElements);
};

async function addOrEditEvent (e){
  console.log(e.target)
  e.preventDefault()
  if(e.target.getAttribute("id")==="addEvent"){
    const newEventObj = {
      name: addEventForm.name.value,
      date: addEventForm.date.value 
      location: addEventForm.location.value
      description: addEventForm.description.value
    }
    createEvent(newEventObj)
  }else{

  }
}

const addForm = ()=>{
  const form = document.createElement("form")
  const nameLabel = document.createElement("label")
  const nameInput = document.createElement("input")
}