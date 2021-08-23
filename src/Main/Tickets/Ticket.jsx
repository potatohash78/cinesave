import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";
import { Overlay } from "react-native-elements";

export default function Ticket({ visible, setVisible, currTicket }) {
  return currTicket ? (
    <Overlay
      isVisible={visible}
      fullScreen={true}
      overlayStyle={{
        backgroundColor: "black",
        alignItems: "center",
      }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Image
          source={require("../../../assets/qrcode.png")}
          style={{ width: "90%", aspectRatio: 1, marginTop: 20 }}
        />
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 40,
            color: "white",
            textAlign: "center",
            width: "90%",
            alignSelf: "center",
            marginTop: 30,
          }}
        >
          {currTicket.movie}
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            alignSelf: "center",
            textTransform: "uppercase",
            marginTop: 30,
            width: "90%",
          }}
        >
          {currTicket.theater}
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: 20,
            alignSelf: "center",
            textTransform: "uppercase",
            marginTop: 5,
            width: "90%",
          }}
        >
          {currTicket.time.toLocaleString("default", {
            month: "long",
          })}{" "}
          {currTicket.time.getDate()}, {currTicket.time.getFullYear()} |{" "}
          {currTicket.time.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            marginTop: 5,
            color: "white",
            alignSelf: "center",
            fontSize: 20,
            textTransform: "uppercase",
          }}
        >
          SEAT {currTicket.seatNumbers.join(", ")}
        </Text>
        <Text
          style={{
            fontWeight: "bold",
            marginTop: 5,
            color: "white",
            alignSelf: "center",
            fontSize: 20,
          }}
        >
          ${currTicket.price}
        </Text>
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            style={{
              alignSelf: "center",
              paddingVertical: 13,
              paddingHorizontal: 40,
              backgroundColor: "white",
              borderRadius: 50,
              marginBottom: 40,
            }}
            onPress={() => {
              setVisible(false);
            }}
          >
            <Text
              style={{
                color: "black",
                textAlign: "center",
                fontSize: 22,
                fontWeight: "bold",
              }}
            >
              CLOSE
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Overlay>
  ) : null;
}

const styles = StyleSheet.create({});
