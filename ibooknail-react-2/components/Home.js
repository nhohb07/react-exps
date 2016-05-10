import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
var http = require('http');

export default class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {full_name: 'Init...'};
  };

  componentWillMount() {
    // http.get('http://localhost/test-ajax.php', (res) => {
    //   console.log(res);
    //   res.on('data', (chunk) => {
    //     var data = JSON.parse(chunk);
    //     this.setState({ full_name: data.full_name });
    //   });
    // }).on('error', (e) => {
    //   console.log('Got error: '+e);
    // });
  }

  render() {
    return (
      <div>
	    	<div className="row">
			    <div className="col-xs">
		      	<div className="box">
      				<RaisedButton label="Default" />
        			<h2>Home page: {this.state.full_name}</h2>
		      	</div>
			    </div>
				</div>
      </div>
    )
  }
}