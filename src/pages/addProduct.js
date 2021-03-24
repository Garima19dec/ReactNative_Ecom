import React from 'react';
import { StyleSheet, Image, View,ToastAndroid,ScrollView,  StatusBar, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TextInput,Button } from 'react-native-paper';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import * as firebase from "firebase";

export default function AddProduct() {

  const theme = {
    ...DefaultTheme,
    myOwnProperty: true,
    colors: {
      primary : '#ffffff',
    }
  };

  

//name,description,price,sold,discounted_price,discount_percentage,stock,ratiing,brand
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [price, setPrice] = React.useState(''); 
  const [sold, setSold] = React.useState(''); 
  const [discountedPrice, setDiscountedPrice] = React.useState(''); 
  const [stock, setStock] = React.useState(''); 
  const [rating, setRating] = React.useState(''); 
  const [brand, setBrand] = React.useState(''); 

  writeUserData = () => {

    var databaseReference = firebase.database().ref();
    var productRef = databaseReference.child("PRODUCTS");

    var postData = {
        Name: name,
        id: "id",
        Description: description,
        Price: price,
        Sold: sold,
        DiscountedPrice: discountedPrice,
        Stock : stock,
        Rating : rating,
        Brand : brand,
      };

    var key = productRef.push(postData).key;

    productRef.child(key).child("id").set(key);
    
    showToastWithGravity("Data Added !");
    
  }

  showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };



  validateProductDetail = () => {
    return true;
  }

  checkData = () => {
    if(validateProductDetail()){
      showToastWithGravity("Product is Valid !");
      writeUserData();
    }
  };



  return (
    <PaperProvider theme={theme}>
        <View style={styles.container}>
            {/* <LinearGradient
                colors={['#DE3B89', '#6D1D44', '#192f6a']}
                style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: 0,
                height: "100%",
            }}
            /> */}
            <ScrollView style={styles.scrollView} contentContainerStyle={{ justifyContent: "center",alignItems:"center" }}>
                <View style={styles.CircleShapeView}>
                    <Image style={{width:50,height:50}} source={require("../../assets/logo.png")}/>
                </View>
                <TextInput
                    label="Product Name"
                    value={name}
                    mode="outlined"
                    onChangeText={name => setName(name)}
                    style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
                />
                <TextInput
                    label="Description"
                    value={description}
                    mode="outlined"
                    onChangeText={description => setDescription(description)}
                    style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
                /> 
                <TextInput
                    label="Product Price"
                    value={price}
                    mode="outlined"
                    onChangeText={price => setPrice(price)}
                    style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
                /> 
                <TextInput
                    label="Product Sold"
                    value={sold}
                    mode="outlined"
                    onChangeText={sold => setSold(sold)}
                    style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
                /> 
                <TextInput
                    label="Product Stock"
                    value={stock}
                    mode="outlined"
                    onChangeText={stock => setStock(stock)}
                    style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
                /> 
                <TextInput
                    label="Discounted Price"
                    value={discountedPrice}
                    mode="outlined"
                    onChangeText={discountedPrice => setDiscountedPrice(discountedPrice)}
                    style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
                /> 
                <TextInput
                    label="Product Rating"
                    value={rating}
                    mode="outlined"
                    onChangeText={rating => setRating(rating)}
                    style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
                /> 
                <TextInput
                    label="Product Brand"
                    value={brand}
                    mode="outlined"
                    onChangeText={brand => setBrand(brand)}
                    style={{width:"100%",height:50,backgroundColor:'rgba(218, 224, 226, 0.5)'}}
                />               
                <Button style={styles.button} mode="contained" onPress={() => this.checkData()}>
                    Add Product
                </Button>
            </ScrollView>
        </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "white",
    flex: 1,
  },
  scrollView:{
    flex: 1,
    marginLeft:10,
    marginRight:10,
  },
  CircleShapeView: {
    width: 75,
    height: 75,
    borderRadius: 75/2,
    backgroundColor:'rgba(218, 224, 226, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:30,
    marginTop:20
  },
  button : {
    backgroundColor:"orange",
    color:"white",
    width:"100%",
    marginLeft:20,
    marginRight:20,
    marginTop:30,
    marginBottom:30
  }
});
