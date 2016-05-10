import { 
         INVALIDATE_NAV_ITEMS, NAV_ITEMS_REQUEST, 
         NAV_ITEMS_SUCCESS, NAV_ITEMS_FAILURE 
       } from '../actions/nav-items-actions';

function navItems(state = {
  isFetching: false,
  didInvalidate: false,
  navItems: [],
  error: null
}, action) {
  switch (action.type) {
  case INVALIDATE_NAV_ITEMS:
    return Object.assign({}, state, {
      didInvalidate: true
    });
  case NAV_ITEMS_REQUEST:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });
  case NAV_ITEMS_SUCCESS:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      navItems: action.navItems,
      error: null
    });
  case NAV_ITEMS_FAILURE:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: false,
      error: action.error
    });
  default:
    return state;
  }
}

export function navItemsPerClient(state = { }, action) {
  switch (action.type) {
  case INVALIDATE_NAV_ITEMS:
  case NAV_ITEMS_REQUEST:
  case NAV_ITEMS_SUCCESS:
  case NAV_ITEMS_FAILURE:
    return navItems(state, action);
  default:
    return state;
  }
}