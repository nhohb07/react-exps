import express from 'express';
import axios from 'axios';
import Request from '../services/request';

import React from 'react'
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';

import baseManager from './base-manager';
import routes from '../routes';

import ContextWrapper from '../components/ContextWrapper';

const routeManager = Object.assign({}, baseManager, {
  configureDevelopmentEnv(app) {
    const pagesRouter = this.createPageRouter();
    app.use('/', pagesRouter);
  },

  createPageRouter() {
    const router = express.Router();

    router.get('*', (req, res) => {
      match({routes, location: req.originalUrl}, (err, redirectLocation, renderProps) => {
        const {promises, components} = this.mapComponentsToPromises(renderProps.components, renderProps.params);

          Promise.all(promises).then((values) => {
            const data = this.prepareData(values, components);
            const html = this.render(renderProps, data);

            res.render('index', {
              content: html,
              context: JSON.stringify(data)
            });
          }).catch((err) => {
            console.log(err);
            res.status(500).send(err);
          });
        });
      });

      return router;
    },

    mapComponentsToPromises(components, params) {
      const filteredComponents = components.filter((Component) => {
        return (typeof Component.requestData === 'function');
      });

      const promises = filteredComponents.map(function(Component) {
        return Component.requestData(params);
      });

      return {promises, components: filteredComponents};
    },

    prepareData(values, components) {
      const map = {};

      values.forEach((value, index) => {
        map[components[0].NAME] = value.data;
      });

      return map;
    },

    render(renderProps, data) {
      let html = renderToString(
        <ContextWrapper data={data}>
          <RouterContext {...renderProps}/>
        </ContextWrapper>
      );

      return html;
    }
  });

  export default routeManager;
