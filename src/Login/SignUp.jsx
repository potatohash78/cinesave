import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
} from "react-native";
import { firestore, auth } from "../../firebase";

const googleImage = require("../../assets/Google.png");

export default function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  async function handleSubmit() {
    const email = username + "@gmail.com";
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      const newUser = {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        password: password,
        username: username,
      };
      await firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .set(newUser);

      props.nav.replace("Main", { screen: "Home", user: newUser });
    } catch (error) {
      console.error("Couldn't make user", error);
      setFirstName("");
      setLastName("");
      setBirthDate("");
      setPassword("");
      setUsername("");
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.field}
        placeholder="First name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.field}
        placeholder="Last name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.field}
        placeholder="Date of birth"
        value={birthDate}
        onChangeText={setBirthDate}
      />
      <TextInput
        style={styles.field}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.field}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.signupContainer} onPress={handleSubmit}>
        <Text style={styles.signup}>SIGN UP</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.googleContainer}>
        <Text style={styles.googleSignup}>Sign up using</Text>
        <Image source={googleImage} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },

  field: {
    backgroundColor: "white",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 50,
    marginTop: 30,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: 300,
  },

  signupContainer: {
    backgroundColor: "white",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 60,
    borderRadius: 50,
  },

  signup: {
    color: "#C32528",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  googleContainer: {
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 80,
    borderRadius: 50,
    flexDirection: "row",
  },

  googleSignup: {
    padding: 0,
    color: "#BCBCBC",
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 5,
  },
});
