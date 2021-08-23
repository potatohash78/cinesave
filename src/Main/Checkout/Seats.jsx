import React, { useContext, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  SafeAreaView,
  useWindowDimensions,
  ScrollView,
  Animated,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SelectMultipleGroupButton } from "react-native-selectmultiple-button";
import { PinchGestureHandler, State } from "react-native-gesture-handler";
import { CheckoutContext } from "../../CheckoutProvider";

const imagePath = require("../../../assets/screen.png");

export default function Seats({ scroll }) {
  const { width: windowWidth } = useWindowDimensions();
  const { date, currSeats, setCurrSeats } = useContext(CheckoutContext);
  const [scale, setScale] = useState(new Animated.Value(1));
  const [zoom, setZoom] = useState(1);
  const [change, setChange] = useState(1);
  const [numCols, setNumCols] = useState(24);
  const [numRows, setNumRows] = useState(10);
  const [seats, setSeats] = useState(generateMatrix());

  scale.addListener(({ value }) => setZoom(value));

  function generateMatrix() {
    let matrix = [];
    // for (let i = 0; i < 8; i++) {
    //   matrix[i] = [];
    //   for (let j = 0; j < 20; j++) {
    //     matrix[i][j] = <Seat key={[i, j]} seat={[i, j]} />;
    //   }
    // }
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        matrix.push({
          value: (i + 10).toString(36) + (j + 1),
          displayValue: "",
        });
      }
    }
    return matrix;
  }

  useEffect(() => {
    setCurrSeats([]);
    setScale(new Animated.Value(1));
  }, [change]);

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={[styles.dateTime]}>
          {date.toLocaleString("default", { weekday: "long" })}
          {", "}
          {date.toLocaleString("default", {
            month: "long",
          })}{" "}
          {date.getDate()}
          {"  "}|{"  "}
          {date.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}
        </Text>
        <Text style={[styles.instructions]}>
          Pinch to zoom and drag to find your desired seat.
        </Text>
        <View style={{ marginTop: 20, marginLeft: 15 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.available]} />
            <Text style={[styles.instructionsText]}>Available</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.selected]} />
            <Text style={[styles.instructionsText]}>Selected</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={[styles.unavailable]} />
            <Text style={[styles.instructionsText]}>Unavailable</Text>
          </View>
        </View>

        <Image
          source={imagePath}
          style={{ width: "92%", alignSelf: "center", marginTop: 25 }}
        />
        <Text style={[styles.screen]}>SCREEN</Text>
        <View
          style={{
            width: "100%",
            overflow: "hidden",
            height: 200,
            marginTop: 5,
          }}
        >
          <PinchGestureHandler
            onGestureEvent={Animated.event(
              [
                {
                  nativeEvent: {
                    scale: scale,
                  },
                },
              ],
              {
                useNativeDriver: true,
              }
            )}
            onHandlerStateChange={(e) => {
              if (e.nativeEvent.oldState === State.ACTIVE) {
                if (zoom < 1) {
                  Animated.spring(scale, {
                    toValue: 1,
                    useNativeDriver: true,
                  }).start();
                }
              }
            }}
          >
            <Animated.View
              style={{
                width: "100%",
                flex: 1,
                transform: [{ scale: scale }],
                justifyContent: "space-between",
              }}
            >
              <SelectMultipleGroupButton
                maximumNumberSelected={2}
                group={seats}
                highLightStyle={{
                  borderColor: "#C325281A",

                  backgroundColor: "#C325281A",

                  textColor: "gray",

                  borderTintColor: "#C32528",

                  backgroundTintColor: "#C32528",

                  textTintColor: "#C32528",
                }}
                buttonViewStyle={{
                  width: windowWidth / ((3 * numCols) / 2),
                  borderRadius: 50,
                  height: windowWidth / ((3 * numCols) / 2),
                  margin: windowWidth / (6 * numCols),
                }}
                singleTap={(valueTap) => {
                  if (currSeats.includes(valueTap)) {
                    setCurrSeats(currSeats.filter((seat) => seat !== valueTap));
                  } else if (currSeats.length < 2) {
                    setCurrSeats([...currSeats, valueTap]);
                  }
                }}
              />
            </Animated.View>
          </PinchGestureHandler>
        </View>
        <View style={[styles.seatContainer]}>
          <Text style={[styles.seatText]}>YOUR SEAT</Text>
          {currSeats.map((seat, index) => (
            <View
              key={index}
              style={{
                width: "100%",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flex: 1,
                marginTop: 5,
              }}
            >
              <TouchableOpacity
                style={[styles.seatBtn]}
                onPress={() => {
                  setCurrSeats(currSeats.filter((_) => _ !== seat));
                }}
              >
                <Text style={[styles.selectedSeat]}>{seat}</Text>
                <Ionicons name="close" color="#C32528" size={18} />
              </TouchableOpacity>
            </View>
          ))}
          {currSeats.length > 0 && (
            <TouchableOpacity
              style={[styles.confirmBtn]}
              onPress={() => {
                scroll(windowWidth * 3);
              }}
            >
              <Text style={[styles.confirm]}>CONFIRM</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <Pressable
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            setChange(change * -1);
            scroll(windowWidth);
          }}
        >
          <Ionicons name="chevron-back-sharp" size={50} color="#C32528" />
          <Text style={[styles.backBtn]}>BACK</Text>
        </Pressable>
      </View>
      <SafeAreaView style={{ flex: 0, backgroundColor: "white" }} />
    </View>
  );
}

const styles = StyleSheet.create({
  dateTime: {
    textTransform: "uppercase",
    fontSize: 21,
    color: "#C32528",
    marginLeft: 15,
  },

  instructions: {
    color: "#C32528",
    marginHorizontal: 15,
    marginTop: 20,
    fontSize: 16,
  },

  available: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C32528",
    opacity: 0.1,
  },

  instructionsText: {
    marginLeft: 5,
    color: "#C32528",
  },

  selected: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#C32528",
  },

  unavailable: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#E4E4E4",
  },

  screen: {
    color: "#C32528",
    width: "100%",
    textAlign: "center",
    fontSize: 17,
    bottom: 15,
  },

  backBtn: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 14,
    right: 10,
  },

  seatContainer: {
    width: "100%",
    height: 150,
    backgroundColor: "#C32528",
    paddingTop: 10,
    paddingLeft: 20,
    marginTop: 50,
    alignItems: "flex-start",
  },

  seatText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 25,
  },

  seatBtn: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 50,
    alignItems: "center",
  },

  selectedSeat: {
    color: "#C32528",
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  confirmBtn: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 50,
    alignSelf: "center",
    marginBottom: 10,
  },

  confirm: {
    color: "#C32528",
    fontWeight: "bold",
    fontSize: 18,
  },
});
