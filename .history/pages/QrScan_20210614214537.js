import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { BarCodeScanner } from 'expo-barcode-scanner';


const styles = StyleSheet.create({
  button: {
    backgroundColor: "#2ed0cf",
    padding: 10,
  },
  text: {
    color: "white",
    textTransform: "uppercase",

    fontSize: 18,
    letterSpacing: 1.5,
  },
  input: {
    padding: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default function QrScan() {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("000");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    navigate(data);
    
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
  const navigation = useNavigation();

  
  function navigate(text) {
    console.log(text);
    if (text == "111") {
      
      navigation.navigate("Page1");
      
    } 
    else if (text == "112"){
      
      navigation.navigate("Page2");
      
    }
    else {
      alert("Invalid code");
    }
    setScanned(false);
    setText("000");
  }
  return (
    <View flex = {1}>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && <TouchableOpacity title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
      </View>
      <View flex = {0.25}></View>
      <View flex = {0.25}>
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
        onPress={() => navigate(text)}
      >
        <Text style={styles.text}>Go To Page</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}


