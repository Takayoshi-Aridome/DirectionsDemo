import React from 'react';
import { View, Text } from 'react-native';
import Sound from 'react-native-sound';
import RNFetchBlob from 'react-native-fetch-blob';
import { Buffer } from 'buffer/';

import GoogleDirections from '../utils/maps/GoogleDirections';
import IBMCloud from '../utils/networks/IBMCloud';

const announce = {
    'name': 'announce',
    'type': 'mp3',
};

const ANNOUNCE_LIST = [
    'おはよう',
    'こんにちは',
    'こんばんは',
];

export default class TestDirections extends React.Component {
    constructor(props) {
        super(props);

        this.steps = null;
        this.instructions = [];

        this.announceList = [];
        this.announceListCurrent = null;
        this.createRoute = this._createRoute.bind(this);
        this.announceManager = this._announceManager.bind(this);
        this.nextAnnounceList = this._nextAnnounceList.bind(this);
        this.createSound = this._createSound.bind(this);
        this.gd = new GoogleDirections();
        this.ibmCloud = new IBMCloud();

        Sound.setCategory('Playback');
    }

    componentDidMount() {
        this.gd.routeRequests('新宿オークタワー', '東京ディズニーランド', this.createRoute);
    }

    _createRoute() {
        this.steps = this.gd.routesResponse.routes[0].legs[0].steps;
        this.instructions = [];
        for (let i in this.steps) {
            let _txt = this.steps[i].html_instructions.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g, '');
            _txt += '。距離' + this.steps[i].distance.text + 'です。';
            this.instructions.push(_txt);
        }

        console.log('this.instructions: ', this.instructions[0]);
        this.announceManager(this.instructions);
    }

    _announceManager(list) {
        this.announceList = list;
        this.announceListCurrent = 0;
        this.ibmCloud.getTTS(this.announceList[this.announceListCurrent], this.createSound);
    }

    _nextAnnounceList() {
        this.announceListCurrent++;
        console.log('nextAnnounceList',this.announceListCurrent,this.announceList.length);
        if(this.announceListCurrent < this.announceList.length) {
            this.ibmCloud.getTTS(this.announceList[this.announceListCurrent], this.createSound);
        } else {
            console.log('SOUND LIST COMPLETE');
        }
    }

    _createSound() {
        console.log('createSound');
        console.log('announceBuffer: ', this.ibmCloud.announceBuffer);
        console.log(RNFetchBlob.fs.dirs.DocumentDir + '/' + announce.name + '.' + announce.type);

        let _uri = RNFetchBlob.fs.dirs.DocumentDir + '/' + announce.name + '.' + announce.type;
        let _audioBuffer = this.ibmCloud.announceBuffer;
        RNFetchBlob.fs.writeFile(_uri, _audioBuffer, 'ascii').then(() => {
            console.log('createSoundComplete');
            let _sound = new Sound(announce.name + '.' + announce.type, RNFetchBlob.fs.dirs.DocumentDir, (error) => {
              if (error) {
                console.log('failed to load the sound', error);
                return;
              }
              _sound.play((success) => {
                 if (success) {
                     console.log('play_complete');
                     this.nextAnnounceList();
                 }
              });
            });
        });
    }

    render() {
        return (
            <View>
                <Text>Hello</Text>
            </View>
        );
    }
}
