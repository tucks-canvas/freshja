import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withSequence,
  withDelay,
  Easing,
  runOnJS
} from 'react-native-reanimated';

import { images } from '../../../constants';
import colors from '../../../constants/colors';

const Loading = () => {
  const router = useRouter();
  
  // Animation values
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.8);

  const textY = useSharedValue(30);
  const textOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0); // New control for "for you" text
  
  const dotScale = useSharedValue(0.1);
  const dotOpacity = useSharedValue(0);

  useEffect(() => {
    // Logo fade in with gentle scale
    logoOpacity.value = withTiming(1, { duration: 800 });
    logoScale.value = withTiming(1, { 
      duration: 1000, 
      easing: Easing.out(Easing.elastic(1)) 
    });

    // Text animation after logo appears
    setTimeout(() => {
      textY.value = withSequence(
        withTiming(-5, { duration: 200 }),
        withTiming(0, { duration: 300, easing: Easing.out(Easing.quad) })
      );
      textOpacity.value = withTiming(1, { duration: 500 });
      subtitleOpacity.value = withTiming(1, { duration: 500 }); // Show "for you"
      
      // Dot animation after text is fully visible
      setTimeout(() => {
        // First fade out "for you" text
        subtitleOpacity.value = withTiming(0, { duration: 200 }, () => {
          // Then start dot animation
          dotOpacity.value = withTiming(1, { duration: 200 });
          dotScale.value = withTiming(
            100,
            {
              duration: 800,
              easing: Easing.in(Easing.exp),
            },
            () => {
              runOnJS(router.replace)('/signin');
            }
          );
        });
      }, 1000);
    }, 500);
  }, []);

  // Animated styles
  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }]
  }));

  const textStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textY.value }]
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
  }));

  const dotStyle = useAnimatedStyle(() => ({
    opacity: dotOpacity.value,
    transform: [{ scale: dotScale.value }],
    top: '50%',
    marginTop: -5,
  }));

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <View style={styles.content}>
            <Animated.View style={[styles.logocontainer, logoStyle]}>
              <Image 
                source={images.logo} 
                style={styles.image}
                resizeMode='contain'
              />
            </Animated.View>
            
            <View style={styles.textcontainer}>
              <Animated.View style={[styles.texts, textStyle]}>
                <Text style={styles.title}>fresh</Text>
                <Text style={styles.altitle}>ja</Text>
                <Animated.View style={[styles.dot, dotStyle]} />
              </Animated.View>
              
              <Animated.View style={[styles.subtitlecontainer, subtitleStyle]}>
                <Text style={styles.subtitle}>for you</Text>
              </Animated.View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Content */
  
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* Text */
  
  textcontainer: {
    position: 'relative',
  },
  
  texts: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  /* Title */
  
  title: {
    fontSize: 50,
    color: colors.california,
    fontFamily: 'Lightbox21-ExtraBold',
  },
  
  subtitlecontainer: {
    position: 'absolute',
    bottom: -20,
    width: '100%',
  },
  
  subtitle: {
    fontSize: 10,
    color: colors.yellow,
    fontFamily: 'Poppins-Bold',
    textTransform: 'uppercase',
    letterSpacing: 7,
  },

  altitle: {
    fontSize: 50,
    color: colors.fresh,
    fontFamily: 'Lightbox21-ExtraBold',
  },

  /* Dot */

  dot: {
    position: 'absolute',
    right: -10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.fresh,
  },

  /* Logo */

  logocontainer: {
    marginRight: 20,
  },

  /* Image and Icons */

  image: {
    width: 130,
    height: 300,
    top: -20,
  },
});

export default Loading;