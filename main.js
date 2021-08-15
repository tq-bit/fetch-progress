import http from './client.js';
const progressbar = document.getElementById('progress-bar');
const progressbutton = document.getElementById('fetch-button');
const abortbutton = document.getElementById('abort-button');
const progresslabel = document.getElementById('progress-label');

const client = http('http://universities.hipolabs.com/');

window.addEventListener('fetch-progress', (e) => {
  const { received, length, loading } = e.detail;
  const value = ((received / length) * 100).toFixed(2);
  progresslabel.textContent = `Download progress: ${value}%`;
  progressbar.value = value;
});

window.addEventListener('fetch-finished', (e) => {
  const { received, length, loading } = e.detail;
  const value = ((received / length) * 100).toFixed(2);
  progresslabel.textContent = `Download progress: ${value}%`;
  progressbar.value = value;
});

progressbutton.addEventListener('click', async () => {
  try {
    const test = await client.json('search?country=United+States');
    console.log(test);
  } catch (error) {
    console.log(error);
  }
});

abortbutton.addEventListener('click', () => {
  client.cancel()
  alert('Request has been cancelled')
})