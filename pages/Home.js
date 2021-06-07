import React from "react";
import { Text, View, Image, Dimensions, StyleSheet} from "react-native";

function AudioPlayer() {
  const win = Dimensions.get('window');
  const ratio = win.width/1125; //541 is actual image width


  const styles = StyleSheet.create({
    imageStyle: {
      width: win.width,
      height: 552 * ratio, //362 is actual height of image



  },
  flex:{
    flex: 1,
    justifyContent: 'space-between',
    // marginBottom: 36
  }
  });
  // dfdsafsa
  return (
    <View style={styles.flex}>
      <Text>Home Page</Text>
      <Image
      style={styles.imageStyle}
      source={require('../assets/images/trees.png')}
  // source={{ uri: '../images/trees.png' }}
  // style={{ width: 40, height: 40 }}
/>
    </View>
  );
}

export default AudioPlayer;
