import React, { Component } from 'react';
import Opeteh from '../../vendor/opeteh.es.js'

class Server extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room: null,
    }



    console.log(Opeteh);
    this.server = new Opeteh.OpetehServer(props.signallingServer, props.iceServers, 8);
    this.server.listen();
    this.server.initialization()
    .then(async (room) => {
      this.setState({
        ...this.state,
        room: room,
      })
    });

    thi.handleIncomingClient = this.handleIncomingClient.bind(this);
    this.handleIncomingClient();
  }

  async handleIncomingClient(
    await this.server.newClient();

  )

  render() {
    return (
      <div className="Server">
        <h1>Server</h1>
        <div>{this.state.room}</div>
      </div>
    );
  }
}

export default Server;
