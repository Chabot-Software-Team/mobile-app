/*import React from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";

import { BarCodeScanner } from "expo-barcode-scanner";
 
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
    flexDirection: "column",
    justifyContent: "center",
  },
});

export default function QrScan() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("000");

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const handleBarCodeScanned = ({ data }: { data: string }) => {
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

  function navigate(text: string) {
    console.log(text);
    if (text == "111") {
      navigation.navigate("Page1");
    } else if (text == "112") {
      navigation.navigate("Page2");
    }

    setScanned(false);
    setText("000");
  }
  return (
    <View style = {styles.container}>
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          
        />
        
      </View>
      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder="type your code here"
          onChangeText={(input) => setText(input)}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={() => navigate(text)}>
          <Text style={styles.text}>Go To Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

*/

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { useNavigation } from "@react-navigation/native";

//https://reactjs.org/docs/hooks-rules.html

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
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
  scannerContainer: {
    flex: 3,
    flexDirection: "column",
    justifyContent: "center",
    padding: 10,
  },
});

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [text, setText] = useState("000");
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  function navigate(text: string) {
    console.log(text);

    if (text == "111") {
      navigation.navigate("Page1");
    } else if (text == "112") {
      navigation.navigate("Page2");
    } else if (text == "113") {
      navigation.navigate("Map");
      console.log("going to map");
    } else if (text == "4") {
      navigation.navigate("Page3");
    } else if (text == "1") {
      navigation.navigate("Studio1");
    } else if (text == "2") {
      navigation.navigate("Studio2");
    } else if (text == "3") {
      navigation.navigate("Studio3");
    }
  }

  const handleBarCodeScanned = (data: any) => {
    setScanned(true);
    console.log("something scanned");
    console.log(data.data);
    navigate(data.data);
    setScanned(false);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </View>

      <View style={styles.container}>
        <TextInput
          style={{
            height: 40,
            borderColor: "gray",
            borderWidth: 1,
          }}
          placeholder="type your code here"
          onChangeText={(input) => setText(input)}
        ></TextInput>
        <TouchableOpacity style={styles.button} onPress={() => navigate(text)}>
          <Text style={styles.text}>Go To Page</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
