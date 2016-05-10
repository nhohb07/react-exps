const baseManager = {
  handle(app) {
    this.configureCommon(app);
    this.configureDevelopmentEnv(app);
  },

  configureCommon(/*app*/) {},

  configureProductionEnv(/*app*/) {},

  configureDevelopmentEnv(/*app*/) {}
};

export default baseManager;
