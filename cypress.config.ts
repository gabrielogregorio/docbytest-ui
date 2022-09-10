import { defineConfig } from 'cypress';

export default defineConfig({
  video: false,

  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
      // eslint-disable-next-line global-require
      return require('./cypress/plugins/index.js')(on, config);
    },
  },
});
