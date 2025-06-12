
const input = document.getElementById('location-input');
const suggestions = document.getElementById('suggestions');

const API_KEY = input.dataset.apiKey;

let timeoutId;
input.addEventListener('input', () => {
  clearTimeout(timeoutId);
  const q = input.value.trim();
  if (q.length < 2) {
    suggestions.innerHTML = '';
    return;
  }
  timeoutId = setTimeout(async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct` +
        `?q=${encodeURIComponent(q)}` +
        `&limit=5` +
        `&appid=${API_KEY}`
      );
      const cities = await res.json();
      suggestions.innerHTML = cities
        .map(c => `<li data-loc="${c.name}, ${c.state || ''}${c.state ? ', ' : ''}${c.country}">
                     ${c.name}${c.state ? ', ' + c.state : ''}, ${c.country}
                   </li>`)
        .join('');
    } catch (e) {
      console.error('Geo lookup failed', e);
    }
  }, 300);
});

suggestions.addEventListener('click', e => {
  if (e.target.tagName === 'LI') {
    input.value = e.target.dataset.loc;
    suggestions.innerHTML = '';
  }
});

document.addEventListener('click', e => {
  if (!input.contains(e.target)) suggestions.innerHTML = '';
});

