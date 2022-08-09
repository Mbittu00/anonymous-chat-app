import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();
import Home from "./src/home/home";
import Auth from "./src/auth/auth";
import Context from "./context/context";
import { useContext, useState, useEffect } from "react";
export default function Root() {
  return (
    <>
        <Stack.Navigator
          initialRouteName={'Home'}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
    </>
  );
}
