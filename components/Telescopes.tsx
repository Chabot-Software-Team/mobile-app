import React from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import { Image } from "react-native-elements/dist/image/Image";

interface TelescopeProps {
  humidity?: number;
}

export const Telescopes: React.FC<TelescopeProps> = (props) => {
  const telescopes = [
    {
      name: "Leah",
      threshold: 90,
    },
    {
      name: "Rachel",
      threshold: 90,
    },
    {
      name: "Nellie",
      threshold: 85,
    },
  ];

  const win = Dimensions.get("window");

  const width = (win.width - 100) / 3;

  const styles = StyleSheet.create({
    name: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#1B2832",
      textAlign: "center",
    },
    image: {
      width: width,
      height: width,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 10,
        marginTop: 10,
      }}
    >
      {telescopes.map((telescope) => {
        var status = "";
        if (props.humidity > telescope.threshold) {
          status = "closed";
        } else {
          status = "open";
        }
        return (
          <View key={telescope.name}>
            {status == "open" ? (
              <Image
                style={styles.image}
                source={require(`../assets/images/observatory-open.png`)}
              />
            ) : (
              <Image
                style={styles.image}
                source={require(`../assets/images/observatory-closed.png`)}
              />
            )}

            <Text style={styles.name}>{telescope.name}</Text>
          </View>
        );
      })}
    </View>
  );
};
