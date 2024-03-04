import React, { useRef } from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Pressable,
  Image,
} from "react-native";

const App = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const decayAnim = useRef(new Animated.Value(0)).current;
  const springAnim = useRef(new Animated.Value(0)).current;

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  const decayAnimation = () => {
    Animated.decay(decayAnim, {
      velocity: 1, // Set the initial velocity for decay
      deceleration: 0.997,
      useNativeDriver: true,
    }).start();
  };

  const springAnimation = () => {
    Animated.spring(springAnim, {
      toValue: 1,
      friction: 2,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const resetAll = () => {
    // Create a parallel animation to reset all values
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500, // Adjust duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(decayAnim, {
        toValue: 0,
        duration: 1000, // Adjust duration as needed
        useNativeDriver: true,
      }),
      Animated.timing(springAnim, {
        toValue: 0,
        duration: 1500, // Adjust duration as needed
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View
        style={[
          styles.fadingContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <Text style={styles.fadingText}>Fading View!</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.decayContainer,
          {
            transform: [{ translateX: decayAnim }],
          },
        ]}
      >
        <Text style={styles.decayText}>Decay View!</Text>
      </Animated.View>
      <Animated.View
        style={[
          styles.springContainer,
          {
            transform: [{ scale: springAnim }],
          },
        ]}
      >
        <Image style={styles.image} source={{ uri: 'https://imgur.com/0jxpToa.png' }} />
      </Animated.View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.pressable} onPress={fadeIn}>
          <Text style={styles.buttonText}>Fade In View</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={fadeOut}>
          <Text style={styles.buttonText}>Fade Out View</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={decayAnimation}>
          <Text style={styles.buttonText}>Decay Animation</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={springAnimation}>
          <Text style={styles.buttonText}>Spring Animation</Text>
        </Pressable>
        <Pressable style={styles.pressable} onPress={resetAll}>
          <Text style={styles.buttonText}>Reset All</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  fadingContainer: {
    padding: 20,
    backgroundColor: "powderblue",
    marginBottom: 20,
  },
  fadingText: {
    fontSize: 28,
  },
  springContainer: {
    padding: 20,
    backgroundColor: "lightgreen",
    marginBottom: 20,
  },
  springText: {
    fontSize: 28,
  },
  decayContainer: {
    padding: 20,
    backgroundColor: "coral",
    marginBottom: 20,
  },
  decayText: {
    fontSize: 28,
  },
  buttonRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  pressable: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
});

export default App;
