import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

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
    image: images.ad3,
  },
  {
    id: 2,
    title: 'Vegetables',
    image: images.ad4,
  },
  {
    id: 3,
    title: 'Fruits',
    image: images.ad3,
  },
  {
    id: 4,
    title: 'Vegetables',
    image: images.ad4,
  },
];

const categories = [
  {
    id: 1,
    title: 'Fruits',
    image: images.apple,
    description: 'Locally grown and imported fresh fruits like mangoes, bananas, and apples.',
  },
  {
    id: 2,
    title: 'Vegetables',
    image: images.tomato,
    description: 'Fresh vegetables including callaloo, cabbage, and sweet peppers.',
  },
  {
    id: 3,
    title: 'Roots & Tubers',
    image: images.potato,
    description: 'Staples like yam, cassava, sweet potatoes, and dasheen.',
  },
  {
    id: 4,
    title: 'Leafy Greens',
    image: images.cabbage,
    description: 'Nutritious greens such as callaloo, spinach, lettuce, and pak choi.',
  },
  {
    id: 5,
    title: 'Herbs & Spices',
    image: images.ginger,
    description: 'Flavorful seasonings like thyme, scallion, pimento, ginger, and turmeric.',
  },
  {
    id: 6,
    title: 'Provisions',
    image: images.banana,
    description: 'Essential items like green bananas, plantains, and breadfruit.',
  },
  {
    id: 7,
    title: 'Seasonal',
    image: images.jackfruit,
    description: 'Fruits and crops available by season like otaheite apples, guineps, and naseberries.',
  },
  {
    id: 8,
    title: 'Traditional',
    image: images.plantain,
    description: 'Jamaican favorites like ackee, plantains, and green bananas.',
  },
];

const products = [ 
  {
    id: 1,
    title: 'Fresh Carrots',
    name: 'Carrots',
    seller: 'R & B Farms Ltd',
    description: 'are a highly nutritious vegetable, known for their rich orange color, which comes from beta-carotene, a type of antioxidant.' 
    + '\n\n' + 
    'They are not only low in calories but also packed with essential vitamins and minerals, making them an excellent addition to any healthy diet.',
    about: 'is a family-owned and operated farm that has been serving the community with fresh, locally-grown produce for generations.' 
    + '\n\n' + 
    'Nestled in the heart of St. Elizabeth, R & B Farms Ltd specializes in cultivating a wide variety of vegetables, with a focus on high-quality, nutrient-rich carrots. Using sustainable farming practices, the farm prioritizes the health of the soil and the environment while producing fresh, flavorful crops.',
    nutrition: 'are particularly known for being a great source of Vitamin A, which supports eye health and immune function.'
    + '\n\n' + 
    'Additionally, they contain fiber, Vitamin K, potassium, and antioxidants, all of which contribute to overall health.',
    fact: 'are not only nutritious but also versatile, perfect for snacking, adding to salads, soups, or even roasting for extra flavor!',
    category: 1,
    topic: 'Vegetables',
    price: 200,   
    discount: 400,  
    percentage: '50%',
    calories: 41,
    carbs: 9.58, 
    protein: 0.93, 
    fat: 0.24, 
    fiber: 2.8,
    vitamin: 835, 
    potassium: 310,
    image: images.freshcarrots,   
    image1: images.freshcarrots1,
    image2: images.freshcarrots2,
  },
  {
    id: 2,
    title: 'Fresh Onions',
    name: 'Onions',
    seller: 'R & B Farms Ltd',
    description: 'are a staple in many cuisines worldwide, offering a unique flavor that ranges from sweet to sharp, depending on how they are prepared.' 
    + '\n\n' + 
    'They are rich in antioxidants and compounds that promote heart health and may help reduce inflammation.',
    about: 'is a family-run farm dedicated to growing fresh, high-quality produce for the local community and beyond.' 
    + '\n\n' + 
    'With generations of farming experience, R & B Farms Ltd produces flavorful onions using sustainable agricultural practices, ensuring each crop is nutrient-rich and fresh.',
    nutrition: 'are low in calories but packed with Vitamin C, B6, and antioxidants like quercetin, which help fight free radicals in the body.'
    + '\n\n' + 
    'They are also a good source of fiber, which supports digestive health.',
    fact: 'are incredibly versatile and can be enjoyed raw in salads, caramelized for sandwiches, or added to soups and stews for a burst of flavor.',
    category: 1,
    topic: 'Vegetables',
    price: 350,    
    discount: 400,  
    percentage: '5%',
    calories: 40,
    carbs: 9.34, 
    protein: 1.1, 
    fat: 0.1, 
    fiber: 1.7,
    vitamin: 7.4,
    potassium: 146,
    image: images.freshonions,  
    image1: images.freshonions1,
    image2: images.freshonions2,
  },
  {
    id: 3,
    title: 'Fresh Peppers',
    name: 'Peppers',
    seller: 'R & B Farms Ltd',
    description: 'are colorful and crunchy vegetables that are as nutritious as they are vibrant. They are rich in vitamins and antioxidants that support overall health.' 
    + '\n\n' + 
    'Peppers come in various colors, including red, green, and yellow, each offering a slightly different flavor profile.',
    about: 'is committed to producing fresh, high-quality produce with an emphasis on flavor and nutrition.' 
    + '\n\n' + 
    'Specializing in colorful bell peppers, R & B Farms Ltd uses eco-friendly farming methods to ensure the highest quality vegetables for their customers.',
    nutrition: 'are an excellent source of Vitamin C, providing more than 150% of the daily recommended intake per serving.'
    + '\n\n' + 
    'They also contain Vitamins A, B6, and antioxidants like lutein and zeaxanthin, which are beneficial for eye health.',
    fact: 'can be enjoyed raw, grilled, roasted, or sautéed, adding both color and flavor to a wide variety of dishes.',
    category: 1,
    topic: 'Vegetables',
    price: 250,
    discount: 400,  
    percentage: '25%',
    calories: 20,
    carbs: 4.64, 
    protein: 0.86, 
    fat: 0.17, 
    fiber: 1.7,
    vitamin: 127.7,
    potassium: 211,
    image: images.freshpeppers, 
    image1: images.freshpeppers1,
    image2: images.freshpeppers2,
  },
  {
    id: 4,
    title: 'Fresh Potatoes',
    name: 'Potatoes',
    seller: 'R & B Farms Ltd',
    description: 'are a versatile and nutrient-rich vegetable, often considered a comfort food in many households.' 
    + '\n\n' + 
    'They are packed with carbohydrates, fiber, and essential nutrients that provide energy and promote overall health.',
    about: 'has been providing fresh and locally-grown produce for generations, focusing on quality and sustainability.' 
    + '\n\n' + 
    'With expertise in growing root vegetables, R & B Farms Ltd delivers fresh, hearty potatoes that are perfect for a wide variety of dishes.',
    nutrition: 'are an excellent source of Vitamin C, potassium, and Vitamin B6, which are essential for energy production and immune function.'
    + '\n\n' + 
    'They are also rich in resistant starch, which supports digestive health and keeps you feeling full longer.',
    fact: 'are incredibly versatile and can be mashed, roasted, baked, or fried, making them a staple ingredient in countless recipes worldwide.',
    category: 1,
    topic: 'Vegetables',
    price: 350,
    discount: 500,  
    percentage: '25%',
    calories: 77,
    carbs: 17.6, 
    protein: 2.0, 
    fat: 0.1, 
    fiber: 2.2,
    vitamin: 19.7,
    potassium: 429,
    image: images.freshpotatoes, 
    image1: images.freshpotatoes1,
    image2: images.freshpotatoes2,
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
        onPress={() => {
          const selectedProduct = products.find(p => p.id === product.id);
          console.log(selectedProduct);

          router.push({ 
            pathname: '/product', 
            params: {
              products: JSON.stringify(selectedProduct),
            }
          });
        }}
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
            tintColor='rgba(0, 0, 0, 0)'
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
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollViewContent}
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
    backgroundColor: colors.emerald,
    width: 15,
  },

  inactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
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