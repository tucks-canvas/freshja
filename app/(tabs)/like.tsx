import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

// Import Supported Content
import { View, Image, StyleSheet, FlatList, TouchableOpacity, StatusBar, ScrollView, Animated, Text, TextInput, ImageBackground, useColorScheme } from 'react-native';

// Import Addition Content
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { LinearGradient } from 'expo-linear-gradient';

// Import View and Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
 
// Import icons, colors, and images
import { icons, images } from '../../constants';
import colors from '../../constants/colors';

const Like = () => {
  const router = useRouter();

  const [likedProducts, setLikedProducts] = useState([]);

  const removeLike = async (id) => {
    const updatedLikes = likedProducts.filter((item) => item.id !== id);
    setLikedProducts(updatedLikes);
    await AsyncStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
  };

  useFocusEffect(
    useCallback(() => {
      const loadLikedProducts = async () => {
        try {
          const storedLikes = await AsyncStorage.getItem('likedProducts');
          if (storedLikes) {
            const likedProducts = JSON.parse(storedLikes);
            setLikedProducts(likedProducts);
          }
        } catch (error) {
          console.error('Error retrieving liked products: ', error);
        }
      };
  
      loadLikedProducts();
    }, [])
  );

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headertext}>My Liked Products</Text>
            </View>

            <View style={styles.body}>
              {likedProducts.length > 0 ? (
                <View style={styles.likeview}>
                  {likedProducts.map((item) => (
                    <TouchableOpacity 
                      style={styles.product} 
                      key={item.id}
                      onPress={() => {
                        const selectedProduct = likedProducts.find(p => p.id === item.id);
                        console.log(selectedProduct);

                        router.push({ 
                          pathname: '/product', 
                          params: {
                            products: JSON.stringify(selectedProduct),
                          },
                        });
                      }}
                    >
                      <View style={styles.productimage}>
                        <Image
                          source={item.image}
                          style={styles.lrgimage}
                          resizeMode="cover"
                        />
                      </View>

                      <View style={styles.productdetail}>
                        <Text style={styles.productext}>{item.title}</Text>
                        <Text style={styles.productsml}>by {item.seller}</Text>
                      </View>

                      <View style={styles.productprice}>
                        <Text style={styles.productsub}>
                          <Text style={styles.productbig}>JMD </Text> 
                          {item.price}
                          <Text style={styles.productsml}> /kg</Text>
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.defaultview}>
                  <Text style={styles.productbig}>You have no liked products</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },

  scrollViewContent: {
    height: '100%',
    width: '100%',
    paddingBottom: 80,
    paddingTop: 20,
  },

  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },

  /* Header */

  header: {
    width: '90%',
    height: 'auto',
    paddingVertical: 20,
    marginBottom: 5,
  },

  headertext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: colors.black,
  },

  /* Body */

  body: {
    width: '90%',
  },

  /* Views */

  defaultview: {
    width: '100%',
  },

  likeview: {
    flexDirection: 'column',
    width: '100%',
    gap: 35,
  },

  /* Product */

  product: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },

  productdetail: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 7, 
  },

  productimage: {
    backgroundColor: colors.white,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems: 'center',
    overflow: 'hidden',
    height: 56,
    width: 58,
    borderRadius: 15,
    elevation: 10,
  },

  productext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.black,
  },

  productsub: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: colors.black,
  },

  productbig: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.3)',
    marginBottom: 10,
  },

  productsml: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  producthighlight: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: colors.white,
  },

  productprice: {
    alignSelf: 'flex-start',
    top: 3,
  },

  /* Images, and Icons */

  lrgimage: {
    height: '100%',
    width: '100%',
  },
});

export default Like;