import React from 'react';
import { Link } from 'react-router';
import axios from 'axios';

export default class Home extends React.Component {
  static get NAME() {
    return 'Home';
  }

  static get contextTypes() {
    return {
      data: React.PropTypes.object
    };
  }
  static requestData() {
    return axios.get(`http://localhost/test-ajax.php`);
  }
  
  constructor(props, context) {
    super(props, context);
    this.state = context.data['Home'] || {items: []};
  }

  render() {
    return (
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/list-your-salon/1">List Your Salon</Link></li>
        </ul>
        <div>
          <ul className="ui-list">
            {this.state.items.map((item) => {
              return (
                <li className="ui-list-item" key={item.id}>
                  <div className="info-container">
                    <h4 className="title">{item.vendor}</h4>
                    <span className="period">{item.period}</span>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.constructor.requestData().then((response) => {
      this.setState(response.data);
    }).catch((err) => {
      throw new Error(err);
    });
  }
}