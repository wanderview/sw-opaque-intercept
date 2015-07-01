self.addEventListener('install', function(evt) {
  console.log('install event');
});

self.addEventListener('active', function(evt) {
  console.log('active event');
});

self.addEventListener('fetch', function(evt) {
  console.log('fetch: ' + evt.request.url);

  if (evt.request.url.endsWith('fake.html')) {
    console.log('responding with example.com opaque response');
    evt.respondWith(fetch('https://example.com', { mode: 'no-cors' }));
  }
});
