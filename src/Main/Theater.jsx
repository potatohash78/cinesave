import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View, Text, Pressable, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { TheatersContext } from "../TheatersProvider";

export default function Theater({
  info,
  setRegion,
  showResults,
  setFocus,
  onMap,
  setChanges,
}) {
  const {
    theaters,
    setTheaters,
    currTheater,
    setCurrTheater,
    theaterNames,
    setTheaterNames,
  } = useContext(TheatersContext);
  const [openStatus, setOpenStatus] = useState();

  useEffect(() => {
    const date = new Date();
    const hours = info.hours_op;
    const regex = /\d+[a-z]m/g;
    let found = hours.match(regex);
    found = found.map((time) => {
      if (time[time.length - 2] === "p") {
        return (parseInt(time.substring(0, time.length - 2)) + 12) * 60;
      } else {
        return parseInt(time.substring(0, time.length - 2)) * 60;
      }
    });
    const minutes = date.getHours() * 60 + date.getMinutes();
    if (found[0] <= minutes && minutes <= found[1]) {
      setOpenStatus(true);
    } else {
      setOpenStatus(false);
    }
  }, []);

  return (
    <View
      style={[
        styles.resultContainer,
        onMap && { borderColor: "#C32528", borderWidth: 3, bottom: 140 },
      ]}
    >
      <Image source={{ uri: info.IMAGE }} style={{ width: "35%" }} />

      <View
        style={{
          flexDirection: "column",
          width: "65%",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              width: "70%",
            }}
          >
            {info.theater_name}
          </Text>
          <Text
            style={[
              openStatus && { color: "#5FD078" },
              !openStatus && { color: "#C32528" },
            ]}
          >
            {openStatus ? "OPEN" : "CLOSED"}
          </Text>
        </View>
        <View
          style={{
            marginLeft: 10,
            flexDirection: "row",
            marginTop: 10,
            width: "100%",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: "80%",
            }}
          >
            <Text style={{ width: "100%" }}>{info.theater_address}</Text>
            <Text style={{ width: "100%" }}>
              {info.theater_city}, {info.theater_state} {info.zipcode}
            </Text>
          </View>
          <Pressable
            onPress={(e) => {
              e.stopPropagation();
              showResults(false);
              setRegion({
                latitude: info.latitude,
                longitude: info.longitude,
                latitudeDelta: 0.0461,
                longitudeDelta: 0.021,
              });
              setFocus(info);
            }}
            style={{ zIndex: 99 }}
          >
            <Ionicons name="location" size={35} color="#C32528" />
          </Pressable>
        </View>
        <View style={{ marginLeft: 10, marginTop: 15 }}>
          <Text style={{ fontWeight: "bold" }}>HOURS</Text>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>TODAY</Text>
            <Text style={{ marginLeft: 40, textTransform: "uppercase" }}>
              {info.hours_op}
            </Text>
            <Pressable>
              <Ionicons name="chevron-down" size={20} />
            </Pressable>
          </View>
        </View>

        <View style={{ marginLeft: 10, marginTop: 10 }}>
          {theaters.includes(info.theater_id) ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  backgroundColor: "#BCBCBC",
                  borderRadius: 50,
                  paddingVertical: 5,
                  paddingHorizontal: 20,
                }}
              >
                <Text style={{ color: "#E4E4E4", fontWeight: "bold" }}>
                  ADDED
                </Text>
              </View>
              <Pressable
                onPress={(e) => {
                  e.stopPropagation();
                  if (theaters.length > 1) {
                    setTheaters(
                      theaters.filter((theater) => theater !== info.theater_id)
                    );
                    setTheaterNames(
                      theaterNames.filter(
                        (theater) => theater !== info.theater_name
                      )
                    );
                    if (currTheater === info.theater_name) {
                      setCurrTheater(theaterNames[0]);
                    }
                    setChanges(true);
                  }
                }}
              >
                <View
                  style={{
                    backgroundColor: "#C32528",
                    borderRadius: 50,
                    paddingVertical: 5,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    REMOVE
                  </Text>
                </View>
              </Pressable>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                backgroundColor: "#C32528",
                borderRadius: 50,
                paddingVertical: 5,
                width: "70%",
              }}
              onPress={() => {
                setTheaters([...theaters, info.theater_id]);
                setTheaterNames([...theaterNames, info.theater_name]);
                showResults(false);
                const newRegion = {
                  latitude: info.latitude,
                  longitude: info.longitude,
                  latitudeDelta: 0.0461,
                  longitudeDelta: 0.021,
                };
                setRegion(newRegion);
                setFocus(info);
                setChanges(true);
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                ADD THEATER
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    backgroundColor: "#FFFFFFFF",
    width: "90%",
    left: 20,
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
  },
});
