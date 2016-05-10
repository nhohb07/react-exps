import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute } from 'react-router';

// redux
import { connect } from 'react-redux';
import { fetchNavItemsIfNeeded } from '../actions/nav-items-actions';

// history
import createBrowserHistory from 'history/lib/createBrowserHistory';
const history = createBrowserHistory();

import App from '../containers/app/App';
import Home from '../containers/home/Home';
import NotFound from '../containers/misc/NotFound';

class Routes extends Component {

  constructor() {
    super();
    this.state = {
      routes: []
    };
  }

  fetchMenuSystem(data) {
    const self = this;
    const currRoutesState = this.state.routes;
    const routes = data === undefined ? this.props.navItems : data;

    routes.map((route) => {
      // set paths up first
      let currPaths = [];
      if (route.paths !== undefined) {
        currPaths = route.paths;
      } else {
        currPaths.push(route.linkTo);
      }
      // Components - first check for ecomMods
      let currComponent;
      if (route.ecomMod !== undefined) {
        currComponent = require('../containers/' + route.ecomMod);
        // clear out currPath if this is an ecom Module
        // and start a new currPaths array
        currPaths = [];
        if (route.parentId === null) {
          currPaths.push(route.ecomMod);
        } else {
          currPaths.push(route.ecomMod + '/:id');
        }
      } else {
        currComponent = require('../containers/' + route.component);
      }

      currPaths.map((currPath, idx) => {
        const props = { key: idx, path: currPath, component: currComponent };
        currRoutesState.push(<Route { ...props } />);
      });

      if (route.childNodes !== undefined) {
        self.fetchMenuSystem(route.childNodes);
      }
    });
    return currRoutesState;
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const clientId = '7B3E7eWWPizd11n';
    dispatch(fetchNavItemsIfNeeded(clientId));
  }

  render() {
    if (!this.props.navItems) return <div>Loading ...</div>;
    return (
      <Router history={ history }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Home }/>
          { this.fetchMenuSystem() }
          <Route path="*" component={ NotFound }/>
        </Route>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  const { navItemsPerClient } = state;
  if (!navItemsPerClient) {
    return {
      isFetching: false,
      didInvalidate: false,
      navItems: [],
      error: null
    };
  }

  return {
    error: navItemsPerClient.error,
    isFetching: navItemsPerClient.isFetching,
    didInvalidate: navItemsPerClient.didInvalidate,
    navItems: navItemsPerClient.navItems
  };
}

Routes.propTypes = {
  dispatch: PropTypes.func.isRequired,
  navItems: PropTypes.array
};

export default connect(mapStateToProps)(Routes);