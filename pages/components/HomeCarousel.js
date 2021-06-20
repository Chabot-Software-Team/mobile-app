import React, {useState, useEffect} from "react";
import { Text, View, Dimensions, StyleSheet, TouchableOpacity} from "react-native";
import Carousel from 'react-native-snap-carousel';

import axios from 'axios';
import cheerio from 'cheerio';

const HomeCarousel = () => {

  const [activeIndex, setActiveIndex] = useState(0)
  const [carouselItems, setCarouselItems] = useState([])


  class Event{
      constructor(){
        this.title,
        this.date,
        this.desc
      }
  }

  var url = "https://chabotspace.org/events/events-listing/"

  async function fetchHTML(url) {
      const { data } = await axios.get(url)
      return cheerio.load(data)
    }

    useEffect(()=>{
      async function parse(){
          const $ = await fetchHTML(url)
          var events = []
          $('div.type-tribe_events').each(function(){
              var event = new Event()
              event.title = $(this).find('.tribe-events-list-event-title').text().trim()
              event.date = $(this).find('.tribe-event-schedule-details').text().trim().split("|")[0]
  
              var desc = $(this).find('.tribe-events-list-event-description').children().eq(0).text().trim()
              desc = desc.substr(0, 250);
              desc = desc.substr(0, Math.min(desc.length, desc.lastIndexOf(" ")))
              event.desc = desc + "...";
              events.push(event)
          })
          setCarouselItems(events)
      }
      parse()
  },[])


    const win = Dimensions.get('window');
      
    const styles = StyleSheet.create({
    card:{
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: '#1B2832',
      borderRadius: 5,
      height: 340,
      padding: 30,
      marginLeft: 1,
      marginRight: 1, 
    },
    cardTitle:{
      fontSize: 20,
      color: "#2ED0CF",
      marginTop: 10
    },
    cardDate:{
      fontSize: 15,
      color: "white",
      fontWeight: "bold",
      marginTop: 10
    },
    cardDesc:{
      fontSize: 15,
      color: "white",
      marginTop: 30
    },
    findMore:{
      padding: 2,
    },
    button:{
      backgroundColor: "#2ED0CF",
      padding: 9,
      marginRight: 60,
      marginLeft: 60
    }
    });
  
    const onPress = () => {
      // handle find more button press
    }
    
    const _renderItem = ({item,index}) => {
        return (
          <View style={styles.card}>
            <View>
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDate}>{item.date}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={onPress}
              >
             <Text style={{textAlign: "center"}}>Find out more</Text>
            </TouchableOpacity>
          </View>
        )
      }

    return (
        <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center'}}>
                <Carousel
                  layout={"default"}
                  // ref={ref => this.carousel = ref}
                  data={carouselItems}
                  sliderWidth={win.width}
                  itemWidth={350}
                  renderItem={_renderItem}
                  onSnapToItem = { index => setActiveIndex({activeIndex:index}) } />
            </View>
    )
}

export default HomeCarousel;