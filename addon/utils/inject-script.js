import Ember from 'ember';

let removeListenersAndElement = function(element) {
  Ember.$(element).off('load');
  Ember.$(element).off('error');
  element.parentNode.removeChild(element);
};

export default function(url) {
  return new Ember.RSVP.Promise((resolve, reject) => {
    let script = document.createElement('script');
    document.head.appendChild(script);
    Ember.$(script).on('load', () => {
      removeListenersAndElement(script);
      resolve();
    });
    Ember.$(script).on('error', (error) => {
      removeListenersAndElement(script);
      reject(error);
    });
    script.asnyc = true;
    script.type = 'text/javascript';
    script.classList.add('test__promise-script');
    script.src = url;
  });
}
