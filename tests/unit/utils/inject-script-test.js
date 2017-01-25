/* global Firebase */

import Ember from 'ember';
import { module, test } from 'qunit';
import injectScript from'ember-inject-script';

module('ember-inject-script');

const SELECTORS = {
  injectedScript: '.test__promise-script'
};

let getElementListeners = function($element) {
  return Object.keys(Ember.$._data($element[0], "events") || []);
};

test('It resolves on success and removes the script tag and listeners', function(assert) {
  assert.expect(5);
  let script;
  let done = assert.async();
  injectScript('https://cdn.firebase.com/js/client/1.1.0/firebase.js').then(() => {
    assert.ok(typeof Firebase !== 'undefined', 'The JS should have been injected into the page');
    assert.ok(Ember.isEmpty(getElementListeners(script)), 'The event listeners should be removed from the script element');
    assert.equal(Ember.$(SELECTORS.injectedScript).length, 0, 'The loading script tag should no longer be on the page');
    done();
  });
  script = Ember.$(SELECTORS.injectedScript);
  assert.equal(script.length, 1, 'There should be a script injected into the DOM after calling the function');
  assert.deepEqual(getElementListeners(script), ['load', 'error'], 'The correct event listeners should be on the inject script');
});

test('It rejects on error and removes the script tag and listeners', function(assert) {
  assert.expect(5);
  let script;
  let done = assert.async();
  injectScript('/assets/thisdoesntexist.js').catch((error) => {
    assert.equal(error.target.className, 'test__promise-script', 'The error should come from the injected script');
    assert.ok(Ember.isEmpty(getElementListeners(script)), 'The event listeners should be removed from the script element');
    assert.equal(Ember.$('.test__promise-script').length, 0, 'The loading script tag should no longer be on the page');
    done();
  });
  script = Ember.$(SELECTORS.injectedScript);
  assert.equal(script.length, 1, 'There should be a script injected into the DOM after calling the function');
  assert.deepEqual(getElementListeners(script), ['load', 'error'], 'The correct event listeners should be on the inject script');
});