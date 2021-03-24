import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/pages/Login";
import LoadingScreen from "./src/pages/loadingScreen";
import AddProduct from "./src/pages/addProduct";
import Home from "./src/pages/Home";
import * as firebase from "firebase";
import SignUp from "./src/pages/SignUp";
import productDetail from "./src/pages/productDetail";
import cart from "./src/pages/Cart";

const Stack = createStackNavigator();

var firebaseConfig = {
  apiKey: "AIzaSyD4XfHsCww496LbMKXWML0x9Tv5uvk5hPM",
  authDomain: "kissfactor-b2986.firebaseapp.com",
  databaseURL: "https://kissfactor-b2986.firebaseio.com",
  projectId: "kissfactor-b2986",
  storageBucket: "kissfactor-b2986.appspot.com",
  messagingSenderId: "940285288594",
  appId: "1:940285288594:web:7a50390fc97726d89c464b",
};
firebase.initializeApp(firebaseConfig);

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Loading">
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Loading"
          component={LoadingScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="AddProduct"
          component={AddProduct}
        />

        <Stack.Screen
          options={{ headerShown: false }}
          name="Home"
          component={Home}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Product_Detail"
          component={productDetail}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Cart"
          component={cart}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
