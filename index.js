const API_URL =
  'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2404-FTB-MT-WEB-PT/events';

const state = {
  events: [],
  event: '',
};

// table of the parties - names, dates, locations, descriptions
const eventsList = document.querySelector('#events');
const addEventForm = document.querySelector('#partyForm');
addEventForm.addEventListener('submit', (e) => addOrEditEvent(e));

// fetch GET array of all the parties from the API
const retrieveAllEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    state.events = result;
    console.log(result);
    render();
  } catch (err) {
    console.log(err);
  }
};

// DELETE remove party from the list
const deleteEvent = async (deletedID) => {
  console.log(deletedId);
  try {
    response = await fetch(`${API_URL}/${deletedId}`, {
      method: 'DELETE',
    });
    const index = state.events.findIndex((event) => event.id === deletedId);
    if (index > -1) {
      state.events.splice(index, 1);
    }
    render();
  } catch (err) {
    console.log(err);
  }
};

// POST (name, date, location, description)
const createEvent = async (newEvent) => {
  console.log(newEvent);
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    });
    const result = await response.json();
    console.log('This is the result: ', result);
    state.events.push(result.data);
    render();
  } catch (err) {
    console.log(err);
  }
};

// render events to DOM
const render = async () => {
  const eventElements = [];
  if (!state.events.length) {
    const messageElement = document.createElement('p');
    messageElement.textContent = 'No parties found.';
    eventsList.append(messageElement);
    return;
  }
  for (let i = 0; i < state.events.length; i++) {
    const eventContainer = document.createElement('li');
    const eventName = document.createElement(h3);
    const eventDate = document.createElement('p');
    const eventLocation = document.createElement('p');
    const eventDescription = document.createElement('p');

    eventName.textContent = state.events[i].name;
    eventDate.textContent = state.events[i].date;
    eventLocation.textContent = state.events[i].location;
    eventDescription.textContent = state.events[i].description;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteEvent(state.events[i].id);
    });

    eventContainer.append(
      eventName,
      eventDate,
      eventLocation,
      eventDescription,
      deleteButton
    );
    eventElements.push(eventContainer);
  }
  eventsList.replaceChildren(...eventElements);
  eventsList.append(...eventElements);
};

// form submission
async function addOrEditEvent(e) {
  console.log(e.target);
  e.preventDefault();
  const newEventObj = {
    name: addEventForm.name.value,
    date: addEventForm.date.value,
    location: addEventForm.location.value,
    description: addEventForm.description.value,
  };
  createEvent(newEventObj);
  addEventForm.reset();
}

async function init() {
  await retrieveAllEvents();
  console.log(state);
  render();
}

init();

/*
  if(e.target.getAttribute("id")==="addEvent"){
    const newEventObj = {

    }
    createEvent(newEventObj)
  }else{

  }
}

const addForm = ()=>{
  const form = document.createElement("form")
  
  const nameLabel = document.createElement("label")
  const nameInput = document.createElement("input")

  const dateLabel = document.createElement("label")
  const dateInput = document.createElement("input")

  const locationLabel = document.createElement("label")
  const locationInput= document.createElement("input")

  const descriptionLabel = document.createElement("label")
  const descriptionInput= document.createElement("input")

  nameLabel.textContent = "Name"
  dateLabel.textContent = "Date"
  locationLabel.textContent = "Location"
  descriptionLabel.textContent = "Description"

  const addButton = document.createElement("button")
    addButton.textContent = "Submit"
    addButton.addEventListener("click",(event)=>{
      event.preventDefault()
      const newEvent = {
        name:nameInput.value,
        date:dateInput.value,
        location:locationInput.value,
        description:descriptionInput.value,
      }
      createEvent(newEvent)
      nameInput.value=""
      dateInput.value=""
      locationInput.value=""
      descriptionInput.value=""
    })
  form.append(nameLabel, nameInput, dateLabel, dateInput, locationLabel, locationInput, descriptionLabel, descriptionInput, addButton)
  addEventForm.append(form)
}

    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';
    viewButton.addEventListener('click', () => {
      deleteRecipe(state.events[i].id);
    });

  }
  eventsList.replaceChildren(...replaceElements);
};
*/
