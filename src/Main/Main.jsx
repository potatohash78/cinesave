import React, { createContext, useContext } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import Search from "./Search/Search";
import Tickets from "./Tickets/Tickets";
import { SettingsContext } from "../SettingsProvider";

const Tab = createBottomTabNavigator();
export const UserContext = createContext();

export default function Main({ route, navigation }) {
  const { user } = route.params;
  const { settings } = useContext(SettingsContext);
  return (
    <UserContext.Provider value={{ user }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "My Tickets") {
              iconName = focused ? "bandage" : "bandage-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: settings.darkMode ? "#D7B286" : "#C32528",
          inactiveTintColor: settings.darkMode ? "#D7B286" : "#C32528",
          style: settings.darkMode ? styles.darkTabNav : styles.tabnav,
        }}
      >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="My Tickets" component={Tickets} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  tabnav: {
    paddingBottom: 5,
  },

  darkTabNav: {
    backgroundColor: "black",
  },
});
