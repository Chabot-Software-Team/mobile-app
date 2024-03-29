import React from "react";
import { useEffect, useState } from "react";
import { StyleSheet, Text, ScrollView } from "react-native";

import axios from "axios";
import cheerio, { CheerioAPI } from "cheerio";

export default function Calendar() {
  const [calendar, setCalendar] = useState([]);

  var url: string = "https://chabotspace.org/events/calendar-view/";

  async function fetchHTML(url: string): Promise<CheerioAPI> {
    const { data } = await axios.get(url);
    return cheerio.load(data);
    // return data
  }

  class Event {
    month: string;
    dayOfWeek: string;
    date: string;
    name: string;
    constructor() {
      (this.month = ""),
        (this.dayOfWeek = ""),
        (this.date = ""),
        (this.name = "");
    }
  }
  const localDate: Date = new Date();
  const months: string[] = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth: string = months[localDate.getMonth()];

  useEffect(() => {
    async function parse() {
      const $ = await fetchHTML(url);
      var events: Event[] = [];
      $(".tribe-events-has-events").each(function () {
        var event = new Event();
        event.date = $(this).children().eq(0).text().trim();
        event.name = $(this).find(".tribe-events-month-event-title").text();
        console.log(event);
        events.push(event);
      });
      setCalendar(events);
    }
    parse();
  }, []);

  return (
    <ScrollView>
      {calendar.map((event) => (
        <Text style={styles.button}>
          {" "}
          {currentMonth} {event.date} - {event.name}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 15,
    width: "100",
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    marginBottom: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 20,
  },
});
