# ember-inject-script

Inject 3rd party scripts into your ember-cli app, for example `mixpanel`, `Typekit` etc...

## Installation

Install as an Ember CLI addon:

```
npm install --save-dev ember-inject-script
```

## Usage

For example, lets configure Typekit.

`loadScript` returns a promise, so we can simply load in the Typekit JS and, when it's ready, call `Typekit.load()`:

```javascript
/* global Typekit */

import injectScript from 'ember-inject-script';
import config from 'your-app/config/environment';

export default {
  name: 'typekit',
  initialize: function() {
    var url = "//use.typekit.net/"+config.typekitID+".js";
    injectScript(url).then(function() {
      Typekit.load();
    });
  }
};
```

## Developing

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
