import Ember from 'ember';

export default function injectScript(src) {
  return new Ember.RSVP.Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.getElementsByTagName('head')[0].appendChild(script);
  });
}
