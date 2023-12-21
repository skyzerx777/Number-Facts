const type = document.querySelector('#typeList');
const number = document.querySelector('#numberInput');
const getButton = document.querySelector('#getButton');
const getRandomButton = document.querySelector('#getRandomButton');
const errorPlace = document.querySelector('#errorText');
const outputField = document.querySelector('#output');

function inputTypeChange(event) {
  if (event.target.value === 'date') {
    number.type = 'date';
  } else {
    number.type = 'number';
  }
}

function linkGenerator(type) {
  if (type === 'date') {
    let modifiedDate = number.value.slice(-5).replace('-', '/');
    return `http://numbersapi.com/${modifiedDate}/${type}`;
  }
  return `http://numbersapi.com/${number.value}/${type}`;
}

function getFact(event) {
  event.preventDefault();
  if (!number.value) {
    errorPlace.innerHTML = 'You must enter a number!';
    return;
  } else {
    if (errorPlace.innerHTML.length > 0) {
      errorPlace.innerHTML = '';
    }
  }

  const link = linkGenerator(type.value);

  const request = fetch(link, {
    method: 'GET',
  });
  request
    .then((value) => value.text())
    .then((value) => (outputField.innerHTML = value));
}

function getRandomFact(event) {
  event.preventDefault();
  if (errorPlace.innerHTML.length > 0) {
    errorPlace.innerHTML = '';
  }
  const request = fetch(`http://numbersapi.com/random/${type.value}`, {
    method: 'GET',
  });
  request
    .then((value) => value.text())
    .then((value) => (outputField.innerHTML = value));
}

type.addEventListener('input', inputTypeChange);
getButton.addEventListener('click', getFact);
getRandomButton.addEventListener('click', getRandomFact);
