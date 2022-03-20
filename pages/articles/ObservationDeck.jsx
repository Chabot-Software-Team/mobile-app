import React from "react";
import { StyleSheet, Text, View, ScrollView, Image } from "react-native";

import YoutubePlayer from "react-native-youtube-iframe";

import CaptionedImage from "../../components/CaptionedImage";

//https://chabotspace.org/visit/exhibits/observation-deck/

export default function ObservationDeck() {
  return (
    <ScrollView>
      <View>
        <YoutubePlayer height={300} play={true} videoId={"84WIaK3bl_s"} />
      </View>
      <CaptionedImage
        headerText={"OBSERVATION DECK"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "The Chabot Observation Deck is Chabot’s newest permanent Exhibit that invites visitors to observe the world around them in new ways. Opened in April 2018, the 3200 sq. ft. exhibition area features 12 interactive stations. The Observatory Deck expansion was made possible through Measure WW funds. Exhibits were designed and build by the Exploratorium."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"SOUND OBSERVATORY"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "The Sound Observatory is an environmental sound experience that samples the universe at all scales. Sonified earthquakes, quarks and songbirds are all at the fingertips of visitors willing to spend some time observing the universe with their ears. Sounds have been collected from NASA’s sound library and field researchers who utilize sound’s unique capacity to “see” the world in new ways."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"SKY STATION"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "At the Sky Station, visitors will use a variety of tools to notice and investigate the conditions of the daytime sky and atmosphere around them."
        }
      ></CaptionedImage>{" "}
      <CaptionedImage
        subHeaderText={"SKY MIRROR"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "Sky Mirror, situated at the uppermost point of Sky Station, reflects the conditions of the sky on a highly polished mirror. Visitors are able to shift the angle of the mirror to reflect different parts of the sky, noticing just how multifaceted this massive canvas can be."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"SKY MOSAIC"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "At Sky Mosaic visitors try to match shades of color in different sky images while learning how the water content and direction of the sun can dramatically impact the colors we see. Visitors are also invited to find colors that remind them of memorable skies and leave a short, written story about that moment."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"PINHOLE CAMERAS"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "Pinhole cameras are a simple and elegant display of light. Visitors to the Sky Station will be able to play, observe and interact with the pinhole camera wall, as well as investigate a larger portion of the deck with portable pinhole cameras that will be stacked next to the wall. Half of these portable cameras will have adjustable focal lengths."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"LAB BENCH"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "At the Lab Bench, visitors can examine materials from the landscape under mounted magnifying glasses. Each station will include an area for sketching observations, recording micro details, or taking rubbings. The lab bench allows for a prolonged investigation of materials that we often breeze by at a glance. Pine needles, grass, local flowers and rocks will take center stage. Chabot staff will have the opportunity to seed this exhibit with local materials that are intriguing and relevant to the season and location. This exhibit will provide a space for reflection, interpretation, sharing and questioning."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"Sound Observatory"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "The Sound Observatory is an environmental sound experience that samples the universe at all scales. Sonified earthquakes, quarks and songbirds are all at the fingertips of visitors willing to spend some time observing the universe with their ears. Sounds have been collected from NASA’s sound library and field researchers who utilize sound’s unique capacity to “see” the world in new ways."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"DAILY LOG"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "The Daily Log will act as a introduction to the deck, grounding visitors in experience of observation, documentation, and exploration. This dynamic display will be populated with information about terrestrial happenings, celestial events, and local information gathered by Chabot staff and volunteers. Creative visitor contributions could also be included in the form of a “drawing of the day” or a piece of writing."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"MOUNTED TELESCOPES"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "Four different rail mounted scopes with adjustable viewing tools will be scattered throughout the deck for visitors to explore. A combination of binoculars, monoculars, and a cell phone spotting scope will facilitate interesting terrestrial, solar and celestial observations during both the daytime and nighttime. These scopes yield satisfying optical results and act as a nice counter-experience to the large-scale telescopes housed in the observatories."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"BIG DIPPER"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "The Big Dipper exhibit will help illustrate how we perceive the night sky on Earth. From one vantage point on the deck, visitors will be able to see the Big Dipper constellation clearly. From the side, however, visitors will see that the “stars” that make up the big dipper do not exist in the same plane but are in fact and all at different depths from the viewer. To highlight this further, a small model that can be viewed at multiple angles will accompany this exhibit."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"SUN OBSERVATORY"}
        uri={
          "http://chabotspace.org/wp-content/uploads/2018/07/observation-deck-1.png"
        }
        bodyText={
          "The Sun Observatory is a flexible platform for safe and in-depth investigations of the sun. This exhibit is built around its heliostat– a tool that tracks the sun’s movement throughout the day and funnels light through a scope. Around the edges of the heliostat, visitors will be encouraged to use beams of sunlight to investigate the different properties of the electromagnetic spectrum through open-ended play at Sunlight Island. Prisms, lenses, filters and other tools will be used. In addition, the exhibit will use a solar projector that will project a live image of the sun onto a screen below. Visitors will not only be able to observe the sun in detail, but they will be able to observe the technology and tools that are used to create this projection. Different scopes already within the Chabot collection can be swapped out with the solar projector to add even more opportunity for exploration and programming."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"TELESCOPE PAD"}
        bodyText={
          "The telescope pad is isolated from vibrations of the deck, making high-magnification observation possible. Separated from the architecture of the deck and weighted to provide a stable surface, this platform is critical for successful instrument use. When scopes are not installed, this platform can be activated with programming once a day to track the sun’s placement in the sky or simply fade back into the architecture of the deck."
        }
      ></CaptionedImage>
      <CaptionedImage
        subHeaderText={"MUTUAL AIR: A COLLABORATIVE INSTALLATION"}
        bodyText={
          "What’s that sound? An Oakland-wide Art Installation, designed by artist Rosten Woo and The Exploratorium, to make visible the ubiquitous yet invisible public commons: the air. Mutual Air is a network of bells that reflect the composition of our air. Thirty chimes will work together in Oakland, and across the Bay, to provide a detailed picture of real-time pollutant concentrations, Mutual Air is a series of sensor-activated chimes that sonify carbon fluctuations. The first public bells are installed at The Exploratorium, Chabot Space and Science Center Observation Deck, and the Oakland Museum of California.  These sculptures work in unison, ringing out the daily highs and lows of carbon concentration and densities of particulate matter, utilizing interest in civic art to enhance the quality of environmental monitoring and synchronizing residents with one another and their environment in a new way."
        }
      ></CaptionedImage>
    </ScrollView>
  );
}
