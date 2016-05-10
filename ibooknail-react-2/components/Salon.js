import React from 'react';
import { Link } from 'react-router';

export class ListYourSalon extends React.Component {
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