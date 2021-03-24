import React, {Component} from 'react';
import { StyleSheet, View,Text } from 'react-native';

export default class TestComponent {
    render(){
      <Text style={styles.textStyle}>{this.props.name}</Text>
    }
}

const styles = StyleSheet.create({
  textStyle: {
      fontSize:20,
      color:"#FFFFFF",
      backgroundColor:"orange",
      paddingHorizontal:15,
      paddingVertical:10,
      borderRadius:5,
      marginTop:5
    },
  });