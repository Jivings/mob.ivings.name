requirejs.config({
  baseUrl: 'javascripts',
  shim: {
    'backbone': {
      deps: 'underscore',
      exports: 'Backbone'
    },
    'underscore': {
      exports: '_'
    }
  },
  paths: {
    app: './app'
  }
});

requirejs(['app/skills'], function ( skills ) {
});