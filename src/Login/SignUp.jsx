import React, { useState, useContext } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from "react-native";
import { firestore, auth } from "../../firebase";
import { UserContext } from "../UserProvider";
import { PurchaseContext } from "../PurchaseProvider";

const googleImage = require("../../assets/Google.png");

export default function SignUp(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const { setUser } = useContext(UserContext);
  const { setLoggedIn } = useContext(PurchaseContext);

  async function handleSubmit() {
    try {
      await auth.createUserWithEmailAndPassword(email, password);

      const newUser = {
        firstName: firstName,
        lastName: lastName,
        birthDate: birthDate,
        password: password,
        username: username,
        email: email,
        premium: false,
        id: auth.currentUser.uid,
      };

      await firestore
        .collection("users")
        .doc(auth.currentUser.uid)
        .set(newUser);

      setUser(newUser);
      setLoggedIn(true);

      props.nav.replace("Main", { screen: "Home" });
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
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
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
      <View style={{ flex: 1, justifyContent: "flex-end" }}>
        <TouchableOpacity style={styles.googleContainer}>
          <Text style={styles.googleSignup}>Sign up using</Text>
          <Image source={googleImage} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    flex: 1,
  },

  field: {
    backgroundColor: "white",
    fontSize: 18,
    fontWeight: "bold",
    borderRadius: 50,
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    width: 300,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },

  signupContainer: {
    backgroundColor: "#C32528",
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 50,
    paddingRight: 50,
    marginTop: 35,
    borderRadius: 50,
  },

  signup: {
    color: "white",
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
    borderRadius: 50,
    flexDirection: "row",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    borderWidth: 1,
    borderColor: "#C4C4C4",
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
