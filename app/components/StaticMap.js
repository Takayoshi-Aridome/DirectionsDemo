import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';

import Geolocation from '../utils/maps/Geolocation';

//0:新宿オークタワー 1:新宿駅　デバッグ時のダミーデータ
const coordinates = [{ latitude: 35.694125, longitude: 139.690486,}, { latitude: 35.689179, longitude: 139.701038,},];

export default class StaticMap extends React.Component {
    constructor(props) {
        super(props);
        this.state = { delta: { latitude: 0.025, longitude: 0.02,}, startPoint: null, endPoint: null, wayPoints: null };
        this.points = null;
        //this.createPolyline = this._createPolyline.bind(this);
        this.setPosition = this._setPosition.bind(this);
    }

    static createPolyline(startPoint, endPoint, wayPoints) {
        this.points = {startPoint:startPoint,endPoint:endPoint,wayPoints:wayPoints}
        this.setState({
            startPoint: this.points.startPoint,
            endPoint: this.points.endPoint,
            wayPoints: this.points.wayPoints,
        });

        console.log('wayPoints', this.state.wayPoints);
    }

    _setPosition() {

    }

    componentDidMount() {
        this._setCurrentPosition();
    }

    _setCurrentPosition() {
        let _self, _currentPosition;
        _self = this;
        _currentPosition = Geolocation.getCurrentPosition();
        _currentPosition.then(function(value) {
            _self.setState({
                startPoint: { latitude: value.coords.latitude, longitude: value.coords.longitude, address: '' }
            });
        }).catch(function(error) {
            console.error(error);
        });
    }

    render() {
        if(this.state.startPoint == null) {
            return (
                <Text>Now loading...</Text>
            );
        } else {
            return (
                <MapView
                    provider = {'google'}
                    style = {styles.map}
                    region = {{
                        latitude: this.state.startPoint.latitude,
                        longitude: this.state.startPoint.longitude,
                        latitudeDelta: this.state.delta.latitude,
                        longitudeDelta: this.state.delta.longitude
                    }}
                >
                    <MapView.Marker
                        title = "出発地点"
                        description = "現在地"
                        coordinate = { this.state.startPoint }
                    />
                </MapView>
            );
        }
    }
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
