import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Dimensions, StyleSheet } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width, height } = Dimensions.get("window");

const App = () => {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const progressAnim = useRef(new Animated.Value(0)).current;  // For loading progress

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000, // Loading progress over 2 seconds
        useNativeDriver: false,  // Since we're not directly animating the width
      }),
    ]).start();

    // Navigate after delay
    setTimeout(async () => {
      await SplashScreen.hideAsync();
      router.push("/introScreen");
    }, 2500);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#FFFFFF", "#F0F0F0", "#E0E0E0"]}  // Soft white to light gray gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Logo Container */}
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              {/* Replace with your app logo */}
              <Text style={styles.logoText}>YourLogo</Text>
            </View>
          </View>

          {/* App Name */}
          <Text style={styles.appName}>Your App Name</Text>

          {/* Tagline */}
          <Text style={styles.tagline}>Your Brand Tagline Here</Text>

          {/* Loading Indicator */}
          <View style={styles.loadingBar}>
            <Animated.View
              style={[
                styles.loadingProgress,
                {
                  transform: [
                    {
                      scaleX: progressAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 1], // Animate from 0 to 1
                      }),
                    },
                  ],
                },
              ]}
            />
          </View>
        </Animated.View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentContainer: {
    width: width * 0.8,
    alignItems: "center",
  },
  logoContainer: {
    marginBottom: 30,
  },
  logo: {
    width: 120,
    height: 120,
    backgroundColor: "white",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4158D0",  // Dark contrast for logo text
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",  // Darker text color for better contrast
    marginBottom: 10,
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: "rgba(0, 0, 0, 0.6)",  // Light grayish color for the tagline
    marginBottom: 40,
    textAlign: "center",
  },
  loadingBar: {
    width: "100%",
    height: 4,
    backgroundColor: "rgba(0, 0, 0, 0.2)",  // Slightly darker for contrast
    borderRadius: 2,
    overflow: "hidden",
  },
  loadingProgress: {
    height: "100%",
    backgroundColor: "#00BCD4",  // Color for the loading progress
  },
});

export default App;
