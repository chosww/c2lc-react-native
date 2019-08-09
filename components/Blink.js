import React, { Component } from 'react'
import { Text, View } from 'react-native'

export default class Blink extends Component {
    componentDidMount(){
        setInterval(() => (
            this.setState(previousState => (
                {isShowingText: !previousState.isShowingText}
            ))
        ), 1000);
    }

    state = { isShowingText: true };

    render() {
        if (!this.state.isShowingText) {
            return null;
        }

        return (
            <Text> this.props.text </Text>
        );
    }
}
