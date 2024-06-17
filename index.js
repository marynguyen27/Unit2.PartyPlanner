const API_URL =
  'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2404-FTB-MT-WEB-PT/events';

const state = {
  events: [],
  event: '',
};

// list of the parties - names, dates, locations, descriptions
const eventsList = document.querySelector('#events');
const addEventForm = document.querySelector('#partyForm');
addEventForm.addEventListener('submit', (e) => addOrEditEvent(e));

// fetch GET array of all the parties from the API
const retrieveAllEvents = async () => {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    console.log('API response (parsed):', result);
    state.events = result.data;
    console.log(result);
    render();
  } catch (err) {
    console.log(err);
  }
};

// DELETE remove party from the list
const deleteEvent = async (deletedId) => {
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
  console.log(state.events);
  if (state.events.length === 0) {
    console.log('No events fetched yet. Try fetching data first');
    return;
  }

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
    eventsList.replaceChildren(messageElement);
    return;
  }

  for (let i = 0; i < state.events.length; i++) {
    const event = state.events[i];

    const eventContainer = document.createElement('li');

    const eventName = document.createElement('h3');
    eventName.textContent = event.name;

    const eventDescription = document.createElement('p');
    eventDescription.textContent = event.description;

    const eventDate = document.createElement('p');
    eventDate.textContent = event.date;

    const eventLocation = document.createElement('p');
    eventLocation.textContent = event.location;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteEvent(event.id);
    });

    eventContainer.append(
      eventName,
      eventDescription,
      eventDate,
      eventLocation,
      deleteButton
    );
    eventElements.push(eventContainer);
  }
  if (eventElements.length) {
    eventsList.append(...eventElements);
  } else {
    console.error('No event elements created in render function.'); // Potential issue
  }
};

// form submission
async function addOrEditEvent(e) {
  console.log(e.target);
  e.preventDefault();

  const name = addEventForm.name.value;
  const description = addEventForm.description.value;
  const date = new Date(addEventForm.date.value).toISOString(); // Formatting the date
  const time = addEventForm.time.value;
  const location = addEventForm.location.value;

  const newEventObj = {
    name: name,
    description: description,
    date: date,
    location: location,
  };

  console.log('Adding new event:', newEventObj);

  await createEvent(newEventObj);
  addEventForm.reset();
}

async function init() {
  await retrieveAllEvents();
  console.log('State after fetching events:', state);
}

init();
