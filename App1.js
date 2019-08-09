import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Hello from './Hello';
import Blink from './components/Blink';
import Board from './components/Board';

export default class App extends Component {
  state = {
    
  }
  render() {
  return (
    <View style={styles.container}>
      <Hello/>
      <Blink/>
    </View>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
