import React from "react";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SettingsProvider from "./src/SettingsProvider";
import TheatersProvider from "./src/TheatersProvider";
import UserProvider from "./src/UserProvider";
import PurchaseProvider from "./src/PurchaseProvider";
import LoginDisplay from "./src/Login/LoginDisplay";
import Main from "./src/Main/Main";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <UserProvider>
        <SettingsProvider>
          <TheatersProvider>
            <PurchaseProvider>
              <Stack.Navigator
                initialRouteName="LoginDisplay"
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen name="LoginDisplay" component={LoginDisplay} />
                <Stack.Screen name="Main" component={Main} />
              </Stack.Navigator>
            </PurchaseProvider>
          </TheatersProvider>
        </SettingsProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
