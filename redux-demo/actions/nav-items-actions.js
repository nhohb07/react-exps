import 'isomorphic-fetch';
import { checkStatus, parseJSON } from './utils';

export const INVALIDATE_NAV_ITEMS = 'INVALIDATE_NAV_ITEMS';   
export const NAV_ITEMS_REQUEST = 'NAV_ITEMS_REQUEST';
export const NAV_ITEMS_SUCCESS = 'NAV_ITEMS_SUCCESS';
export const NAV_ITEMS_FAILURE = 'NAV_ITEMS_FAILURE';

export function invalidateNavItems() {
  return {
    type: INVALIDATE_NAV_ITEMS
  };
}

function navItemsRequest() {
  return {
    type: NAV_ITEMS_REQUEST
  };
}

function navItemsSuccess(payload) {
  return {
    type: NAV_ITEMS_SUCCESS,
    navItems: payload.navItems
  };
}

function navItemsFailure(error) {
  return {
    type: NAV_ITEMS_FAILURE,
    error
  };
}  

export function fetchNavItems(clientId) {
  const API_URL = (`../data/${clientId}/navigation/navigation.json`);
  return dispatch => {
    dispatch(navItemsRequest());
    return fetch(API_URL)
      .then(checkStatus)
      .then(parseJSON)
      .then(json => dispatch(navItemsSuccess(json)))
      .catch(function(error) {
        const response = error.response;
        if (response === undefined) {
          dispatch(navItemsFailure(error));
        } else {
          parseJSON(response)
            .then(function(json) {
              error.status = response.status;
              error.statusText = response.statusText;
              error.message = json.message;
              dispatch(navItemsFailure(error));
            });
        }
      });
  };
}

function shouldFetchNavItems(state) {
  // Check cache first
  const navItems = state.navItemsPerClient;
  if (!navItems || navItems.length === undefined) {
    // Not cached, should fetch
    return true;
  }

  if (navItems.isFetching) {
    // Shouldn't fetch since fetching is running
    return false;
  }

  // Should fetch if cache was invalidate
  return navItems.didInvalidate;
}

export function fetchNavItemsIfNeeded(clientId) {
  return (dispatch, getState) => {
    if (shouldFetchNavItems(getState())) {
      return dispatch(fetchNavItems(clientId));
    }
  };
}