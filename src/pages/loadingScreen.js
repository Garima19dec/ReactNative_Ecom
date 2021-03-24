import React, { Component } from 'react';
import { StyleSheet, Image, View,ToastAndroid,ActivityIndicator, ProgressBarAndroid ,Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as firebase from "firebase";
import { StackActions } from '@react-navigation/native';

export default class Login extends React.Component{


  showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  componentDidMount(){
    firebase.auth().onAuthStateChanged( (authenticate) => {
      if(authenticate){
        setTimeout(() => {
            //this.showToastWithGravity("Loging In ...");
            this.props.navigation.replace("Home");
        }, 1000);
        
      }
      else{
        setTimeout(() => {
            //this.showToastWithGravity("Loging In ...");
            this.props.navigation.replace("Login");
        }, 1000);
      }
    });
  };

  constructor(props) {
    super(props);
    this.state = { 
      spinAnim: new Animated.Value(0) }
  }

 componentDidMount(){
 Animated.loop(Animated.timing(
    this.state.spinAnim,
  {
    delay:0,
    toValue: 1,
    duration: 3000,
    easing: Easing.linear,
    useNativeDriver: true
  }
  )).start();
   //Animated.timing(this.state.spinAnim).stop()
   setTimeout(() => { 
    // this.state.spinAnim.stopAnimation((value) => console.warn(value)); 
    this.props.navigation.replace("Home");
  }, 4000);
 }


  render(){
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#DE3B89', '#6D1D44', '#192f6a']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: "100%",
          }}
        />
        <View style={styles.CircleShapeView}>
          <Animated.Image style={{width:90,height:90,transform: [{rotate: spin}]}} source={require("../../assets/logo.png")}/>
        </View>
        <ActivityIndicator size="large"/>

        {/* <View style={styles.containerStyle}>
           <ProgressBarAndroid />
        </View> */}

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
    paddingLeft:20,
    paddingRight:20
  },
  CircleShapeView: {
    width: 75,
    height: 75,
    borderRadius: 75/2,
    backgroundColor:'rgba(218, 224, 226, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    
    
},
// containerStyle: {
//   flex: 1,
//   justifyContent: 'space-around',
//   marginTop: 130,
//   },
});
