import * as React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
//<MapView style={styles.map} />
export default function Map() {
  return (
    <View style={styles.container}>
      <ImageZoom
        cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={(((Dimensions.get("window")).width))}
                       imageHeight={(((Dimensions.get("window")).width)/2344*1290)}>
                <Image style={{width:(((Dimensions.get("window")).width)), height:(((Dimensions.get("window")).width)/2344*1290)}}
                               source={require("../assets/images/chabot-maps.png")}/>
            
            </ImageZoom>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  }
});
