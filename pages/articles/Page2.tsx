import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Ionicons } from "@expo/vector-icons";
import { globalStyles } from "../globalStyles";

export default function Page2() {
  //const zoomableViewRef = React.createRef<ReactNativeZoomableView>();
  const [modalVisible, setModalVisible] = useState(false);

  function handlePressed() {
    console.log("pressed 1");
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <View style={{ borderWidth: 1, flexShrink: 1, height: 500, width: 200 }}>
        <ReactNativeZoomableView
          maxZoom={2.5}
          minZoom={1}
          style={styles.zoomableView}
        >
          <ImageBackground
            source={{ uri: "https://i.imgur.com/jX39ibS.png" }}
            resizeMode="cover"
            style={styles.image}
          >
            <Modal
              visible={modalVisible}
              transparent={true}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <TouchableOpacity
                style={{ position: "absolute", left: 60, top: 250 }}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text>close me</Text>
              </TouchableOpacity>
            </Modal>

            <TouchableOpacity
              style={{ position: "absolute", left: 50, top: 200 }}
              onPress={() => handlePressed()}
            >
              <Ionicons name="arrow-down" size={20}></Ionicons>
            </TouchableOpacity>

            <View
              style={{
                opacity: 0,
                height: 1,
                width: 200,
                backgroundColor: "white",
              }}
            >
              {/*You need this view, or you need to do something to fix it, don't delete it*/}
            </View>
          </ImageBackground>
        </ReactNativeZoomableView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  zoomableView: {},
  button: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
