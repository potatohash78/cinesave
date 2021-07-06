import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsProvider from "./src/SettingsProvider";
import TheatersProvider from "./src/TheatersProvider";
import LoginDisplay from "./src/Login/LoginDisplay";
import Main from "./src/Main/Main";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SettingsProvider>
        <TheatersProvider>
          <Stack.Navigator
            initialRouteName="LoginDisplay"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="LoginDisplay" component={LoginDisplay} />
            <Stack.Screen name="Main" component={Main} />
          </Stack.Navigator>
        </TheatersProvider>
      </SettingsProvider>
    </NavigationContainer>
  );
}
