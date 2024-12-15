import React, { useState, useEffect, useCallback, useRef } from 'react';
import { SplashScreen, useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';

// Import Supported Content
import { View, Image, StyleSheet, FlatList, TouchableOpacity, StatusBar, ScrollView, Animated, Text, TextInput, ImageBackground, useColorScheme } from 'react-native';

// Import Slidder
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// Import View and Storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';
 
// Import icons, colors, and images
import { icons, images } from '../../constants';
import colors from '../../constants/colors';

const ads = [
  {
    id: 1,
    title: 'Fruits',
    image: require("../../assets/images/ad3.jpeg"),
  },
  {
    id: 2,
    title: 'Vegetables',
    image: require("../../assets/images/ad4.jpeg"),
  },
  {
    id: 3,
    title: 'Fruits',
    image: require("../../assets/images/ad3.jpeg"),
  },
  {
    id: 4,
    title: 'Vegetables',
    image: require("../../assets/images/ad4.jpeg"),
  },
];

const categories = [
  {
    id: 1,
    title: 'Fruits',
    image: require("../../assets/images/apple.png"),
    description: 'Locally grown and imported fresh fruits like mangoes, bananas, and apples.',
  },
  {
    id: 2,
    title: 'Vegetables',
    image: require("../../assets/images/tomato.png"),
    description: 'Fresh vegetables including callaloo, cabbage, and sweet peppers.',
  },
  {
    id: 3,
    title: 'Roots & Tubers',
    image: require("../../assets/images/potato.png"),
    description: 'Staples like yam, cassava, sweet potatoes, and dasheen.',
  },
  {
    id: 4,
    title: 'Leafy Greens',
    image: require("../../assets/images/cabbage.png"),
    description: 'Nutritious greens such as callaloo, spinach, lettuce, and pak choi.',
  },
  {
    id: 5,
    title: 'Herbs & Spices',
    image: require("../../assets/images/ginger.png"),
    description: 'Flavorful seasonings like thyme, scallion, pimento, ginger, and turmeric.',
  },
  {
    id: 6,
    title: 'Provisions',
    image: require("../../assets/images/banana.png"),
    description: 'Essential items like green bananas, plantains, and breadfruit.',
  },
  {
    id: 7,
    title: 'Seasonal',
    image: require("../../assets/images/jackfruit.png"),
    description: 'Fruits and crops available by season like otaheite apples, guineps, and naseberries.',
  },
  {
    id: 8,
    title: 'Traditional',
    image: require("../../assets/images/plantain.png"),
    description: 'Jamaican favorites like ackee, plantains, and green bananas.',
  },
];

const products = [
  {
    id: 1,
    title: 'Fresh Carrots',
    category: 1,
    topic: 'Vegetables',
    price: 200,   
    discount: 400,  
    percentage: '50%',
    image: require("../../assets/images/freshcarrots.jpg"),     
  },
  {
    id: 2,
    title: 'Fresh Onions',
    category: 1,
    topic: 'Vegetables',
    price: 350,    
    discount: 400,  
    percentage: '5%',
    image: require("../../assets/images/freshpeppers.jpg"),    
  },
  {
    id: 3,
    title: 'Fresh Peppers',
    category: 1,
    topic: 'Vegetables',
    price: 250,
    discount: 400,  
    percentage: '25%',
    image: require("../../assets/images/freshonions.jpg"), 
  },
  {
    id: 4,
    title: 'Fresh Potatoes',
    category: 1,
    topic: 'Vegetables',
    price: 350,
    discount: 500,  
    percentage: '25%',
    image: require("../../assets/images/freshpotatoes.jpg"), 
  },
];

const Home = ({}) => {

  const router = useRouter();

  const [search, setSearch] = useState('');

  const [values, setValues] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [currentAdIndex, setcurrentAdIndex] = useState(0);

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    console.log('Selected Category:', category);
  };  

  const renderProduct = ({ item: product }) => (
    <View style={styles.listings}>
      <TouchableOpacity 
        key={product.id}
        style={styles.listing}
      >
        <View style={styles.productimage}>
          <Image
            source={product.image}
            style={styles.lrgimage}
            resizeMode='cover'
          />
        </View>

        <View style={styles.productbody}>
          <Text style={styles.productext}>{product.title}</Text>

          <Text style={styles.productsub}>
            <Text style={styles.productbig}>JMD </Text> 
              {product.price}
            <Text style={styles.productsml}> /kg</Text>
          </Text>

          <Text style={styles.productcross}>JMD {product.discount}</Text>        
        </View>
      </TouchableOpacity>

      <View style={styles.likeandadd}>
        <View style={styles.likeproduct}>
          <Image
            source={icons.like}
            style={styles.tinyicon}
            tintColor={colors.white}
          />
        </View>

        <View style={styles.addproduct}>
          <Image
            source={icons.bag}
            style={styles.minicon}
            tintColor='rgba(0, 0, 0, 0.4)'
          />
        </View>        
      </View>
    </View>
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 4000);

    return () => clearInterval(timer);
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
              <Image
                source={icons.location}
                style={styles.smallicon}
                tintColor={colors.black}
              />

              <View style={styles.delivery}>
                <Text style={styles.deliverytext}>Deliver To</Text>
                <Text style={styles.deliverysub}>4 Marvic Close, Red. . .</Text>
              </View>

              <Image
                source={icons.notification}
                style={styles.smallicon}
                tintColor={colors.black}
              />
            </View>

            <View style={styles.search}>
              <View style={styles.bar}>
                <Image
                  source={icons.search}
                  style={styles.tinyicon}
                  tintColor='rgba(0, 0, 0, 0.2)'
                />

                <TextInput
                  placeholder="Search for your items"
                  placeholderTextColor='rgba(0, 0, 0, 0.2)'
                  value={search}
                  onChangeText={setSearch}
                  style={styles.bartext}
                />
              </View>

              <TouchableOpacity 
                style={styles.filter}
                onPress={() => setToggleFilter(!toggleFilter)}
              >
                <Image
                  source={icons.filter}
                  style={styles.tinyicon}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.banner}>                                         
              <Image
                source={ads[currentAdIndex].image}
                style={styles.lrgimage}  
                resizeMode='cover'                 
              />
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

            <View style={styles.categories}>
              <View style={styles.topic}>
                <Text style={styles.topictext}>Category</Text>
              </View>

              <View style={styles.category}>
                <ScrollView 
                  horizontal
                  contentContainerStyle={styles.sort}
                  showsHorizontalScrollIndicator={false}
                >
                  {categories.map((category) => (
                    <TouchableOpacity 
                      key={category.id}
                      style={styles.item}
                    >
                      <View style={styles.categoryimage}>
                        <Image
                          source={category.image}
                          style={styles.smallimage}
                          resizeMode='cover'
                        />
                      </View>

                      <Text style={styles.categorytext}>{category.title}</Text>
                    </TouchableOpacity>
                  ))}      
                </ScrollView>
              </View>
            </View>

            <View style={styles.offers}>
              <View style={styles.topic}>
                <Text style={styles.topictext}>Special Offers</Text>

                <TouchableOpacity>
                  <Text style={styles.topicsub}>See More</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.products}>
                <FlatList
                  data={products}
                  keyExtractor={(item) => item.id}
                  scrollEnabled={false}
                  showsVerticalScrollIndicator={false}
                  numColumns={2}
                  renderItem={renderProduct}
                  columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 20 }}
                  style={styles.product}
                />
              </View>
            </View>
          </View>
        </ScrollView>

        {toggleFilter && (
          <>
            <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />

            <View style={styles.funnel}>
              <ScrollView 
                vertical
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scroll}
              >
                <View style={styles.funnelcontent}>
                  <View style={styles.funneltop}>
                    <Image
                      source={icons.filter}
                      style={styles.subicon}
                      tintColor={colors.black}
                    />

                    <Text style={styles.funneltext}>Filter</Text>

                    <TouchableOpacity 
                      style={styles.savefunnel}
                      onPress={() => setToggleFilter(!toggleFilter)}
                    >
                      <Image
                        source={icons.tick}
                        style={styles.subicon}
                        tintColor={colors.black}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.funnelbody}>
                    <View style={styles.funnelheader}>
                      <Text style={styles.funnelsub}>Category</Text>
                      <Text style={styles.funnelbig}>e.g: Fruits, Veggies, etc.</Text>
                    </View>

                    <View style={styles.funnelcategories}>
                      {categories.map((category) => (
                        <TouchableOpacity
                          key={category.id}
                          style={[styles.funnelcategory, selectedCategory === category.id && styles.selectedcategory]}
                          onPress={() => handleCategoryPress(category.id)}
                        >
                          <Text style={styles.funnelsml}>{category.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.funnelprice}>
                    <View style={styles.funnelheader}>
                      <Text style={styles.funnelsub}>Price Range</Text>
                      <Text style={styles.funnelbig}>${values[0]} - ${values[1]}</Text>
                    </View>

                    <MultiSlider
                      values={values}
                      onValuesChange={setValues}
                      min={0}
                      max={2000}
                      step={10}
                      sliderLength={350}
                      allowOverlap
                      snapped
                      markerStyle={{height: 10, width: 10, backgroundColor: colors.emerald }}
                      selectedStyle={{ backgroundColor: colors.emerald }}
                      unselectedStyle={{ backgroundColor: colors.grey }}
                    />
                  </View>
                </View>
              </ScrollView>
            </View>
          </>
        )}  
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.link,
    height: '100%',
  },

  scrollViewContent: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
    paddingTop: 20,
  },

  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },

  /* Header */

  header: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },

  delivery: {
    marginRight: 80,
  },

  deliverytext: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.5)',
  },

  deliverysub: {
    fontFamily: 'Poppins-Bold',
    fontSize: 17,
  },

  /* Search */

  search: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',   
    marginVertical: 20, 
  },

  bar: {
    flexDirection: 'row',
    width: '80%',
    backgroundColor: colors.white,
    alignItems: 'center',  
    gap: 10,  
    padding: 10,
    borderRadius: 15,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },

  bartext: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.5)',
  },

  filter: {
    backgroundColor: colors.white,
    padding: 15,
    borderRadius: 15,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },

  /* Banner */

  banner: {
    overflow: 'hidden',
    width: '90%',
    height: 200,
    borderRadius: 20,
    marginVertical: 10,
  },

  /* Category */

  categories: {
    width: '90%',
    marginVertical: 20,
  },

  category: {
  },

  sort: {
    gap: 20,
  },

  item: {
    flexDirection: 'column',
    gap: 20,
  },

  topic: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20, 
  },

  topictext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: colors.black,
  },

  topicsub: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  categorytext: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  categoryimage: {
    backgroundColor: colors.white,
    height: 80,
    width: 80,
    padding: 15,
    borderRadius: 15,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent:'center',
    alignItems: 'center',
  },

  /* Products and Offers */

  offers: {
    width: '90%',
    marginVertical: 20,
  },

  products: {
    width: '100%',
    justifyContent: 'space-between',
  },

  product: {
  },

  listings: {
  },

  listing: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    height: 250,
    width: 175,
    gap: 10,
    borderRadius: 15,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    overflow: 'hidden',
  },

  productimage: {
    height: 120,
    width: 'auto',
  },

  productbody: {
    flexDirection: 'column',
    padding: 10,
  },

  productext: {
    fontFamily: 'Poppins-Bold',
    fontSize: 15,
    color: colors.black,
  },

  productsub: {
    fontFamily: 'Poppins-Bold',
    fontSize: 13,
    color: colors.black,
  },

  productbig: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  productsml: {
    fontFamily: 'Poppins-Medium',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  productcross: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.3)',
    textDecorationLine: 'line-through',
  },

  /* Like and Add Product */

  likeandadd: {
    position: 'absolute',
  },

  likeproduct: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    alignItems: 'center', 
    left: 115,
    top: 5,
    width: 55,
    height: 55,
    padding: 10,
    borderRadius: 15,
    elevation: 10,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10,
  },

  addproduct: {
    left: 130,
    top: 150,
  },

  /* Funnel */

  funnel: {
    backgroundColor: colors.white,
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  funnelcontent: {
    width: '99%',
    padding: 30,
  },

  funneltop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
  },

  funnelheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },

  savefunnel: {
  },

  funnelbody: {
    width: '99%',
  },

  funnelcategories: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 5,
    marginVertical: 10,
    marginBottom: 30,
  },

  funnelcategory: {
    backgroundColor: colors.emerald,
    padding: 10,
    borderRadius: 15,
  },

  selectedcategory: {
    backgroundColor: colors.yellow,
  },

  funneltext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: colors.black,
    textTransform: 'uppercase',
    marginRight: 220,
  },

  funnelsub: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.4)',
  },

  funnelsml: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: colors.black,
  },

  funnelbig: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.4)',
  },

  funnelprice: {
    width: '100%',
  },

  /* Pagination */

  pagination: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginVertical: 10,
  },

  dot: {
    height: 7,
    width: 7,
    borderRadius: 4,
    margin: 5,
  },

  active: {
    backgroundColor: colors.green,
    width: 15,
  },

  inactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
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

  smallicon: {
    height: 35,
    width: 35,
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

export default Home;