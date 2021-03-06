// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

import App from '../components/App';
import Home from '../components/Home';

export default {
  path: '/',
  component: App,
  getChildRoutes(location, cb) {
    require.ensure([], (require) => {
      cb(null, [
        require('./routes').ListYourSalon
      ])
    })
  },
  indexRoute: {
    component: Home
  }
}
