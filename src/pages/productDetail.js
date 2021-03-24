import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  ToastAndroid,
  TextInput,
} from "react-native";
import * as firebase from "firebase";
import { Appbar, Divider } from "react-native-paper";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import { Card, Title, Paragraph } from "react-native-paper";
//import InputSpinner from "react-native-input-spinner";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // value: 1,
			// valueReal: 1.5,
			// colorLeft: this.getRandomColor(),
			// colorRight: this.getRandomColor(),
      product_detail: [],
      isLoading: true,
      quantity: 1,
      pId: "",
      userId: "",
      // itemId: props.navigation.getParam("productId", ""),
      itemId: props.route.params.productId,
    };
  }


  // getRandomColor() {
	// 	var letters = "0123456789ABCDEF";
	// 	var color = "#";
	// 	for (var i = 0; i < 6; i++) {
	// 		color += letters[Math.floor(Math.random() * 16)];
	// 	}
	// 	return color;
	// }

  showToastWithGravity = (message) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM
    );
  };

  readProductData = () => {
    var self = this;
    //const itemId = this.props.navigation.getParam("productId", "");
    console.log(this.state.itemId);
    //alert(itemId);
    var databaseReference = firebase.database().ref();
    var productRef = databaseReference
      .child("PRODUCTS")
      .child(this.state.itemId);
    var arr = [];
    productRef
      .once("value", (snapshot) => {
        snapshot.forEach((childSnapshot) => {
          //var childKey = childSnapshot.key;
          var childData = childSnapshot.val();
          arr.push(childData);
        });
      })
      .then(() => {
        self.setState({ product_detail: arr });
        self.setState({ isLoading: false });
        console.log(this.state.product_detail);
      });
  };

  componentDidMount() {
    this.readProductData();
  }

  handleQuantityAddChange = () => {
    if (this.state.quantity <= parseInt(this.state.product_detail[7])) {
      this.setState({
        quantity: this.state.quantity + 1,
      });
    }
  };

  writeData = () => {
    var writeDatabaseReference = firebase.database().ref();
    var USERID = this.state.userId;
    var cartRef = writeDatabaseReference
      .child("USER")
      .child(USERID)
      .child("CART");

    var self = this;

    var postData = {
      Name: self.state.product_detail[3],
      id: self.state.product_detail[8],
      Description: self.state.product_detail[1],
      Price: self.state.product_detail[4],
      Sold: self.state.product_detail[6],
      DiscountedPrice: self.state.product_detail[2],
      Stock: self.state.product_detail[7],
      Rating: self.state.product_detail[5],
      Brand: self.state.product_detail[0],
      cartId: "",
    };

    var key = cartRef.push(postData).key;
    cartRef.child(key).child("cartId").set(key);
    self.showToastWithGravity("Product is Added !");
  };

  handleAddToCart = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userId: user.uid,
        });
        this.writeData();
      }
    });
  };

  getCurrentUserId = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userId: user.uid,
        });
      }
    });
  };

  handleQuantityMinusChange = () => {
    if (this.state.quantity != 1) {
      this.setState({
        quantity: this.state.quantity - 1,
      });
    }
  };

  render() {
    //const itemId = this.props.navigation.getParam("productId", "NO-ID");

    if (!this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Appbar.Header style={{ width: "100%", backgroundColor: "#74B9FF" }}>
            <Appbar.Content title="KissFactor" color="white" />
            {/* <Appbar.BackAction onPress={() => {}} /> */}
          </Appbar.Header>
          <Card style={{ margin: 15 , borderRadius:15}}>
            <Card.Cover
              source={{
                uri:
                  "https://thetechcubes.in/kissfactor/user/upload/stock/uim.jpg",
              }}
            />
            <Card.Title title={this.state.product_detail[0]} style={{marginLeft:140}} />
            <Card.Content style={{marginLeft:140}}>
              <Title>{this.state.product_detail[7]}</Title>
              <Paragraph style={{color:'#74B9FF'}}>{this.state.product_detail[1]}</Paragraph>
            </Card.Content>
          </Card>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignContent: "center",
              alignItems: "center",
              width: "100%",
              height: 80,
              margin: 10,
            }}
          >
            <Text>Quantity : </Text>
            <TouchableOpacity
              onPress={() => {
                this.handleQuantityAddChange();
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  width: 50,
                  height: 50,
                  borderColor: "#7B8788",
                  backgroundColor: "#7B8788",
                  color: "white",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>+</Text>
              </View>
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 1,
                width: 50,
                height: 50,
                borderColor: "#7B8788",
                backgroundColor: "white",

                alignItems: "center",
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#7B8788" }}>{this.state.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                this.handleQuantityMinusChange();
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  width: 50,
                  height: 50,
                  borderColor: "#7B8788",
                  backgroundColor: "#7B8788",
                  color: "white",
                  alignItems: "center",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Text style={{ color: "white" }}>-</Text>
              </View>
            </TouchableOpacity>
          </View>

    {/* <View style={{ flex: 1, marginBottom: 18, marginTop:15, flexDirection: "row",height:55}}>
          <Text style={{flex: 2, marginTop:13, fontStyle:"italic",
           fontSize:20, color:"#25547a", marginLeft:30}}>Pick up</Text>
					    <InputSpinner
					      	value={this.state.value}
						      style={{flex: 2,marginTop:5,
                      width: "auto",minWidth: 70,
                        minHeight:40}}
                        // color={"#40c5f4"}
                      textColor={"#FFF"}
						          color={"#25547a"}
						          background={"#79abd2"}
						          rounded={false}
						          showBorder
					    />
				</View> */}

          <Divider style={{marginTop:160}}/>
          <View
            style={{
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Button
              buttonStyle={{ backgroundColor: "#40bf42", width: 300, marginTop:30, borderRadius:10 }}
              onPress={() => {
                this.handleAddToCart();
              }}
              icon={
                <Icon
                  name="shopping-cart"
                  size={20}
                  iconStyle={{ marginRight: 20 }}
                  color="white"
                />
              }
              title="Add to Cart"
            />
          </View>
        </View>
      );
    }
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Appbar.Header style={{ width: "100%", backgroundColor: "#74B9FF" }}>
            <Appbar.Content title="KissFactor" color="white" />
            {/* <Appbar.BackAction onPress={() => {}} /> */}
          </Appbar.Header>
          <View style={styles.container2}>
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
  },
  container2: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
});
