const testApplication = require('./application.js');
const testAPI = require('../../server/mockAPI.js');

// TODO: ADD JEST TESTING
test('Checks mockAPI', () => {
  expect(testAPI).toBe("Greeting from the mockAPI");
});
