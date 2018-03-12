import React, { Component } from 'react';

class Client extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
    }
  }
  render() {
    return (
      <div className="Client">
        <h1>Client</h1>
        <div>{this.state.room}</div>
      </div>
    );
  }
}

export default Client;
