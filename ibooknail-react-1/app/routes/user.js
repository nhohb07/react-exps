module.exports = {
  path: 'user',
  requireAuth: true,

  getComponent(location, cb) {
    require.ensure([], (require) => {
      cb(null, require('../components/user/user'))
    })
  }
};