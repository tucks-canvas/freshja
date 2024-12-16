import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

// Import Supported Content
import { View, Image, StyleSheet, FlatList, Alert, TouchableOpacity, StatusBar, ScrollView, Animated, Text, TextInput, ImageBackground, useColorScheme } from 'react-native';

// Import Addition Content
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { LinearGradient } from 'expo-linear-gradient';

// Import View and Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
 
// Import icons, colors, and images
import { icons, images } from '../../../constants';
import colors from '../../../constants/colors';

const headers = [
  {
    id: 1,
    title: 'Description',
  },
  {
    id: 2,
    title: 'Nutrition Facts'
  },
  {
    id: 3,
    title: 'Reviews'
  },
];

const Product = ({}) => {

  const router = useRouter();
  const route = useLocalSearchParams();

  const { products: productDataStr } = route;
  const [productData, setProductData] = useState(() => JSON.parse(productDataStr));

  const translateX = useRef(new Animated.Value(0)).current;

  const headerWidth = 60;

  const [selectedHeader, setSelectedHeader] = useState(null);

  const [count, setCount] = useState(0);

  const increment = () => setCount(prevCount => prevCount + 1);
  const decrement = () => setCount(prevCount => Math.max(0, prevCount - 1));

  const [currentAdIndex, setcurrentAdIndex] = useState(0);

  const nutritionfacts = [
    { 
      id: 1, 
      icon: icons.vitamin, 
      value: productData.calories, 
      unit: "kcal", 
      label: "Calories" 
    },
    { 
      id: 2, 
      icon: icons.carbs, 
      value: productData.carbs,  
      unit: "g", 
      label: "Carbs" 
    },
    { 
      id: 3, 
      icon: icons.protein, 
      value: productData.protein, 
      unit: "g", 
      label: "Protein" 
    },
    { 
      id: 4, 
      icon: icons.fat, 
      value: productData.fat, 
      unit: "g", 
      label: "Fat" 
    },
    { 
      id: 5, 
      icon: icons.vitamin, 
      value: productData.fiber,  
      unit: "g", 
      label: "Fiber" 
    },
    { 
      id: 6, 
      icon: icons.vitamin, 
      value: productData.vitamin, 
      unit: "μg (93% DV)", 
      label: "Vitamin A" 
    },
    { 
      id: 7, 
      icon: icons.potassium, 
      value: productData.potassium,  
      unit: "mg", 
      label: "Potassium" 
    },
  ];

  const ads = [
    {
      id: 1,
      image: productData.image,
    },
    {
      id: 2,
      image: productData.image1,
    },
    {
      id: 3,
      image: productData.image2,
    },
  ];

  const handleHeaderPress = (header_id, index) => {
    setSelectedHeader(header_id);
    console.log('Selected Header:', header_id);

    Animated.timing(translateX, {
      toValue: index * headerWidth * (2.09 + index * (0.158 * (index - 0.89) ** (index - 1))),
      duration: 300,
      useNativeDriver: true,
    }).start();
  };  

  const generateStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image
          key={`full-${i}`}
          source={icons.starfill}
          style={styles.supicon}
          tintColor={colors.emerald}
        />
      );
    }
  
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Image
          key={`empty-${i}`}
          source={icons.star}
          style={styles.supicon}
          tintColor='rgba(0, 0, 0, 0.3)'
        />
      );
    }
  
    return stars;
  };  

  const addToCart = async () => {
    try {
      const cartitem = {
        id: productData.id,
        title: productData.title,
        image: productData.image,
        price: productData.price,
        quantity: count,
      };

      const exitstingcart = await AsyncStorage.getItem('cart');
      let cart = exitstingcart ? JSON.parse(exitstingcart) : [];

      const itemindex = cart.findIndex((item) => item.id === productData.id);

      if (itemindex !== -1) {
        cart[itemindex].quantity += count;
      } else {
        cart.push(cartitem);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));

      /*
        Alert.alert('Success', 'Item added to cart!'); 
      */
      router.push('/cart');
    } 
    catch (error) 
    {
      console.error('Error saving cart data:', error);
      /*
        Alert.alert('Error', 'Could not add item to cart.');
      */
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []); 
  
  useEffect(() => {
    console.log('I made it to product!', productData);
  }, []);  
  
  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content"  />

      <View style={styles.productimage}>
        <Image
            source={ads[currentAdIndex].image}
            style={styles.lrgimage}
            resizeMode='cover'
        />

        <LinearGradient
            colors={['rgba(0, 0, 0, 0.3)', 'transparent']} 
            style={styles.overlay}
        />
      </View>

      <View style={styles.productads}>
        <View style={styles.productad}>
          <Image
              source={ads[(currentAdIndex + 1) % ads.length].image} 
              style={styles.lrgimage}
              resizeMode='cover'
          />
        </View>

        <View style={styles.productad}>
          <Image
              source={ads[(currentAdIndex + 2) % ads.length].image} 
              style={styles.lrgimage}
              resizeMode='cover'
          />
        </View>
      </View>

      <View style={styles.pagination}>
        {ads.map((_, index) => (
            <View
                key={index}
                style={[
                    styles.dot,
                    currentAdIndex === index ? styles.active : styles.inactive,
                ]}
            />
        ))}
      </View>

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.verticalViewContent}
        >
          <View style={styles.container}>
            <View style={styles.productbody}>
              <View style={styles.productheader}>
                <View style={styles.productcatdetails}>
                  <View style={styles.productcategories}>
                    <View style={styles.productcategory}>
                      <Text style={styles.producthighlight}>{productData.topic}</Text>
                    </View>
                  </View>

                  <Text style={styles.productext}>{productData.title}</Text>

                  <Text style={styles.productsub}>
                    <Text style={styles.productbig}>JMD </Text> 
                    {productData.price}
                    <Text style={styles.productsml}> /kg  </Text>
                    <Text style={styles.productcross}> JMD {productData.discount}</Text>
                  </Text>
                </View>

                <TouchableOpacity 
                  style={styles.productcatimage}
                  onPress={() => router.back()}
                >
                  <Image
                    source={icons.close}
                    style={styles.supicon}
                    tintColor='rgba(0, 0, 0, 0)'
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.productdetails}>
                <View style={styles.productheaders}>
                  {headers.map((header, index) => (
                    <TouchableOpacity 
                      key={header.id} 
                      onPress={() => handleHeaderPress(header.id, index)} 
                      style={styles.productdetail}
                    >
                      <Text style={[styles.detail, selectedHeader === header.id && styles.selectedheader]}>{header.title}</Text>
                    </TouchableOpacity>
                  ))} 

                  <Animated.View
                    style={[
                      styles.underline,
                      {
                        transform: [{ translateX }],
                        width: headerWidth,
                      },
                    ]}
                  />
                </View> 

                {selectedHeader === 1 && (
                  <View style={styles.productdescription}>
                    <Text style={styles.description}>
                      <Text style={styles.descriptiontext}>{productData.name} </Text> 
                      {productData.description}
                    </Text>

                    <View style={styles.seller}>
                      <Text style={styles.productbig}>About Seller</Text>

                      <Text style={styles.description}>
                        <Text style={styles.descriptiontext}>{productData.seller} </Text>
                        {productData.about}
                      </Text>

                    </View>
                    
                    <View style={styles.relatedproducts}>
                      <Text style={styles.productbig}>Related Products</Text>

                      <View style={styles.relatedbody}>
                        <ScrollView
                          horizontal
                          showsHorizontalScrollIndicator={false}
                          contentContainerStyle={styles.horizontalViewContent}
                        >
                          <View style={styles.relatedcontents}>
                            {/* 

                              {productData.map((product) => (
                                <TouchableOpacity
                                  key={product.id}
                                  style={styles.relatedproduct}
                                >
                                  <View style={styles.relatedimage}>
                                    <Image 
                                      source={product.image}
                                      style={styles.lrgimage}
                                      resizeMode='cover'
                                    />
                                  </View>

                                  <View style={styles.relatedcontent}>
                                    
                                    <Text style={styles.relatedtext}>{product.title}</Text>

                                    <Text style={styles.relatedsub}>
                                      <Text style={styles.relatedbig}>JMD </Text> 
                                      {product.price}
                                      <Text style={styles.relatedsml}> /kg  </Text>
                                    </Text>
                                  </View>
                                </TouchableOpacity>      
                              ))}  
                            
                            */}
                          </View>                   
                        </ScrollView>
                      </View>
                    </View>
                  </View>
                )}  

                {selectedHeader === 2 && (
                  <View style={styles.productfacts}>
                    <Text style={styles.description}>
                      <Text style={styles.descriptiontext}>{productData.name} </Text> 
                      {productData.nutrition}
                    </Text>

                    <View style={styles.nutrition}>
                      <Text style={styles.productbig}>Nutritional Beneifit</Text>

                      <Text style={styles.description}>
                        Here are the <Text style={styles.descriptiontext}>nutritional facts</Text> per 100g of <Text style={styles.descriptionsub}>raw {productData.name}</Text>
                      </Text>
                    </View>

                    <View style={styles.facts}>
                      <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.horizontalViewContent}
                      >
                        {nutritionfacts.map((fact) => (
                          <View key={fact.id} style={styles.fact}>
                            <Image
                              source={fact.icon}
                              style={styles.bigicon}
                              tintColor={colors.black}
                            />

                            <View style={styles.factbody}>
                              <Text style={styles.factsub}>
                                {fact.value} <Text style={styles.factsml}>{fact.unit}</Text>
                              </Text>
                              <Text style={styles.factext}>{fact.label}</Text>
                            </View>
                          </View>
                        ))}
                      </ScrollView>
                    </View>

                    <View style={styles.nutrition}>
                      <Text style={styles.description}>
                        <Text style={styles.descriptiontext}>{productData.name} </Text>{productData.fact}
                      </Text>
                    </View>
                  </View>
                )}   

                {selectedHeader === 3 && (
                  <View style={styles.productreviews}>
                    <View style={styles.rating}>
                      <Text style={styles.ratingtext}>4.7</Text>

                      <View style={styles.ratingbody}>
                        <View style={styles.ratingstars}>
                          {generateStars(4.7)}
                        </View>

                        <Text style={styles.ratingsub}>Based on 3 reviews</Text>
                      </View>
                    </View>

                    <View style={styles.ratings}>
                      <View style={styles.ratingstar}>
                        <View style={styles.star}>
                          <Text style={styles.ratingmid}>5</Text>

                          <View style={styles.ratingimage}>
                            <Image
                              source={icons.starfill}
                              style={styles.alticon}
                              tintColor={colors.emerald}
                            />
                          </View>
                        </View>

                        <View style={styles.bar}>
                          <View
                            style={[
                              styles.starbar,
                              { width: '50%' }, 
                            ]}
                          />                          
                        </View>
                      </View>

                      <View style={styles.ratingstar}>
                        <View style={styles.star}>
                          <Text style={styles.ratingmid}>4</Text>

                          <View style={styles.ratingimage}>
                            <Image
                              source={icons.starfill}
                              style={styles.alticon}
                              tintColor={colors.emerald}
                            />
                          </View>
                        </View>

                        <View style={styles.bar}>
                          <View
                            style={[
                              styles.starbar,
                              { width: '30%' }, 
                            ]}
                          />                          
                        </View>
                      </View>

                      <View style={styles.ratingstar}>
                        <View style={styles.star}>
                          <Text style={styles.ratingmid}>3</Text>

                          <View style={styles.ratingimage}>
                            <Image
                              source={icons.starfill}
                              style={styles.alticon}
                              tintColor={colors.emerald}
                            />
                          </View>
                        </View>

                        <View style={styles.bar}>
                          <View
                            style={[
                              styles.starbar,
                              { width: '20%' }, 
                            ]}
                          />                          
                        </View>
                      </View>

                      <View style={styles.ratingstar}>
                        <View style={styles.star}>
                          <Text style={styles.ratingmid}>2</Text>

                          <View style={styles.ratingimage}>
                            <Image
                              source={icons.starfill}
                              style={styles.alticon}
                              tintColor={colors.emerald}
                            />
                          </View>
                        </View>

                        <View style={styles.bar}>
                          <View
                            style={[
                              styles.starbar,
                              { width: '0%' }, 
                            ]}
                          />                          
                        </View>
                      </View>

                      <View style={styles.ratingstar}>
                        <View style={styles.star}>
                          <Text style={styles.ratingmid}> 1</Text>

                          <View style={styles.ratingimage}>
                            <Image
                              source={icons.starfill}
                              style={styles.alticon}
                              tintColor={colors.emerald}
                            />
                          </View>
                        </View>

                        <View style={styles.bar}>
                          <View
                            style={[
                              styles.starbar,
                              { width: '0%' }, 
                            ]}
                          />                          
                        </View>
                      </View>
                    </View>

                    <View style={styles.reviews}>
                      <View style={styles.review}>
                        <Text style={styles.reviewtext}>Reviews</Text>

                        <TouchableOpacity>
                          <Text style={styles.reviewalt}>Add Review</Text>
                        </TouchableOpacity>
                      </View>
                      
                      <View style={styles.reviewbody}>
                        <View style={styles.reviewheader}>
                          <Text style={styles.reviewmid}>Kim, Sanders</Text>
                          <Text style={styles.reviewsub}>June 11th</Text>
                        </View>

                        <View style={styles.reviewstars}>
                          <Text style={styles.reviewbig}>Great!</Text>

                          <View style={styles.reviewstar}>
                            {generateStars(4.7)}
                          </View>
                        </View>

                        <Text style={styles.reviewsml}>This product was amazing, stay fresh for longer, and was supple when used.</Text>
                      </View>
                    </View>
                  </View>
                )}                 
              </View>
            </View>
          </View>
        </ScrollView>

        <View style={styles.productocart}>
          <View style={styles.count}>
            <TouchableOpacity onPress={decrement}>
              <Image
                  source={icons.minus}
                  style={styles.icon}
                  tintColor={colors.emerald}
              />
            </TouchableOpacity>

            <View style={styles.number}>
                <Text style={styles.numbertext}>{count}</Text>
            </View>

            <TouchableOpacity onPress={increment}>
              <Image
                  source={icons.add}
                  style={styles.icon}
                  tintColor={colors.emerald}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.book}
            onPress={addToCart}
          >
            <Text style={styles.booktext}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.link,
    height: '100%',
    width: '100%',
    marginTop: 250,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },

  verticalViewContent: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 50,
  },

  horizontalViewContent: {
  },

  container: {
    flex: 1,
    alignItems: 'center',
  },

  /* Image */

  productimage: {
    position: 'absolute',
    overflow: 'visible',
    height: '50%',
    width: '100%',
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  productads: {
    position: 'absolute',
    flexDirection: 'column',
    justifyContent:'center',
    alignItems: 'flex-end',
    top: 90,
    right: 25,
    width: '100%',
    gap: 20,
    zIndex: 10,
  },

  productad: {
    backgroundColor: colors.white,
    height: 80,
    width: 80,
    elevation: 10,
    borderRadius: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  /* Details */

  productbody: {
    width: '90%',
    height: '100%',    
  },

  productheader: {
    flexDirection: 'row',
    width: '90%',
    gap: 5,
    justifyContent: 'space-between',
  },

  productcatdetails: {
    flexDirection: 'column',
    width: '100%',
    gap: 5,
  },

  productcategories: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },

  productcategory: {
    backgroundColor: colors.emerald,
    paddingHorizontal: 10,
    paddingVertical: 5, 
    borderRadius: 5,
    alignSelf: 'flex-start',
  },  

  productext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    color: colors.black,
  },

  productsub: {
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    color: colors.black,
  },

  productbig: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
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

  productcross: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.3)',
    textDecorationLine: 'line-through',
  },

  /* Headers */

  productdetails: {
    flexDirection: 'column',
  },

  productcatimage: {
    right: 7,
    top: 5,
  },

  productheaders: {
    flexDirection: 'row',
    gap: 47,
    marginBottom: 20,
  },

  productdetail: {
    marginTop: 20, 
    marginBottom: 15,
  },

  detail: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.2)',
  },

  selectedheader: {
    color: colors.black,
  },

  underline: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: 3,
    backgroundColor: colors.emerald,
    borderRadius: 0,
  },

  /* Description */
  
  productdescription: {
    width: '100%',
    height: '100%',
  },

  description: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    lineHeight: 21,
    marginBottom: 15,
  },

  descriptiontext: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.emerald,
    lineHeight: 21,
    marginBottom: 10,
  },

  descriptionsub: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: colors.emerald,
    lineHeight: 21,
    marginBottom: 10,
    textTransform: 'lowercase',
  },

  seller: {
    flexDirection: 'column',
    marginTop: 21,
  },

  relatedproducts: {
    flexDirection: 'column',
    marginVertical: 15,
  },

  relatedbody: {
    gap: 10,    
  },

  relatedcontents: {
    flexDirection: 'row',
    gap: 20,
  },

  relatedproduct: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 100,
    width: 275,
    gap: 10,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  },

  relatedimage: {
    height: 'auto',
    width: 120,
  },

  relatedcontent: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
  },

  relatedtext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: colors.black,
  },

  relatedsub: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: colors.emerald,
    marginBottom: 10,
  },

  relatedbig: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: colors.emerald,
  },

  relatedsml: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  /* Facts */

  productfacts: {
    width: '100%',
  },

  nutrition: {
    marginTop: 20,
  },

  facts: {
    flexDirection: 'row',
    marginVertical: 10,
  },

  fact: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginRight: 25,
  },

  factbody: {
    flexDirection: 'column',
    justifyContent: 'center',
  },

  factext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
    textTransform: 'uppercase',
    letterSpacing: 5,
    bottom: 5,
  },

  factsub: {
    fontFamily: 'Poppins-Bold',
    fontSize: 50,
    color: colors.black,
  },

  factsml: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  /* Reviews */

  productreviews: {
    width: '90%',
  },

  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    bottom: 12,
  },

  ratingtext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 70,
    color: colors.emerald,
  },

  ratingsub: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.5)',
  },

  ratingmid: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.1)',
  },

  ratingbody: {
    flexDirection: 'column',
    justifyContent:'space-between',
  }, 

  ratings: {
    width: '90%',
    bottom: 10,
    marginBottom: 10,
  },

  ratingstars: {
    flexDirection: 'row',
    gap: 5,
    bottom: 12,
  }, 

  ratingstar: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    gap: 20,
  },

  ratingimage: {
    bottom: 2,
  },

  star: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  bar: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
    height: 4,
    borderRadius: 5,
    overflow: 'hidden',
  },

  starbar: {
    height: 4,
    backgroundColor: colors.yellow,
    borderRadius: 5,
  },

  reviews: {
    flexDirection: 'column',
    width: '105%',
    marginVertical: 10,
  },  

  review: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 5,
    marginVertical: 5,
  },

  reviewheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },

  reviewbody: {
    flexDirection: 'column',
    gap: 7,
  },

  reviewtext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    color: colors.black,
  },

  reviewsub: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.1)',
  },

  reviewsml: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.1)',
    lineHeight: 22,
  },

  reviewmid: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.1)',
  },

  reviewbig: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: colors.emerald,
  },

  reviewalt: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.1)',
  },

  reviewstars: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
  }, 

  reviewstar: {
    flexDirection: 'row',
    gap: 5,
  }, 

  /* Count */

  productocart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    height: '10%',
    padding: 20,
    gap: 35,
    marginBottom: 20,
    marginTop: 20,
  },

  count: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 15,
  },

  number: {
    backgroundColor: colors.emerald,
    height: 60,
    width: 60,
    padding: 15,
    borderRadius: 15,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems: 'center',
  },

  numbertext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
    color: colors.white,
  },

  /* Button */

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
    height: 15,
    width: 15,
  },

  supicon: {
    height: 20,
    width: 20,
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
    height: 30,
    width: 30,
  },

});

export default Product;