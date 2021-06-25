import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";

export default function Page1() {
  return(
  <ScrollView style = {styles.scrollView}>
    <Text style = {styles.text}>Page1 Page1Page1Page1Page1Page1Page1 
    Page1 Page1Page1Page1Page1Page1Page1Page1Page1
    Page1 Page1 Page1 Page1 Page1 
    </Text>
    
  </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 40
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
});
