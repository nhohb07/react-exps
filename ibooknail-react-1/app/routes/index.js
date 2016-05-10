module.exports.rootRoute = {
  component: 'div',
  childRoutes: [{
    path: '/',
    requireAuth: true,
    title: 'iBookNail - Home',
    component: require('../components/layout'),
    childRoutes: [
      require('./user'),
    ]
  }]
};