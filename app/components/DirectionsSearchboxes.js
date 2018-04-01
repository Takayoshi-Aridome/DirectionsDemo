import React from 'react';
import { Platform, StyleSheet, View, Button, Text, TextInput, TouchableOpacity, Alert } from 'react-native';

export default class DirectionsSearchboxes extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            originText: '',
            destinationText: '',
        };
        console.log('DirectionsSearchboxes');
    }

    render() {
        return (
            <View style={styles.directionsSearchboxes}>
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "出発地を入力..."
                    placeholderTextColor = "whitesmoke"
                    onChangeText = { (text) => this.setState({ originText: text }) }
                    value = { this.state.originText }
                    onEndEditing = { (text) => this.props.originTextOnEndEditing(text) }
                />
                <TextInput style = {styles.input}
                    underlineColorAndroid = "transparent"
                    placeholder = "目的地を入力..."
                    placeholderTextColor = "whitesmoke"
                    onChangeText = { (text) => this.setState({ destinationText: text }) }
                    value = { this.state.destinationText }
                    onEndEditing = { (text) => this.props.destinationTextOnEndEditing(text) }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    directionsSearchboxes: {
        marginTop: 'auto',
        backgroundColor: 'dodgerblue',
    },
    input: {
        lineHeight: 1.4,
        color: 'whitesmoke',
        borderColor: 'whitesmoke',
        borderBottomWidth: 1,
        marginVertical: '2%',
        marginHorizontal: '4%',
    },
})
