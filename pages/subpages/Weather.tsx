import React, { useState } from "react";
import { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
} from "react-native";

import axios from "axios";
import cheerio, { CheerioAPI } from "cheerio";
import { Ionicons } from "@expo/vector-icons";
import { Telescopes } from "../../components/Telescopes";
export default function Weather() {
  interface Weather {
    name:
      | "Humidity"
      | "Temperature"
      | "Dewpoint"
      | "Wind speed"
      | "Wind direction";
    value: string;
  }
  const [weather, setWeather] = useState<Weather[]>([]);

  const win = Dimensions.get("window");

  const ratio1 = win.width / 1920; //1920 is actual image width

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      padding: 20,
    },
    imageStyle: {
      width: win.width,
      height: 862 * ratio1, //552 is actual height of image
    },
    break: {
      height: 30,
    },
    smallerText: {
      fontSize: 18,
      marginTop: 10,
    },
    smallerTextItalic: {
      fontSize: 13,
      fontStyle: "italic",
      marginTop: 10,
      textAlign: "center",
    },
    largerText: {
      fontSize: 20,
      fontWeight: "bold",
    },
    label: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#2ED0CF",
    },
    value: {
      fontSize: 18,
      color: "#1B2832",
    },
  });

  var url = "https://chabotspace.org/rain_data/Chabot_Weather_Sentinel.htm";

  async function fetchHTML(url: string): Promise<CheerioAPI> {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  }

  useEffect(() => {
    async function parse() {
      const $ = await fetchHTML(url);
      const weatherArray: Weather[] = [];
      let max = 0;
      $("tr").each(function () {
        if (max < 5) {
          let newItem: Weather = {
            name: $(this).children().eq(0).text().trim() as Weather["name"],
            value: $(this).children().eq(1).text().trim().replace("oF", "°F"),
          };
          weatherArray.push(newItem);
          max++;
        }
      });
      setWeather(weatherArray);
    }
    parse();
  }, []);

  return (
    <>
      <Image
        style={styles.imageStyle}
        source={require("../../assets/images/weather-station.png")}
      />
      <ScrollView style={styles.container}>
        <Text style={styles.largerText}>WEATHER STATION</Text>
        <Text style={styles.smallerText}>
          Chabot’s Weather Station provides current weather conditions measured
          from Chabot’s rooftop vantage point. Next time you visit the Center,
          look up at the tallest roof and see if you can find the Weather
          Station.
        </Text>

        <View style={styles.break}></View>
        {weather.map((item) => (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 10,
            }}
            key={item.name}
          >
            <Text style={styles.label}>{item.name}</Text>
            <Text style={styles.value}>{item.value}</Text>
          </View>
        ))}
        <Telescopes humidity={weather[0] ? parseInt(weather[0].value) : null} />
        <Text style={styles.smallerTextItalic}>
          The Weather Station is courtesy of Davis Instrument Corp.
        </Text>
      </ScrollView>
    </>
  );
}
