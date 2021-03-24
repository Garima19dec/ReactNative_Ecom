import React from 'react';
import { StyleSheet, Image,Text, View,ToastAndroid } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput,Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as firebase from "firebase";
import { StackActions } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Login({ navigation }) {

  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      primary : '#ffffff',
    }
  };

  const [email, setEmail] = React.useState('');
  const [pwd, setPassword] = React.useState('');
  const [errorValue, isError] = React.useState('false'); //not used, show unknown behaviour

  showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  validateEmail = () => {
    
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(email) === false) {
      showToastWithGravity("Enter Valid Email");
      return false;
    }
    return true;
  }

  checkData = () => {
    if(validateEmail()){
      firebase
      .auth()
      .signInWithEmailAndPassword(email, pwd)
      .then(authenticate => {
        navigation.dispatch(
          StackActions.replace('Home')
        );
      })
      .catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        this.showToastWithGravity(errorMessage);
      });
    }
  };

  return (
    <PaperProvider theme={theme}>
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
        <Image style={{width:50,height:50}} source={require("../../assets/logo.png")}/>
      </View>
      <TextInput
      label="Email"
      value={email}
      mode="outlined"
      onChangeText={email => setEmail(email)}
      style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
      />
      <TextInput
      label="Password"
      value={pwd}
      mode="outlined"
      onChangeText={pwd => setPassword(pwd)}
      style={{width:"100%",height:50,margin:20,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
      />
      <TouchableOpacity onPress={() => {
        navigation.dispatch(
          StackActions.replace('SignUp')
        );
      }}>
        <Text style={{marginTop:20,fontSize:20}}>Sign Up</Text>
      </TouchableOpacity>
      <Button mode="contained" onPress={() => this.checkData()} style={{marginTop:20}}>
      Sign In
      </Button>
    </View>
    </PaperProvider>
  );
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
    marginBottom:60
},
});
