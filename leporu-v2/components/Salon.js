import React from 'react';
import { Link } from 'react-router';
import Request from '../services/request';

export class ListYourSalon extends React.Component {
  static get NAME() {
    return 'Salon';
  }

  static get contextTypes() {
    return {
      data: React.PropTypes.object
    };
  }
  static requestData() {
    return Request.getSalon();
  }
  
  constructor(props, context) {
    super(props, context);
    this.state = context.data['Salon'] || {items: []};
  }
  
  componentDidMount() {
    Request.getSalon().then((response) => {
      console.log(response);
      this.setState(response.data);
    }).catch((err) => {
      throw new Error(err);
    });
  }
  
  render() {
    let { step } = this.props.params;

    return (
      <div>
        <h2>List Your Salon {step}</h2>
        <p>
          This little app is rendered on the server, and then
          lazily loaded on the client. Go ahead and refresh here
          with the web inspector open. You should not get the
          React warning about reusing markup.
        </p>
        <p><Link to="/list-your-salon/2">Step 2</Link></p>
      </div>
    )
  }
};
