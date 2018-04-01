import React, { Component } from 'react';
import { Platform, PermissionsAndroid } from 'react-native';

export default class Geolocation extends React.Component {
  static async getCurrentPosition(timeoutMillis = 10000) {
    console.log('getCurrentPosition.Platform.OS: ', Platform.OS);
    if (Platform.OS === "android") {
        const ok = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (!ok) {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                //ここにユーザーにGPS使用許可がもらえなかった場合の処理
                throw new Error();
            }
        }
    }

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: timeoutMillis });
    });
  }
}
