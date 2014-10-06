/* global Firebase */

import injectScript from 'ember-inject-script';

module('ember-inject-script');

asyncTest('loads an external JS file and returns an promise', function() {
  expect(1);
  injectScript("https://cdn.firebase.com/js/client/1.1.0/firebase.js").then(function() {
    ok(Firebase, "Firebase has been loaded");
    start();
  });
});
