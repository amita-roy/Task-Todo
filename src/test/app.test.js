import App from '../components/app';

const app = new App();

test('should return 0 as an active project index', () => {
  expect(app.getActiveProjectIndex()).toBe(0);
});
