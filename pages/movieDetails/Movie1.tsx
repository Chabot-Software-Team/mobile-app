import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function Movie1({
  name,
  description,
  startTime,
}: {
  name: string;
  description: string;
  startTime: string;
}) {
  return (
    <View>
      <Text>Page1 </Text>
    </View>
  );
}
