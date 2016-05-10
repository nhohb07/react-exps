import express from 'express';
import axios from 'axios';

import {renderToString} from 'react-dom/server';
import {match, RoutingContext} from 'react-router';

const app = express();
const PORT = 6789;

app.use(express.static('build'));
app.set('views', __dirname + '/../templates');
app.set('view engine', 'ejs');

import routeManager from './route-manager';

routeManager.handle(app);

app.listen(PORT, () => {
  console.log('Listening on http://localhost:' + PORT);
});
