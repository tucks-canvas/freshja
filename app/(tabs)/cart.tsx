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

const Cart = ({}) => {

  const [cart, setCart] = useState([]);

  const updateQuantity = async (id, change) => {
    const updatedCart = cart.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  const removeItem = async (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    await AsyncStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  useEffect(() => {
    const loadCart = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    };

    loadCart();
  }, []);
  
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"  />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollViewContent}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headertext}>My Cart</Text>
            </View>

            <View style={styles.body}>
              {cart.length > 0 ? (
                <View style={styles.cartview}>
                  {cart.map((item) => (
                    <View 
                      style={styles.product}
                      key={item.id}                
                    >
                        <View style={styles.productimage}>
                          <Image
                            source={item.image} 
                            style={styles.lrgimage}
                            resizeMode='cover'               
                          />
                        </View>

                        <View style={styles.productdetail}>
                          <Text style={styles.productext}>{item.title}</Text>

                          <Text style={styles.productsub}>
                            <Text style={styles.productbig}>JMD </Text> 
                            {item.price}
                            <Text style={styles.productsml}> /kg</Text>
                          </Text>
                        </View>

                        <View style={styles.productcounts}>
                          <TouchableOpacity 
                            onPress={() => removeItem(item.id)}
                            style={styles.countimage}
                          >
                            <Image
                              source={icons.close}
                              style={styles.alticon}
                              tintColor='rgba(0, 0, 0, 0.1)'                            
                            />
                          </TouchableOpacity>

                          <View style={styles.productcount}>
                            <TouchableOpacity  onPress={() => updateQuantity(item.id, -1)}>
                              <Image
                                  source={icons.slash}
                                  style={styles.minicon}
                                  tintColor='rgba(0, 0, 0, 0.2)'
                              />
                            </TouchableOpacity>

                            <Text style={styles.numbertext}>{item.quantity} pcs</Text>

                            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)}>
                              <Image
                                  source={icons.cross}
                                  style={styles.minicon}
                                  tintColor='rgba(0, 0, 0, 0.2)'
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                    </View>
                  ))}

                </View>
              ) : (
                <View style={styles.defaultview}>
                  <Text style={styles.productbig}>Your cart is empty!</Text>
                </View>
              )}
            </View>
          </View>
        </ScrollView>

        <View style={styles.productocart}>
          <View style={styles.cartcontents}>
            <Text style={styles.cartext}>Total 
              <Text style={styles.carthighlight}></Text>
            </Text>
            <Text style={styles.cartsub}>JMD {cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}</Text>
          </View>

          <TouchableOpacity 
            style={styles.book}
            onPress={() => router.push('/checkout')}
          >
            <Text style={styles.booktext}>Checkout</Text>
          </TouchableOpacity>
        </View>
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

  cartview: {
    flexDirection: 'column',
    width: '100%',
    gap: 25,
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

  productcount: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
    gap: 10,
    borderRadius: 12,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    borderWidth: 1,
  },

  productcounts: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    gap: 15,   
  },

  countimage: {

  },

  number: {
  },

  numbertext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 12,
    color: colors.black,
  },

  /* Button */

  productocart: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginBottom: 110,
  },

  cartcontents: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  cartext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.black,
  },

  cartsub: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.08)',
  },

  carthighlight: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: colors.emerald,
  },

  book: {
    backgroundColor: colors.emerald,
    height: 60,
    width: 170,
    padding: 15,
    borderRadius: 15,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems: 'center',
  },

  booktext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.white,
  },

  /* Pagination */

  pagination: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    top: 200,
    width: '100%',
    marginVertical: 10,
  },

  dot: {
    height: 7,
    width: 7,
    borderRadius: 4,
    margin: 5,
  },

  active: {
    backgroundColor: colors.emerald,
    width: 15,
  },

  inactive: {
    backgroundColor: colors.white,
  },

  /* Images, and Icons */

  smallimage: {
    height: 80,
    width: 80,
  },

  lrgimage: {
    height: '100%',
    width: '100%',
  },

  bigicon: {
    width: 100,
    height: 100,
  },

  icon: {
    height: 40,
    width: 40,
  },

  smallicon: {
    height: 35,
    width: 35,
  },

  alticon: {
    height: 10,
    width: 10,
  },

  supicon: {
    height: 25,
    width: 25,
  },

  tinyicon: {
    height: 25,
    width: 25,
    margin: 5,
  },

  subicon: {
    height: 25,
    width: 25,
  },

  minicon: {
    height: 25,
    width: 20,
  },

});

export default Cart;