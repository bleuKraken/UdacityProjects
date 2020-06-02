const testApplication = require('./application.js');
const testAPI = require('../../server/mockAPI.js');

test('Checks event value', () => {
  expect(testApplication).toBeDefined();
});

test('Checks mockAPI', () => {
  expect(testAPI).toBe("Greeting from the mockAPI");
});
