import * as React from "react";
import { StyleSheet, View, Dimensions, Image } from "react-native";
//@ts-ignore
import ZoomableImage from "../lib/react-native-interactive-image";
// import ImageZoom from "react-native-image-pan-zoom";
//<MapView style={styles.map} />
export default function Map() {

  const annotations = [
    {
      x1: 25,
      x2: 35,
      y1: 20,
      y2: 30,
      description: 'A pair of black running sports shoes, has lace-up detail. Textile and mesh upper',
    },
    {
      x1: 60,
      x2: 70,
      y1: 15,
      y2: 25,
      description: 'Shoe sole tip!',
    },
    {
      x1: 20,
      x2: 30,
      y1: 50,
      y2: 60,
      description: 'Textured and patterned outsole',
    },
    {
      x1: 65,
      x2: 75,
      y1: 65,
      y2: 75,
      description: 'Textured outsole with a stacked heel',
    },
  ]

  return (
    <View style={styles.container}>
      {/* <ImageZoom
        cropWidth={Dimensions.get('window').width}
                       cropHeight={Dimensions.get('window').height}
                       imageWidth={(((Dimensions.get("window")).width))}
                       imageHeight={(((Dimensions.get("window")).width)/2344*1290)}>
                <Image style={{width:(((Dimensions.get("window")).width)), height:(((Dimensions.get("window")).width)/2344*1290)}}
                               source={require("../assets/images/chabot-maps.png")}/>
            
            </ImageZoom> */}
      <ZoomableImage
          source={ require("../assets/images/chabot-maps.png") }
          imageHeight={(((Dimensions.get("window")).width)/2344*1290)}
          imageWidth={(((Dimensions.get("window")).width))}
          annotations={ annotations }
          popOverStyles={ { backgroundColor: 'white' } }
/>
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