Package.describe({
  name: 'evenfrost:spacekit',
  version: '0.0.1',
  summary: 'A Spacebars helpers kit',
  git: 'https://github.com/evenfrost/spacekit',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    // 'blaze',
    'templating',
    'session',
    'underscore'
  ], 'client');

  api.addFiles('spacekit.js', 'client');
});

Package.onTest(function (api) {
  api.use('tinytest');
  api.use('evenfrost:spacekit');
  api.addFiles('spacekit-tests.js');
});
