import React from "react";
import { Text, View } from "react-native";
import WebView from "react-native-webview";

export default function Staff() {
  return (
    <WebView
      source={{
        uri: "https://www.volgistics.com/ex2/vicnet.dll?FROM=13431",
      }}
    />
  );
}
