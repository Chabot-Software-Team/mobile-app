import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Alert,
  Dimensions,
} from "react-native";
import ReactNativeZoomableView from "@openspacelabs/react-native-zoomable-view/src/ReactNativeZoomableView";
import { Ionicons } from "@expo/vector-icons";
//import { globalStyles } from "../globalStyles";

//https://www.npmjs.com/package/@dudigital/react-native-zoomable-view#events

//https://www.youtube.com/watch?v=Nw-vTpUPk6s

/*

-1. make it so that it doesn't get messed up while loading

0. Get screenshots for updated map
1. Configure view based on device dimensions (more or less done)
2. Add navigation to other pages (other floors of map)
3. Create function to allow modal to appear right above the buttons on the map (needs work)

3.5. disallow zooming while modal is visible (use onZoomBefore, and constantly move it to it's current position)

4. styling of everything

5. Allow for resizing of modal based on zoom, or just generally making it the correct size for viewing
6. allow for navigation to page within modal popup


*/

export default function Page3() {
  //const zoomableViewRef = React.createRef<ReactNativeZoomableView>();
  const [modalVisible, setModalVisible] = useState(false);
  const zoomableViewRef = React.createRef(ReactNativeZoomableView);

  // const [zoomLevel, setZoomLevel] = useState(1);
  //const [zoomStatus, setZoomStatus] = useState(0);
  const [zoomViewStatus, setZoomViewStatus] = useState(zoomableViewRef.current);

  //ReactNativeZoomableView = React.createRef();

  const windowWidth = Dimensions.get("window").width; //320
  const windowHeight = Dimensions.get("window").height; //600

  function handlePressed() {
    console.log("pressed 1");
    //console.log(zoomableViewRef.offsetX);
    setModalVisible(true);
  }
  function otherhandlePress() {
    //console.log(zoomableViewRef.offsetX)
    zoomableViewRef.current.moveBy(-30, 0);
    console.log("otherpressed");
  }

  function updateStatus() {
    // setZoomStatus(zoomableViewRef.current.offsetX);
    // setZoomLevel(zoomableViewRef.current.zoomLevel);
    setZoomViewStatus(zoomableViewRef.current);
  }

  // capture event is supposedly necessary to make it work with modals

  /*

Use the zoom data to load the component in different positions

*/

  /**
   *
   *
   */

  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 1,
          flexShrink: 1,
          height: windowHeight / 1.5,
          width: windowWidth,
        }}
      >
        <ReactNativeZoomableView
          maxZoom={2.5}
          minZoom={1}
          style={styles.zoomableView}
          onZoomAfter={() => updateStatus()}
          onShiftingAfter={() => updateStatus()}
          onDoubleTapAfter={() => updateStatus()}
          captureEvent={false}
          ref={zoomableViewRef}
        >
          <Modal
            visible={modalVisible}
            transparent={true}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <TouchableOpacity
              style={{
                position: "absolute",

                left: 190 + zoomViewStatus.offsetX * zoomViewStatus.zoomLevel,
                top: 250 + zoomViewStatus.offsetY * zoomViewStatus.zoomLevel,
              }}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <View
                style={{
                  opacity: 100,
                  backgroundColor: "green",
                  width: 40,
                  height: 40,
                }}
              ></View>
            </TouchableOpacity>
          </Modal>

          <ImageBackground
            source={{ uri: "https://i.imgur.com/jX39ibS.png" }}
            resizeMode="cover"
            style={styles.image}
          >
            <TouchableOpacity
              style={{ position: "absolute", left: 80, top: 100 }}
              onPress={() => zoomableViewRef.current.moveBy(-30, 0)}
            >
              <Ionicons name="arrow-down" size={20}></Ionicons>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ position: "absolute", left: 100, top: 100 }}
              onPress={() => console.log("pressed ")}
            >
              <Ionicons name="arrow-down" size={20}></Ionicons>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", left: 120, top: 200 }}
              onPress={() => setModalVisible(!modalVisible)}
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
      <View style={{ flexDirection: "row" }}>
        <Text>
          {" "}
          offsetY = {zoomViewStatus.offsetY} offsetX = {zoomViewStatus.offsetX}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",

    justifyContent: "flex-start",
    padding: 20,
  },
  zoomableView: {
    flex: 1,
  },
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
