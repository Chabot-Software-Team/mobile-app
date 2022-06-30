import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Linking
} from "react-native";
import Carousel from "react-native-snap-carousel";
import LottieView from "lottie-react-native";
import axios from "axios";
import cheerio from "cheerio";

const HomeCarousel = () => {
  const [loaded, setLoaded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [carouselItems, setCarouselItems] = useState([]);

  class Event {
    title: string;
    date: string;
    desc: string;
    link: string;
    constructor() {
      this.title, this.date, this.desc, this.link;
    }
  }

  var url: string = "https://chabotspace.org/events/events-listing/";

  async function fetchHTML(url: string) {
    const { data } = await axios.get(url);
    return cheerio.load(data);
  }

  useEffect(() => {
    async function parse() {
      const $ = await fetchHTML(url);
      var events: Event[] = [];
      $("div.type-tribe_events").each(function () {
        var event = new Event();
        event.title = $(this)
          .find(".tribe-events-list-event-title")
          .text()
          .trim();
        event.link = $(this)
          .find(".tribe-events-list-event-title")
          .find("a")
          .attr("href");
        event.date = $(this)
          .find(".tribe-event-schedule-details")
          .text()
          .trim()
          .split("|")[0];
        var desc = $(this)
          .find(".tribe-events-list-event-description")
          .children()
          .eq(0)
          .text()
          .trim();
        desc = desc.substr(0, 250);
        desc = desc.substr(0, Math.min(desc.length, desc.lastIndexOf(" ")));
        event.desc = desc + "...";
        events.push(event);
      });
      setCarouselItems(events);
      setLoaded(true);
    }
    parse();
  }, []);

  const win = Dimensions.get("window");

  const styles = StyleSheet.create({
    card: {
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "#1B2832",
      borderRadius: 5,
      height: 340,
      padding: 30,
      marginLeft: 1,
      marginRight: 1,
    },
    cardTitle: {
      fontFamily: "Futura",
      fontSize: 20,
      color: "#2ED0CF",
      marginTop: 10,
    },
    cardDate: {
      fontFamily: "Futura",
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
      marginTop: 10,
    },
    cardDesc: {
      fontFamily: "Futura",
      fontSize: 15,
      color: "white",
      marginTop: 30,
      lineHeight: 18
    },
    findMore: {
      fontFamily: "Futura",
      textAlign: "center"
    },
    button: {
      backgroundColor: "#2ED0CF",
      padding: 9,
      marginRight: 60,
      marginLeft: 60,
    },
  });

  const onPress = (link: string) => {
    Linking.openURL(link);
    // handle find more button press
  };

  // const _renderItem = ({ item, index }) => {
  const _renderItem = ({ item }: {item: Event}) => {
    return (
      <View style={styles.card}>
        <View>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <Text style={styles.cardDate}>{item.date}</Text>
          <Text style={styles.cardDesc}>{item.desc}</Text>
        </View>
        <TouchableOpacity style={styles.button} onPress={() => { onPress(item.link) }}>
          <Text style={styles.findMore}>Find out more</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
      {loaded ? (
        <Carousel
          layout={"default"}
          // ref={ref => this.carousel = ref}
          data={carouselItems}
          sliderWidth={win.width}
          itemWidth={350}
          renderItem={_renderItem}
          onSnapToItem={(index) => setActiveIndex(index)}
        />
      ) : (
        <LottieView
          source={require("../assets/animations/planet-loader.json")}
          autoPlay
          loop
        />
      )}
    </View>
  );
};

export default HomeCarousel;
