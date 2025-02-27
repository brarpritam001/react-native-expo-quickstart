import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Image } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { router } from 'expo-router';

const { width, height } = Dimensions.get('window');

const IntroScreen = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(50)).current;
    const imageAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.stagger(400, [
            Animated.parallel([
                Animated.timing(imageAnim, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.spring(slideAnim, {
                    toValue: 0,
                    tension: 50,
                    friction: 7,
                    useNativeDriver: true,
                })
            ]),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            })
        ]).start();
    }, []);

    const handleGetStarted = () => {
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0.7,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true,
            })
        ]).start(() => {
            router.push('/(auth)/login');
        });
    };

    return (
        <View style={styles.container}>
            <View style={styles.whiteBackground}>
                <View style={styles.content}>
                    {/* Logo/Image Container */}
                    <Animated.View style={[
                        styles.imageContainer,
                        {
                            opacity: imageAnim,
                            transform: [
                                {
                                    scale: imageAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0.8, 1]
                                    })
                                }
                            ]
                        }
                    ]}>
                        <Image
                            source={require('../assets/images/icon.png')} //replace you app logo 
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </Animated.View>

                    {/* Text Content */}
                    <Animated.View style={[
                        styles.textContainer,
                        {
                            opacity: fadeAnim,
                            transform: [{ translateY: slideAnim }]
                        }
                    ]}>
                        <Text style={styles.title}>Welcome to Your AppName</Text>
                        <Text style={styles.subtitle}>
                            Discover amazing features and experiences waiting for you
                        </Text>
                    </Animated.View>

                    {/* Button Container */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            onPress={handleGetStarted}
                            style={styles.button}
                            activeOpacity={0.8}
                        >
                            <View style={styles.buttonGradient}>
                                <Text style={styles.buttonText}>Get Started</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    whiteBackground: {
        flex: 1,
        backgroundColor: '#ffffff',  // Set background to white
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 24,
        paddingTop: 60,
    },
    imageContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    logo: {
        width: width * 0.6,
        height: width * 0.6,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: '#000000',  // Set title color to black for white background
        textAlign: 'center',
        marginBottom: 16,
        letterSpacing: 0.5,
    },
    subtitle: {
        fontSize: 18,
        color: '#333333',  // Set subtitle color to dark gray for better contrast
        textAlign: 'center',
        lineHeight: 24,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        paddingBottom: 40,
    },
    button: {
        width: '100%',
        height: 56,
        borderRadius: 28,
        overflow: 'hidden',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonGradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#007AFF',
        borderRadius: 28,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        letterSpacing: 0.5,
    },
});

export default IntroScreen;
