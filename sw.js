self.addEventListener('install', function(evt) {
  console.log('install event');
});

self.addEventListener('active', function(evt) {
  console.log('active event');
});

self.addEventListener('fetch', function(evt) {
  console.log('fetch: ' + evt.request.url);

  console.log('hmm ' + evt.request.url.endsWith('opaque'));

  if (evt.request.url.endsWith('opaque')) {
    console.log('responding with example.com opaque response');
    evt.respondWith(fetch('https://example.com', { mode: 'no-cors' }));
    return;
  }

  if (evt.request.url.endsWith('error')) {
    console.log('responding with example.com error response');
    evt.respondWith(Response.error());
    return;
  }

  if (evt.request.url.endsWith('used')) {
    console.log('responding with example.com used response');
    var response = new Response('hello world');
    response.text();
    evt.respondWith(response);
    return;
  }

  if (evt.request.url.endsWith('canceled')) {
    evt.preventDefault();
    return;
  }

  if (evt.request.url.endsWith('rejected')) {
    evt.respondWith(Promise.reject('disaster!'));
    return;
  }

  if (evt.request.url.endsWith('throws')) {
    throw(new Error('boom'));
  }
});
