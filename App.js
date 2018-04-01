/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

 import React from 'react';
 import { View, Text } from 'react-native';
 import { StackNavigator } from 'react-navigation';

 import Directions from './app/screens/Directions';
 import DirectionsSearchboxes from './app/components/DirectionsSearchboxes';


 const RootStack = StackNavigator(
   {
       Directions: { screen: Directions },
       DirectionsSearchboxes: { screen: DirectionsSearchboxes },
   },
   { initialRouteName: 'Directions' }
 );

 export default class App extends React.Component {
   render() {
     return <RootStack />;
   }
 }
