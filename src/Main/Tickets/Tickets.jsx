import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Pressable,
  ScrollView,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SettingsContext } from "../../SettingsProvider";
import { PurchaseContext } from "../../PurchaseProvider";
import Settings from "../Settings";
import Ticket from "./Ticket";

export default function Tickets() {
  const { settings } = useContext(SettingsContext);
  const { tickets } = useContext(PurchaseContext);
  const [openSettings, setOpenSettings] = useState(false);
  const [openTicket, setOpenTicket] = useState(false);
  const [currTicket, setCurrTicket] = useState();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Settings visible={openSettings} setVisible={setOpenSettings} />
      <Ticket
        visible={openTicket}
        setVisible={setOpenTicket}
        currTicket={currTicket}
      />
      <View style={[styles.header, settings.darkMode && darkStyles.header]}>
        <Text
          style={[styles.brandName, settings.darkMode && darkStyles.brandName]}
        >
          CINESAVE
        </Text>
        <Pressable onPress={() => setOpenSettings(true)}>
          <Ionicons
            style={styles.settings}
            name="settings"
            size={20}
            color={settings.darkMode ? "#D7B286" : "#C32528"}
          />
        </Pressable>
      </View>
      <View style={{ backgroundColor: "#E5E5E5", height: 2 }} />
      <ScrollView>
        {tickets.length ? (
          tickets.map((ticket, index) => (
            <View key={index} style={[styles.ticket]}>
              <Image
                source={{ uri: ticket.poster }}
                style={{ width: "30%", aspectRatio: 27 / 40 }}
              />
              <View
                style={{
                  marginLeft: 15,
                  width: "55%",
                }}
              >
                <Text
                  style={{ fontWeight: "bold", marginBottom: 20, fontSize: 18 }}
                >
                  {ticket.movie}
                </Text>
                <View style={{ width: "100%" }}>
                  <Text
                    style={{
                      textTransform: "uppercase",
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {ticket.theater}
                  </Text>
                  <Text style={{ fontWeight: "bold", marginTop: 3 }}>
                    {ticket.time.toLocaleString("default", {
                      month: "long",
                    })}{" "}
                    {ticket.time.getDate()}, {ticket.time.getFullYear()}
                  </Text>
                  <Text style={{ fontWeight: "bold", marginTop: 3 }}>
                    {ticket.time.toLocaleString("en-US", {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    })}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  width: "15%",
                }}
              >
                <Pressable
                  onPress={() => {
                    setCurrTicket(ticket);
                    setOpenTicket(true);
                  }}
                >
                  <Image
                    source={require("../../../assets/vector1.png")}
                    style={{ top: 8 }}
                  />
                  <Image
                    source={require("../../../assets/vector2.png")}
                    style={{ bottom: 8 }}
                  />
                </Pressable>
              </View>
            </View>
          ))
        ) : (
          <Text
            style={[
              {
                fontWeight: "bold",
                fontSize: 18,
                marginHorizontal: 10,
                marginTop: 30,
                color: "#C32528",
              },
            ]}
          >
            You currently do not have any purchased tickets.
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "flex-end",
    backgroundColor: "white",
    height: 80,
    justifyContent: "space-between",
  },

  brandName: {
    width: "45%",
    fontSize: 30,
    fontWeight: "bold",
    color: "#C32528",
    paddingLeft: 10,
    paddingBottom: 13,
    margin: 0,
  },

  settings: {
    paddingBottom: 13,
    marginRight: 10,
  },

  ticket: {
    marginVertical: 30,
    backgroundColor: "white",
    width: "95%",
    borderRadius: 12,
    padding: 10,
    flexDirection: "row",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
});
