import{ checkValidUrl } from './checkValidUrl';

// Uses Jest to test a real url and a false url
test('Testing a real URL', () => {
  expect(checkValidUrl("https://unsplash.com")).toBe("https://unsplash.com");
  expect(checkValidUrl("RandomStringText")).toBe(undefined);
});
