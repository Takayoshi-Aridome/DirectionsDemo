import React, { Component } from 'react';

export default class GoogleDirections extends React.Component {
  constructor(props) {
    super(props);

    this.routesResponse = null;
  }

  routeRequests(origin, destination, callback) {
    let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=AIzaSyAW28155WiKQTyepSQxwI6-QlmKNs9UsRg&language=ja`;

    return fetch(url)
    .then((response) => response.json())
    .then((responseJSON) => {
      this.routesResponse = responseJSON;
      //console.log('routesResponse: ', this.routesResponse);
      callback();
    })
    .catch((error) => {
      console.error(error);
    });
  }
}
