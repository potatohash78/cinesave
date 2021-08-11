import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { CheckoutContext } from "../../CheckoutProvider";

export default function Seat({ seat }) {
  const [clicked, setClicked] = useState(false);
  const { currSeat, setSeat } = useContext(CheckoutContext);

  //   useEffect(() => {
  //     setClicked(false);
  //   }, [currSeat]);

  const onPress = () => {
    setClicked(true);
    setSeat(seat);
  };

  return (
    <TouchableOpacity
      style={[styles.availableSeat, clicked && styles.selectedSeat]}
      onPressIn={onPress}
    />
  );
}

const styles = StyleSheet.create({
  availableSeat: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#C32528",
    opacity: 0.1,
  },

  selectedSeat: {
    opacity: 1,
  },
});
