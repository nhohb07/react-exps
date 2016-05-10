import React from 'react';
import { browserHistory, match, Router } from 'react-router';
import { render } from 'react-dom';
import routes from './routes';

const { pathname, search, hash } = window.location;
const location = `${pathname}${search}${hash}`;

match({ routes, location }, () => {
	console.log(routes);
  render(
    <Router routes={routes} history={browserHistory} />,
    document.getElementById('app')
  )
});