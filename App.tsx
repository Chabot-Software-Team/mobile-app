import React, { useEffect, useState } from "react";
import TabNavigation from "./components/TabNavigation";
import * as Linking from "expo-linking";
import { useFonts } from "expo-font";

const prefix = Linking.createURL("/");

export default function App() {
  const [data, setData] = useState(null);
  const [loaded] = useFonts({
    Futura: require("./assets/fonts/futura/Futura_Medium_bt.ttf"),
  });

  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "home",
        QrScan: "qrscan",
        Movies: "movies",
      },
    },
  };
  const handleDeepLink = (event: any) => {
    let data = Linking.parse(event.url);
    setData(data);
  };

  useEffect(() => {
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  if (!loaded) return null;
  return <TabNavigation linking={linking} />;
}
