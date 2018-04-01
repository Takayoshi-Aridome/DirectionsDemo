import React, { Component } from 'react';

const TTS_URL = 'wss://taspeechapp.mybluemix.net/tts';

export default class IBMCloud extends React.Component {
  constructor(props) {
    super(props);

    this.announceBuffer = null;

    this.getTTS = this._getTTS.bind(this);
  }

  _getTTS(socketInput, completeHandler) {
      let _ws = new WebSocket(TTS_URL);
      _ws.onopen = () => {
          _ws.send(socketInput);
      };
      _ws.onmessage = (event) => {
          _ws.close();
          let _json = JSON.parse(event.data);
          this.announceBuffer = _json.audioBuffer.data
          completeHandler();
      };
      _ws.onerror = (event) => {
          console.log(event.message);
      };
      _ws.onclose = (event) => {
          console.log('onclose: ', event);
      };
  }
}
