import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2ed0cf",
    padding: "10px 30px",
  },
  text: {
    color: "white",
    textTransform: "uppercase",
    fontWeight: "400",
    fontSize: 18,
    letterSpacing: 1.5,
  },
  input: {
    padding: 10,
  },
  container: {},
});

export default function QrScan() {
  const navigation = useNavigation();

  const [text, setText] = useState("");
  function navigate(text) {
    if (text == "111") {
      navigation.navigate("../pages/articles/Page1");
    } else {
      alert("Invalid code");
    }
  }
  return (
    <View>
      <TextInput
        style={{
          height: 40,
          borderColor: "gray",
          borderWidth: 1,
        }}
        placeholder='type your code here'
        onChangeText={(input) => setText(input)}
      ></TextInput>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("../pages/articles/Page1")}
      >
        <Text style={styles.text}>Go To Page</Text>
      </TouchableOpacity>
    </View>
  );
}
