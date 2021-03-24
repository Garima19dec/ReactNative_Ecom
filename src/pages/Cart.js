import React, { Component } from "react";
import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import * as firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Card, Button } from "react-native-elements";
import { Modal } from "react-native-paper";


export default class Cart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product_list: [],
      search_list: [],
      isLoading: true,
      firstQuery: "",
      visible: false,
      userId: "",
    };
  }

  showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  navigateToAddProduct = () => {
    this.props.navigation.navigate("AddProduct");
  };

  navigateToProductDetail = (productIdValue) => {
    // this.setState({
    //   pId: this.props.product_id,
    // });
    this.props.navigation.navigate("Product_Detail", {
      productId: productIdValue,
    });
  };

  signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        this.props.navigation.navigate("Login");
      });
  };

  getUserId = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userId: user.uid,
        });
        this.readData();
      }
    });
  };

  readData = () => {
    var self = this;
    var USERID = this.state.userId;
    var databaseReference = firebase.database().ref();
    var productRef = databaseReference
      .child("USER")
      .child(USERID)
      .child("CART");
    var arr = [];
    productRef
      .once("value", (snapshot) => {
        console.log(snapshot);
        snapshot.forEach((childSnapshot) => {
          var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          // console.log(childKey);
          // console.log(childData);

          arr.push(childData);

          // ...
        });
      })
      .then(() => {
        self.setState({ product_list: arr });
        self.setState({ search_list: arr });
        self.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.getUserId();
  }

  searchProduct = (productName) => {
    this.setState({ firstQuery: productName });
    this.setState({
      search_list: this.state.product_list.filter((i) =>
        i.Brand.toLowerCase().includes(productName.toLowerCase())
      ),
    });
  };

  removeProduct = (pId) => {
    var writeDatabaseReference = firebase.database().ref();
    var USERID = this.state.userId;
    writeDatabaseReference
      .child("USER")
      .child(USERID)
      .child("CART")
      .child(pId)
      .remove();
    console.log("Removed !");
    this.props.navigation.replace("Cart");
  };

  render() {
    const { firstQuery } = this.state;

    const theme = {
      ...DefaultTheme,
      myOwnProperty: true,
      colors: {
        primary: "#ffffff",
      },
    };

    if (!this.state.isLoading) {
      if (this.state.search_list.length != 0) {
        return (
          <View style={styles.container}>
            <Appbar.Header
              style={{ width: "100%", backgroundColor: "#74B9FF" }}
            >
              <Appbar.Content title="KissFactor" color="white" />
            </Appbar.Header>

            <FlatList
              style={{ width: "100%" }}
              data={this.state.search_list}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item }) => (
                <Card borderRadius={10}>
                  <Card.Title
                    style={{ color: "#455a64" }}
                    // fontFamily: "OleoScript-Regular.ttf"
                  >
                    {item.Brand}
                  </Card.Title>

                  <Card.Divider />

                  <Card.Image
                    source={{
                      uri:
                        "https://thetechcubes.in/kissfactor/user/upload/stock/uim.jpg",
                    }}
                  />

                  <Text
                    style={{
                      margin: 15,
                      justifyContent: "center",
                      alignContent: "center",
                      fontSize: 18,
                      color: "#455a64",
                    }}
                  >
                    {item.Price}
                  </Text>

                  <Button
                    buttonStyle={{
                      borderRadius: 4,
                      marginLeft: 4,
                      marginRight: 4,
                      marginBottom: 4,
                      marginTop: 6,
                      backgroundColor: "red",
                    }}
                    title="REMOVE"
                    onPress={() => {
                      // Toast.show({text: 'removed', buttonText:'okay'})
                      this.removeProduct(item.cartId);
                      this.showToastWithGravity("Removed from Cart")
                    }}
                    style={{ margin: 10, marginLeft: 50, width: 40 }}
                  />
                </Card>
              )}
            ></FlatList>
          </View>
        );
      } else {
        return (
          <View style={styles.container2}>
            <Appbar.Header
              style={{ width: "100%", backgroundColor: "#74B9FF" }}
            >
              <Appbar.Content title="KissFactor" color="white" />
            </Appbar.Header>
            <View style={styles.container3}>
              <Text>Cart Empty</Text>
            </View>
          </View>
        );
      }
    } else {
      return (
        <View style={styles.container2}>
          <Appbar.Header style={{ width: "100%", backgroundColor: "#74B9FF" }}>
            <Appbar.Content title="KissFactor" color="white" />
          </Appbar.Header>
          <View style={styles.container3}>
            <Text>Loading...</Text>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container3: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "orange",
    color: "white",
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    marginBottom: 30,
  },
  signOutButton: {
    backgroundColor: "red",
    color: "white",
    width: "100%",
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 30,
  },
});
