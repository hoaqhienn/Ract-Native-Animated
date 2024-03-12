import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, SafeAreaView, Image } from "react-native";

const App = () => {
  const y = useRef(new Animated.Value(0)).current;
  const x = useRef(new Animated.Value(1)).current;

  const fiveA = useRef(new Animated.Value(0)).current;
  const fiveB = useRef(new Animated.Value(0)).current;

  const shipScale = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        //4.
        Animated.sequence([
          Animated.parallel([
            Animated.timing(y, {
              toValue: 600,
              duration: 5000,
              useNativeDriver: true,
            }),
            Animated.sequence([
              Animated.delay(4000),
              Animated.timing(x, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true,
              }),
            ]),
          ]),
          Animated.timing(y, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(x, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }), //*
        //5A.
        Animated.sequence([
          Animated.sequence([
            Animated.timing(fiveA, {
              toValue: 1000, // Adjust this value to control the distance the ship moves
              duration: 2000, // Adjust this value to control the animation speed
              useNativeDriver: true,
            }),
            Animated.timing(shipScale, {
              toValue: 1,
              duration: 1,
              useNativeDriver: true,
            }),
          ]),

          Animated.sequence([
            Animated.timing(fiveA, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(shipScale, {
              toValue: -1,
              duration: 1,
              useNativeDriver: true,
            }),
          ]),
        ]), //*
        //5.
        Animated.sequence([
          Animated.timing(fiveB, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(fiveB, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ]), //*
      ])
    ).start();
  }, []);

  const fontSize = fiveB.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 36], // Start and end font sizes
  });

  const imgSize = fiveB.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 200], // Start and end font sizes
  });

  const colorAnimation = fiveB.interpolate({
    inputRange: [0, 0.25, 0.5, 0.75, 1],
    outputRange: ["red", "orange", "yellow", "green", "blue"], // Rainbow colors
  });

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={{
          position: "absolute",
          bottom: y,
          left: 100,
          opacity: x,
          zIndex: 0,
        }}
      >
        <Image
          source={require("./assets/balloon.png")}
          style={{ width: 100, height: 100, resizeMode: "contain" }}
        />
      </Animated.View>
      <Animated.View style={{ position: "absolute", right: fiveA, bottom: 10 }}>
        <Animated.Image
          source={require("./assets/shiper.png")}
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
            transform: [{ scaleX: shipScale }],
          }}
        />
      </Animated.View>
      <Animated.View>
        <Animated.Text
          style={{ fontSize, color: colorAnimation, fontWeight: 700 }}
        >
          Shopee cái gì cũng có...
        </Animated.Text>
      </Animated.View>
      <Animated.View style={{ flexDirection: "row" }}>
        <Animated.Image
          source={require("./assets/noodle.png")}
          style={{ width: imgSize, height: imgSize, resizeMode: "contain" }}
        />
        <Animated.Image
          source={require("./assets/coca.png")}
          style={{ width: imgSize, height: imgSize, resizeMode: "cover" }}
        />
        <Animated.Image
          source={require("./assets/snack.png")}
          style={{ width: imgSize, height: imgSize, resizeMode: "contain" }}
        />
      </Animated.View>
      <Animated.View style={{ position: "absolute", top: fiveA, right: 10 }}>
        <Animated.Image
          source={require("./assets/tom.png")}
          style={{ width: 150, height: 150, resizeMode: "contain" }}
        />
      </Animated.View>
      <Animated.View style={{ position: "absolute", right: fiveA, top: 10 }}>
        <Animated.Image
          source={require("./assets/jerry.png")}
          style={{ width: 150, height: 150, resizeMode: "contain", transform: [{ scaleX: shipScale }], }}
        />
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
