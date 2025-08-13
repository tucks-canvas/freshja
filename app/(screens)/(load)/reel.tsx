import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, StatusBar, SafeAreaView, Animated } from 'react-native';
import { images } from '../../../constants';
import colors from '../../../constants/colors';

const carouselData = [
  { 
    id: 1, 
    image: images.background5,
    title: "Fast delivery of quality produce",
    subtitle: "Order food within 3 days and get a discount"
  },
  { 
    id: 2, 
    image: images.background4,
    title: "Fresh from farm to table",
    subtitle: "Locally sourced ingredients for your meals"
  },
  { 
    id: 3, 
    image: images.background3,
    title: "Healthy meals made easy",
    subtitle: "Nutritious options for every lifestyle"
  },
];

const Reel = () => {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((prev) => (prev + 1) % carouselData.length);
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const currentItem = carouselData[currentIndex];

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.imageContainer}>
          <Animated.Image
            source={currentItem.image}
            style={[
              styles.absoluteFill,
              { opacity: fadeAnim }
            ]}
          />
          <View style={styles.imageOverlay} />
        </View>

        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headertext}>{currentItem.title}</Text>
            <Text style={styles.headersub}>{currentItem.subtitle}</Text>
          </View>

          <View style={styles.pagination}>
            {carouselData.map((_, index) => (
              <View 
                key={index}
                style={[
                  styles.dot,
                  index === currentIndex ? styles.active : styles.inactive
                ]}
              />
            ))}
          </View>

          <TouchableOpacity 
            style={styles.button}
            onPress={() => router.replace('../../(tabs)/home')}
          >
            <Text style={styles.buttontext}>Get started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(2, 2, 2, 0.74)',
  },
  
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    paddingBottom: 50,
    position: 'absolute',
    zIndex: 2,
  },

  /* Images */

  imageContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },

  absoluteFill: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },

  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(16, 15, 15, 0.7)',
  },

  /* Header */
  
  header: {
    width: '90%',
    flexDirection: 'column',
    gap: 20,
    marginBottom: 30,
  },

  headertext: {
    fontSize: 35,
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
    lineHeight: 45,
  },

  headersub: {
    fontSize: 15,
    color: colors.dullGrey,
    fontFamily: 'Gilroy-Regular',
  },

  /* Button */

  button: {
    width: '90%',
    backgroundColor: colors.complementary,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
  },

  buttontext: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    color: colors.white,
  },

  /* Pagination */

  pagination: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,  
  },
  
  dot: {
    width: 5,
    height: 5,
    borderRadius: 4,
    marginHorizontal: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
  
  active: {
    width: 30,
    backgroundColor: colors.white,
  },

  inactive: {
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
});

export default Reel;