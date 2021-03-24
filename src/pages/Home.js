import React, { Component } from "react";
import { StyleSheet, Text, View, ToastAndroid } from "react-native";
import * as firebase from "firebase";
import { FlatList } from "react-native-gesture-handler";
import { Appbar } from "react-native-paper";
import { Searchbar } from "react-native-paper";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { Card, Button } from "react-native-elements";
import { Modal } from "react-native-paper";

export default class Home extends React.Component {
  //   const [email, setEmail] = React.useState('');
  //   const [pwd, setPassword] = React.useState('');
  //   const [errorValue, isError] = React.useState('false'); //not used, show unknown behaviour

  constructor(props) {
    super(props);
    this.state = {
      product_list: [],
      search_list: [],
      isLoading: true,
      firstQuery: "",
      visible: false,
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

  readData = () => {
    var self = this;

    var databaseReference = firebase.database().ref();
    var productRef = databaseReference.child("PRODUCTS");
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
    this.readData();
  }

  searchProduct = (productName) => {
    this.setState({ firstQuery: productName });
    this.setState({
      search_list: this.state.product_list.filter((i) =>
        i.Brand.toLowerCase().includes(productName.toLowerCase())
      ),
    });
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
      return (
        <View style={styles.container}>
          {/* <Button
            style={styles.button}
            mode="contained"
            onPress={() => this.navigateToAddProduct()}
          >
            Add Product Page
          </Button>
          */}
          <Appbar.Header style={{ width: "100%", backgroundColor: "#74B9FF" }}>
            <Appbar.Content title="KissFactor" color="white" />
            <Appbar.Action
              icon="cart"
              style={{ color: "white" }}
              onPress={() => {
                this.props.navigation.navigate("Cart");
              }}
            />
            <Appbar.Action
              icon="logout"
              style={{ color: "white" }}
              onPress={() => {
                this.signOut();
              }}
            />
          </Appbar.Header>

          <Searchbar
            placeholder="Search"
            onChangeText={(query) => {
              this.searchProduct(query);
            }}
            value={firstQuery}
            style={{
              marginTop: 20,
              marginLeft: 20,
              marginRight: 20,
              color: "#B83227",
            }}
          />

          <FlatList
            style={{ width: "100%" }}
            data={this.state.search_list}
            keyExtractor={(item, index) => item.id.toString()}
            renderItem={({ item }) => (
              // <ProductDetailComponent
              //   brand_name={item.Brand}
              //   product_price={item.Price}
              //   product_id={item.id}
              // />
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
                    borderRadius: 6,
                    marginLeft: 4,
                    marginRight: 4,
                    marginBottom: 4,
                    marginTop: 6,
                    backgroundColor: "#40bf42",
                  }}
                  title="VIEW DETAILS"
                  onPress={() => {
                    //alert(item.id);
                    this.navigateToProductDetail(item.id);
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
          <Appbar.Header style={{ width: "100%", backgroundColor: "#74B9FF" }}>
            <Appbar.Content title="KissFactor" color="white" />
            <Appbar.Action
              icon="logout"
              style={{ color: "white" }}
              onPress={() => {
                this.signOut();
              }}
            />
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
