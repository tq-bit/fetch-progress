// Import the fetch client and initalize it
import http from './client.js';

// Grab the DOM elements
const progressbar = document.getElementById('progress-bar');
const progressbutton = document.getElementById('fetch-button');
const abortbutton = document.getElementById('abort-button');
const progresslabel = document.getElementById('progress-label');
const { json, cancel } = http('http://universities.hipolabs.com/');

const setProgressbarValue = (payload) => {
  const { received, length, loading } = payload;
  const value = ((received / length) * 100).toFixed(2);
  progresslabel.textContent = `Download progress: ${value}%`;
  progressbar.value = value;
};

// Bind the fetch function to the button's click event
progressbutton.addEventListener('click', async () => {
  const universities = await json('search?country=United+States');
  console.log(universities);
});

abortbutton.addEventListener('click', () => {
  cancel()
  alert('Request has been cancelled')
})

window.addEventListener('fetch-progress', (e) => {
  setProgressbarValue(e.detail);
});

window.addEventListener('fetch-finished', (e) => {
  setProgressbarValue(e.detail);
});