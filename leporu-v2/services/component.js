import React from 'react';

export default class Component extends React.Component {
  constructor(props, context) {
    super(props, context);
  }
  
  static get NAME() {
    return this.constructor.name;
  }
  
  static get contextTypes() {
    return {
      data: React.PropTypes.object
    };
  }
}