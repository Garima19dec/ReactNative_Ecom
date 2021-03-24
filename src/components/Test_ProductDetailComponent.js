import React, { Component } from "react";
import { Text, View, ScrollView } from "react-native";
import { Card, Button } from "react-native-elements";
import { Modal } from "react-native-paper";
import { StackActions } from "@react-navigation/native";

export default class ProductDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      pId: "",
    };
  }

  navigateToProductDetail = () => {
    this.setState({
      pId: this.props.product_id,
    });
    this.props.navigation.navigate("Product_Detail", {
      productId: this.state.pId,
    });
    // this.props.navigation.replace("Product_Detail");
    // this.props.navigation.replace("Home");
  };

  render() {
    return (
      <View style={{ flex: 1, width: "100%" }}>
        <Modal
          visible={this.state.visible}
          onDismiss={() => {
            this.setState({ visible: false });
          }}
        >
          <Text>{this.props.brand_name}</Text>
        </Modal>
        <Card borderRadius={10}>
          <Card.Title
            style={{ color: "#455a64" }}
            // fontFamily: "OleoScript-Regular.ttf"
          >
            {this.props.brand_name}
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
            {this.props.product_price}
          </Text>

          <Button
            buttonStyle={{
              borderRadius: 4,
              marginLeft: 4,
              marginRight: 4,
              marginBottom: 4,
              marginTop: 6,
              backgroundColor: "#40bf42",
            }}
            title="VIEW DETAILS"
            onPress={() => {
              this.navigateToProductDetail();
            }}
            style={{ margin: 10, marginLeft: 50, width: 40 }}
          />
        </Card>
      </View>
    );
  }
}
