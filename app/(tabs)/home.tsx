import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useRoute } from '@react-navigation/native';

// Import Supported Content
import { View, Image, StyleSheet, FlatList, PanResponder, TouchableOpacity, StatusBar, ScrollView, Animated, Text, TextInput, ImageBackground, useColorScheme } from 'react-native';

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
    title: 'Level 1 in June',
    subtitle: '8% off on your favourite product',
    text: '500 credits',
    image: images.background3,
    link: '',
  },
  {
    id: 2,
    title: 'Level 2 in August',
    subtitle: '12% off on your favourite product',
    text: '1, 000 credits',
    image: images.background4,
    link: '',
  },
  {
    id: 3,
    title: 'Level 3 in September',
    subtitle: '20% on your favourite product',
    text: '1, 500 credits',
    image: images.background5,
    link: '',
  },
];

const categories = [
  {
    id: 0,
    title: 'All',
    image: images.all,
    description: 'Showcase of all the products we have to offer YOU - the customer.',
  },
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
    category: 2,
    grading: 'A+',
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
    category: 2,
    grading: 'A+',
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
    category: 2,
    grading: 'A+',
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
    category: 2,
    grading: 'A+',
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
  {
    id: 5,
    title: 'Sweet Mangoes',
    name: 'Mangoes',
    seller: 'Tropical Fruits Ltd',
    description: 'are deliciously sweet and juicy, rich in flavor and packed with essential vitamins, making them a summer favorite.' 
    + '\n\n' +
    'Mangoes are versatile fruits that can be enjoyed fresh, in smoothies, or as part of savory dishes.',
    about: 'is known for delivering high-quality tropical fruits, focusing on sustainability and freshness.'
    + '\n\n' +
    'Grown in sun-kissed orchards, these mangoes are carefully harvested to ensure optimal ripeness and taste.',
    nutrition: 'are an excellent source of Vitamin C, Vitamin A, and dietary fiber, which promote skin health and aid digestion.'
    + '\n\n' +
    'They are also low in calories but high in antioxidants, making them a guilt-free treat.',
    fact: 'are often called the "king of fruits" and can be used in both sweet and savory dishes!',
    category: 1,
    topic: 'Fruits',
    grading: 'A+',
    price: 400,
    discount: 500,
    percentage: '20%',
    calories: 60,
    carbs: 15, 
    protein: 0.8, 
    fat: 0.4,
    fiber: 1.6,
    vitamin: 36.4,
    potassium: 168,
    image: images.sweetmangoes,
    image1: images.sweetmangoes1,
    image2: images.sweetmangoes2,
  },
  {
    id: 6,
    title: 'Sweet Potatoes',
    name: 'Sweet Potatoes',
    seller: 'Green Acres Farm',
    description: 'are a nutrient-dense root vegetable, offering a naturally sweet flavor and a host of essential vitamins.' 
    + '\n\n' +
    'They are a versatile ingredient perfect for roasting, baking, or mashing.',
    about: 'is dedicated to growing fresh, farm-to-table produce with sustainable practices that ensure flavor and nutrition.'
    + '\n\n' +
    'Their sweet potatoes are grown in nutrient-rich soils, guaranteeing a delicious and healthy crop.',
    nutrition: 'are rich in beta-carotene, a powerful antioxidant, and an excellent source of Vitamin A, potassium, and fiber.'
    + '\n\n' +
    'They help promote eye health, boost immunity, and support digestion.',
    fact: 'are naturally sweet, making them a perfect substitute for unhealthy carbs.',
    category: 3,
    grading: 'A+',
    topic: 'Roots & Tubers',
    price: 300,
    discount: 450,
    percentage: '33%',
    calories: 86,
    carbs: 20.1, 
    protein: 1.6, 
    fat: 0.1,
    fiber: 3.0,
    vitamin: 709,
    potassium: 337,
    image: images.sweetpotatoes,
    image1: images.sweetpotatoes1,
    image2: images.sweetpotatoes2,
  },
  {
    id: 7,
    title: 'Fresh Spinach',
    name: 'Spinach',
    seller: 'Urban Greenhouse Co.',
    description: 'is a nutrient-rich leafy green, offering numerous health benefits and a delicious earthy flavor.' 
    + '\n\n' +
    'Spinach is perfect for salads, smoothies, or as a cooked side dish.',
    about: 'is a hydroponic farm committed to delivering the freshest leafy greens using innovative and sustainable methods.'
    + '\n\n' +
    'Their spinach is grown pesticide-free, ensuring safety and superior taste.',
    nutrition: 'is loaded with iron, calcium, and Vitamins A, C, and K, which are essential for bone health and immunity.'
    + '\n\n' +
    'It is also low in calories, making it an ideal food for weight management.',
    fact: 'was made famous by the cartoon character Popeye for its ability to build strength!',
    category: 4,
    grading: 'A+',
    topic: 'Leafy Greens',
    price: 150,
    discount: 200,
    percentage: '25%',
    calories: 23,
    carbs: 3.6, 
    protein: 2.9, 
    fat: 0.4,
    fiber: 2.2,
    vitamin: 469,
    potassium: 558,
    image: images.freshspinach,
    image1: images.freshspinach1,
    image2: images.freshspinach2,
  },
  {
    id: 8,
    title: 'Fresh Ginger',
    name: 'Ginger',
    seller: 'Spice Masters Ltd',
    description: 'is a versatile spice with a zesty flavor, widely used for both culinary and medicinal purposes.' 
    + '\n\n' +
    'It adds a refreshing kick to teas, meals, and desserts.',
    about: 'is a leading provider of fresh herbs and spices, known for their premium quality and unique flavors.'
    + '\n\n' +
    'Their ginger is grown in nutrient-rich soils, ensuring a bold and aromatic taste.',
    nutrition: 'is known for its anti-inflammatory and antioxidant properties, helping with digestion, nausea, and immune support.'
    + '\n\n' +
    'It is also low in calories, making it an excellent addition to healthy diets.',
    fact: 'has been used in traditional medicine for thousands of years!',
    category: 5,
    grading: 'A+',
    topic: 'Herbs & Spices',
    price: 180,
    discount: 220,
    percentage: '18%',
    calories: 80,
    carbs: 17.8, 
    protein: 1.8, 
    fat: 0.8,
    fiber: 2.0,
    vitamin: 0,
    potassium: 415,
    image: images.freshginger,
    image1: images.freshginger1,
    image2: images.freshginger2,
  },
  {
    id: 9,
    title: 'Juicy Jackfruit',
    name: 'Jackfruit',
    seller: 'Tropical Treats Co.',
    description: 'is a tropical fruit known for its sweet, fibrous flesh, often used as a meat substitute in vegetarian dishes.' 
    + '\n\n' +
    'Jackfruit is not only delicious but also highly nutritious.',
    about: 'specializes in tropical and seasonal fruits, ensuring freshness and quality with every harvest.'
    + '\n\n' +
    'Their jackfruit is handpicked to guarantee ripeness and flavor.',
    nutrition: 'is rich in Vitamin C, potassium, and dietary fiber, supporting immune health and digestion.'
    + '\n\n' +
    'It is also a low-calorie, filling option for those seeking healthier snacks.',
    fact: 'is the largest fruit that grows on trees, sometimes weighing up to 40 pounds!',
    category: 7,
    grading: 'A+',
    topic: 'Seasonal',
    price: 500,
    discount: 600,
    percentage: '17%',
    calories: 95,
    carbs: 23, 
    protein: 1.7, 
    fat: 0.6,
    fiber: 1.5,
    vitamin: 13.7,
    potassium: 448,
    image: images.juicyjackfruit,
    image1: images.juicyjackfruit1,
    image2: images.juicyjackfruit2,
  },
  {
    id: 10,
    title: 'Green Bananas',
    name: 'Green Bananas',
    seller: 'Harvest Fresh Ltd',
    description: 'are a staple in Jamaican and Caribbean cuisine, offering a starchy texture and subtle flavor when cooked.' 
    + '\n\n' +
    'They are often boiled, steamed, or fried as a side dish or a hearty base for meals.',
    about: 'is dedicated to providing fresh, farm-to-table produce to households and markets across the region.' 
    + '\n\n' +
    'Their green bananas are handpicked at peak maturity, ensuring quality and freshness in every bunch.',
    nutrition: 'are rich in complex carbohydrates, potassium, and fiber, making them a great energy source for an active lifestyle.'
    + '\n\n' +
    'They also contain resistant starch, which supports gut health and regulates blood sugar levels.',
    fact: 'are an essential ingredient in traditional Jamaican dishes like boiled bananas served with fish or callaloo.',
    category: 6,
    grading: 'A+',
    topic: 'Provisions',
    price: 200,
    discount: 250,
    percentage: '20%',
    calories: 90,
    carbs: 23, 
    protein: 1.1, 
    fat: 0.3,
    fiber: 2.6,
    vitamin: 10.3,
    potassium: 358,
    image: images.greenbananas,
    image1: images.greenbananas1,
    image2: images.greenbananas2,
  },
  {
    id: 11,
    title: 'Fresh Ackee',
    name: 'Ackee',
    seller: 'Island Pride Farms',
    description: 'is Jamaica’s national fruit and a key ingredient in the beloved dish, ackee and saltfish.' 
    + '\n\n' +
    'With its buttery texture and subtle flavor, ackee pairs perfectly with savory dishes, creating a unique culinary experience.',
    about: 'is renowned for supplying authentic Jamaican produce to local and international markets.' 
    + '\n\n' +
    'Their ackee is carefully harvested and prepared to ensure quality, freshness, and safety.',
    nutrition: 'is rich in healthy fats, protein, and essential nutrients like Vitamin C and potassium.' 
    + '\n\n' +
    'It provides energy, supports heart health, and contributes to a balanced diet.',
    fact: 'is a versatile fruit that, when cooked, resembles scrambled eggs but with a distinctly Jamaican flavor!',
    category: 8,
    grading: 'A+',
    topic: 'Traditional',
    price: 600,
    discount: 700,
    percentage: '15%',
    calories: 151,
    carbs: 8.1, 
    protein: 2.9, 
    fat: 15.2,
    fiber: 2.5,
    vitamin: 30.0,
    potassium: 270,
    image: images.freshackee,
    image1: images.freshackee1,
    image2: images.freshackee2,
  },  
];

const companies = [
  { id: 1, name: 'R & B Farms Ltd' },
  { id: 2, name: 'Tropical Fruits Ltd' },
  { id: 3, name: 'Green Acres Farm' },
  { id: 4, name: 'Urban Greenhouse Co.' },
  { id: 5, name: 'Spice Masters Ltd' },
  { id: 6, name: 'Island Pride Farms' }
];

const foodGrades = ['A+', 'A', 'B+', 'B', 'C', 'D', 'F'];

const starRatings = [5, 4, 3, 2, 1];

const Product = ({ product, onLikePress, likedProducts, router }) => {
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    const loadQuantity = async () => {
      const storedCart = await AsyncStorage.getItem('cart');
      if (storedCart) {
        const cart = JSON.parse(storedCart);
        const cartItem = cart.find(item => item.id === product.id);
        if (cartItem) {
          setQuantity(cartItem.quantity);
        }
      }
    };
    loadQuantity();
  }, [product.id]);

  const updateCart = async (newQuantity: number) => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      let cart = storedCart ? JSON.parse(storedCart) : [];

      const itemIndex = cart.findIndex((item) => item.id === product.id);

      if (newQuantity > 0) {
        const cartItem = {
          id: product.id,
          title: product.title,
          image: product.image,
          price: product.price,
          quantity: newQuantity,
        };

        if (itemIndex !== -1) {
          cart[itemIndex] = cartItem;
        } 
        else {
          cart.push(cartItem);
        }
      } 
      else if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
      setQuantity(newQuantity);

    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const increment = () => updateCart(quantity + 1);
  const decrement = () => updateCart(Math.max(0, quantity - 1));

  return (
    <View style={styles.catelogue}>
      <TouchableOpacity 
        key={product.id}
        style={styles.product}
        onPress={() => {
          router.push({ 
            pathname: '/product', 
            params: {
              products: JSON.stringify(product),
            }
          });
        }}
      >
        <View>
          <ImageBackground
            source={product.image}
            style={styles.productimage}
          >
            <TouchableOpacity 
              style={styles.productlike}
              onPress={() => onLikePress(product)} 
            >
              <Image
                source={likedProducts.some((item) => item.id === product.id) ? icons.likefill : icons.like}
                style={styles.mediumicon}
                tintColor={
                  likedProducts.some((item) => item.id === product.id) ? colors.red : colors.white
                }
              />
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.productbody}>
          <View style={styles.productbodyhead}>
            <Text style={styles.productext}>{product.title}</Text>

            <Text style={styles.productsubtext}>
              <Text style={styles.productsubprice}>JMD </Text>{product.price}
              <Text style={styles.productsubper}> /kg</Text>
            </Text>

            <Text style={styles.productdiscount}>JMD {product.discount}</Text> 
          </View>     

          <View style={styles.productbodybot}>
              <Image
                source={icons.starfill}
                tintColor={colors.yellow}
                style={styles.smallicon}
              />

              <Text style={styles.productgrading}>{product.grading}</Text>
          </View>   
        </View>

        <View style={styles.productbot}>
          <TouchableOpacity onPress={decrement}>
            <Image
              source={icons.subtract}
              tintColor={colors.white}
              style={styles.mediumicon}
            />
          </TouchableOpacity>

          <Text style={styles.productcount}>JMD {quantity * product.price}</Text>

          <TouchableOpacity onPress={increment}>
            <Image
              source={icons.add}
              tintColor={colors.white}
              style={styles.mediumicon}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const Home = ({}) => {

  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState('');

  const [values, setValues] = useState([0, 2000]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);

  const [toggleFilter, setToggleFilter] = useState(false);
  const [currentAdIndex, setcurrentAdIndex] = useState(0);

  const [likedProducts, setLikedProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [pan] = useState(new Animated.Value(0));
  const [filterHeight, setFilterHeight] = useState('60%');

  // Create the pan responder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        pan.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) { // Swiped up
          setFilterHeight('100%');
        } else if (gestureState.dy > 50) { // Swiped down
          setFilterHeight('60%');
        }
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  /* Handlers Constants  */

  const handleCategoryPress = (category) => {
    setSelectedCategory(category);
    setFilteredProducts(applyFilters(
      products, 
      searchQuery, 
      selectedCategory, 
      values,
      selectedCompany,
      selectedGrade,
      selectedRating
    ));
  };
  
  const handleSearch = (text) => {
    setSearchQuery(text);
    setFilteredProducts(applyFilters(
      products, 
      text, 
      selectedCategory, 
      values,
      selectedCompany,
      selectedGrade,
      selectedRating
    ));
  };
  
  const handlePriceChange = (newValues) => {
    setValues(newValues);
    setFilteredProducts(applyFilters(
      newValues,
      products, 
      searchQuery, 
      selectedCategory, 
      selectedCompany,
      selectedGrade,
      selectedRating      
    ));
  };

  /* Product Constants */

  const renderProduct = ({ item }) => (
    <Product 
      product={item} 
      onLikePress={toggleLike} 
      likedProducts={likedProducts} 
      router={router} 
    />
  );

  const toggleLike = async (product) => {
    try {
      let updatedLikes = [...likedProducts];

      const existingIndex = updatedLikes.findIndex((item) => item.id === product.id);
  
      if (existingIndex > -1) 
      {
        updatedLikes.splice(existingIndex, 1);
      } 
      else 
      {
        updatedLikes.push(product);
      }
  
      setLikedProducts(updatedLikes);

      console.log(updatedLikes);

      await AsyncStorage.setItem('likedProducts', JSON.stringify(updatedLikes));
    } 
    catch (error) 
    {
      console.error("Error toggling like: ", error);
    }
  };  

  const applyFilters = (products, query, category, priceRange, company, grade, rating) => {
    let filtered = products;
    
    // Existing filters
    if (query.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category !== null && category !== 0) {
      filtered = filtered.filter(product => product.category === category);
    }
    
    filtered = filtered.filter(product => {
      return product.price >= priceRange[0] && product.price <= priceRange[1];
    });
    
    // New filters
    if (company) {
      filtered = filtered.filter(product => product.seller === company);
    }
    
    if (grade) {
      // Assuming you'll add a 'grade' field to your products
      filtered = filtered.filter(product => product.grade === grade);
    }
    
    if (rating) {
      // Assuming you'll add a 'rating' field to your products
      filtered = filtered.filter(product => Math.floor(product.rating) === rating);
    }
    
    return filtered;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);  

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"  />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.scrollViewContent1}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.headertop}>
                <Image
                  source={icons.location}
                  style={styles.icon}
                  tintColor={colors.black}
                />  
              </TouchableOpacity>

              <View style={styles.headerbody}>
                <Text style={styles.headerbodytext}>Express delivery</Text>
                <Text style={styles.headerbodysub}>Deepolie Street, 42</Text>
              </View>

              <View style={styles.headerbot}>
                <TouchableOpacity>
                  <Image
                    source={icons.search}
                    style={styles.icon}
                    tintColor={colors.black}
                  />
                </TouchableOpacity>

                <TouchableOpacity>
                  <Image
                    source={icons.notification}
                    style={styles.icon}
                    tintColor={colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.search}>
              <Image
                source={icons.search}
                style={styles.mediumicon}
                tintColor='rgba(0, 0, 0, 0.2)'
              />

              <TextInput
                placeholder="Search for your items"
                placeholderTextColor='rgba(0, 0, 0, 0.2)'
                value={searchQuery}
                onChangeText={handleSearch}
                style={styles.searchtext}
              />

              <TouchableOpacity 
                onPress={() => setToggleFilter(!toggleFilter)}
              >
                <Image
                  source={icons.filter}
                  style={styles.mediumicon}
                  tintColor='rgba(0, 0, 0, 0.2)'
                />
              </TouchableOpacity>
            </View>

            <View style={styles.promos}>
              <ImageBackground
                style={styles.promoImage}
                imageStyle={styles.promoOverlay}
                source={ads[currentAdIndex].image}
              >
                <View style={styles.promotop}>
                  <Text style={styles.promotoptext}>{ads[currentAdIndex].title}</Text>
                  <Text style={styles.promotopsub}>{ads[currentAdIndex].subtitle}</Text>
                </View>

                <View style={styles.promobot}>
                  <TouchableOpacity style={styles.promobutton1}>
                    <Text style={styles.promobotext}>{ads[currentAdIndex].text}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={styles.promobutton2}>
                    <Image
                      source={icons.right}
                      style={styles.mediumicon}
                      tintColor={colors.charcoal}
                    />
                  </TouchableOpacity>
                </View>
              </ImageBackground>
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

            <View style={styles.offers}>
              {searchQuery ? (
                <View>
                  <View style={styles.offer}>
                    <Text style={styles.offertext}>{filteredProducts.length} {filteredProducts.length === 1 ? 'Result' : 'Results'} Found</Text>
                  </View>
                  
                  <FlatList
                    data={filteredProducts}
                    keyExtractor={(item) => item.id.toString()}
                    horizontal={true}
                    scrollEnabled={true}
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderProduct}
                    contentContainerStyle={{ 
                        gap: 15,
                        justifyContent: 'center',
                    }}
                  />
                </View>
              ) : (
                <View>
                  <View style={styles.offer}>
                    <Text style={styles.offertext}>Novelities of the week</Text>

                    <TouchableOpacity>
                      <Text style={styles.offersub}>See More</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={styles.products}>
                    <FlatList
                      data={filteredProducts}
                      keyExtractor={(item) => item.id.toString()}
                      horizontal={true}
                      scrollEnabled={true} 
                      showsHorizontalScrollIndicator={false}
                      renderItem={renderProduct}
                      contentContainerStyle={{ 
                        gap: 15,
                        justifyContent: 'center',
                      }}
                    />
                  </View>
                </View>
              )}
            </View> 

            <View style={styles.categories}>
              <View style={styles.category}>
                <ScrollView 
                  horizontal
                  contentContainerStyle={styles.categorysort}
                  showsHorizontalScrollIndicator={false}
                >
                  {categories.map((category) => (
                    <TouchableOpacity 
                      key={category.id}
                      style={styles.categoryitem}    
                      onPress={() => handleCategoryPress(category.id)}                
                    >
                      <View style={styles.categorybody}>
                        <Text style={styles.categorytext}>{category.title}</Text>
                        
                        <View style={styles.categoryimage}>
                          <Image
                            source={category.image}
                            style={styles.largeimage}
                            resizeMode='cover'
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}      
                </ScrollView>
              </View>
            </View>
          </View>
        </ScrollView>

        {toggleFilter && (
          <>
            <BlurView intensity={90} tint="dark" style={StyleSheet.absoluteFill} />

            <Animated.View 
              style={[
                styles.filters,
                { height: filterHeight },
                {
                  transform: [{
                    translateY: pan.interpolate({
                      inputRange: [-300, 0, 300],
                      outputRange: [-50, 0, 0],
                      extrapolate: 'clamp',
                    }),
                  }],
                }
              ]}
            >
              <View 
                style={styles.filterdrag}
                {...panResponder.panHandlers}
              >
                <Image
                  source={icons.drag}
                  style={styles.largeicon}
                  tintColor={colors.dullGrey}
                />
              </View>

              <ScrollView 
                showsVerticalScrollIndicator={false} 
                contentContainerStyle={styles.scrollViewContent2}
              >
                <View style={styles.filter}>
                  <View style={styles.filterheader}>
                    <Text style={styles.filtertitle}>Filter</Text>

                    <TouchableOpacity 
                      style={styles.close}
                      onPress={() => setToggleFilter(!toggleFilter)}
                    >
                      <Image
                        source={icons.close}
                        style={styles.tinyicon}
                        tintColor={colors.dullGrey}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.filtersection}>
                    <View style={styles.filtertop}>
                      <Text style={styles.filtertext}>Category</Text>
                      <Text style={styles.filtersubtext}>e.g: Fruits, Veggies, etc.</Text>
                    </View>

                    <ScrollView 
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.filteroptions}
                    >
                      {categories.map(category => (
                        <TouchableOpacity
                          key={category.id}
                          style={[
                            styles.filteroption,
                            selectedCategory === category && styles.selectedfilter
                          ]}
                          onPress={() => setSelectedCategory(
                            selectedCategory === category.id ? null : category.id
                          )}
                        >
                          <Text style={styles.filteroptiontext}>{category.title}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.filtersection}>
                    <View style={styles.filtertop}>
                      <Text style={styles.filtertext}>Company</Text>
                      <Text style={styles.filtersubtext}>Select producer/seller</Text>
                    </View>

                    <ScrollView 
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.filteroptions}
                    >
                      {companies.map(company => (
                        <TouchableOpacity
                          key={company.id}
                          style={[
                            styles.filteroption,
                            selectedCompany === company.name && styles.selectedfilter
                          ]}
                          onPress={() => setSelectedCompany(
                            selectedCompany === company.name ? null : company.name
                          )}
                        >
                          <Text style={styles.filteroptiontext}>{company.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.filtersection}>
                    <View style={styles.filtertop}>
                      <Text style={styles.filtertext}>Food Grade</Text>
                      <Text style={styles.filtersubtext}>Quality rating</Text>
                    </View>

                    <ScrollView 
                      horizontal
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.filteroptions}
                    >
                      {foodGrades.map(grade => (
                        <TouchableOpacity
                          key={grade}
                          style={[
                            styles.filteroption,
                            selectedGrade === grade && styles.selectedfilter
                          ]}
                          onPress={() => setSelectedGrade(
                            selectedGrade === grade ? null : grade
                          )}
                        >
                          <Text style={styles.filteroptiontext}>{grade}</Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  <View style={styles.filtersection}>
                    <View style={styles.filtertop}>
                      <Text style={styles.filtertext}>Star Rating</Text>
                      <Text style={styles.filtersubtext}>Customer reviews</Text>
                    </View>

                    <View style={styles.filteratings}>
                      {starRatings.map(rating => (
                        <TouchableOpacity
                          key={rating}
                          style={[
                            styles.filterating,
                            selectedRating === rating && styles.selectedrating
                          ]}
                          onPress={() => setSelectedRating(
                            selectedRating === rating ? null : rating
                          )}
                        >
                          <View style={styles.filteratingoptions}>
                            {[...Array(rating)].map((_, i) => (
                              <Image
                                key={i}
                                source={icons.starfill}
                                style={styles.filteratingoption}
                                tintColor={
                                  selectedRating === rating ? colors.emerald : colors.grey
                                }
                              />
                            ))}
                          </View>

                          <Text style={styles.filteratingtext}>{rating}+</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.filterprice}>
                    <View style={styles.filtertop}>
                      <Text style={styles.filtertext}>Price Range</Text>
                      <Text style={styles.filtersubtext}>JMD {values[0]} - JMD {values[1]}</Text>
                    </View>

                    <View style={styles.filterpriceinputs}>
                      <View style={styles.filterpriceinput}>
                        <Text style={styles.filterpricelabel}>Min:</Text>
                                                
                        <TextInput
                          style={styles.filterpricetext}
                          keyboardType="numeric"
                          value={values[0].toString()}
                          onChangeText={(text) => {
                            if (text === '') {
                              handlePriceChange([0, values[1]]);
                            } 
                            else {
                              const num = parseInt(text) || 0;
                              
                              if (num >= 0 && num <= values[1]) {
                                handlePriceChange([num, values[1]]);
                              }
                            }
                          }}
                        />
                      </View>
                      
                      <View style={styles.filterpriceinput}>
                        <Text style={styles.filterpricelabel}>Max:</Text>

                        <TextInput
                          style={styles.filterpricetext}
                          keyboardType="numeric"
                          value={values[1].toString()}
                          onChangeText={(text) => {
                            if (text === '') {
                              handlePriceChange([values[0], 2000]);
                            } else {
                              const num = parseInt(text) || 0;
                              if (num >= values[0] && num <= 2000) {
                                handlePriceChange([values[0], num]);
                              }
                            }
                          }}
                        />
                      </View>
                    </View>

                    <View style={styles.filterpriceslider}>
                      <MultiSlider
                        values={values}
                        onValuesChange={handlePriceChange}
                        min={0}
                        max={2000}
                        step={10}
                        sliderLength={330}
                        allowOverlap
                        snapped
                        markerStyle={{height: 10, width: 10, backgroundColor: colors.fresh }}
                        selectedStyle={{ backgroundColor: colors.fresh }}
                        unselectedStyle={{ backgroundColor: colors.charcoal }}
                      />
                    </View>
                  </View>

                  <TouchableOpacity 
                    style={styles.filterbutton}
                    onPress={() => setToggleFilter(!toggleFilter)}
                  >
                    <Text style={styles.filterbuttontext}>Apply Changes</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </Animated.View>
          </>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    height: '100%',
  },

  scrollViewContent1: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
    paddingTop: 20,
  },

  scrollViewContent2: {
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 80,
    bottom: 30,
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
  },

  headertop: {
    /* Add code here  */
  },

  headerbody: {
    marginRight: 80,
  },

  headerbodytext: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.5)',
  },

  headerbodysub: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 17,
  },

  headerbot: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Search */

  search: {
    width: '90%',
    backgroundColor: colors.gallery,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',   
    marginVertical: 20, 
    borderRadius: 18,
    padding: 5,
  },

  searchtext: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    color: colors.charcoal,
    marginRight: 120,
  },

  /* Promos */

  promos: {
    width: '90%',
    overflow: 'hidden',
    borderRadius: 20,
  },

  promoImage: {
    padding: 20,
    flexDirection: 'column',
    gap: 25,
  },

  promoOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 19, 19, 0.67)',
    zIndex: 0,
  },

  promotop: {
    flexDirection: 'column',
    gap: 10,
  },
  
  promotoptext: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
    color: colors.white,
  },
  
  promotopsub: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    color: colors.white,
  },

  promobot: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
  },

  promobotext: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 15,
    color: colors.charcoal,
    padding: 5,
  },

  promobutton1: {
    backgroundColor: colors.white,
    height: 30,
    width: 140,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },

  promobutton2: {
    backgroundColor: colors.white,
    height: 30,
    width: 30,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Offers */

  offers: {
    width: '90%',
    marginVertical: 20,
  },

  offer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20, 
    alignItems: 'flex-end',
  },

  offertext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 25,
    color: colors.black,
  },

  offersub: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  /* Products */

  catelogue: {
  },

  products: {
    width: '100%',
    justifyContent: 'space-between',
  },

  product: {
    backgroundColor: colors.white,
    flexDirection: 'column',
    gap: 10,
    borderRadius: 20,
  },

  productbody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginVertical: 10,
  },

  productbodybot: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  productbodyhead: {
    flexDirection: 'column',
    gap: 8,
  },

  productext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    color: colors.black,
  },

  productsubtext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 13,
    color: colors.black,
  },

  productsubprice: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  productsubper: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 10,
    color: 'rgba(0, 0, 0, 0.3)',
  },

  productdiscount: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: 'rgba(0, 0, 0, 0.3)',
    textDecorationLine: 'line-through',
  },

  productlike: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    width: 55,
    height: 55,
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    right: 0,
    margin: 10,
  },

  productimage: {
    width: 170,
    height: 160,
    borderRadius: 20,
    overflow: 'hidden',
  },

  productbot: {
    padding: 10,
    backgroundColor: colors.black,
    borderRadius: 15,
    width: 170,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  productcount: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 15,
    color: colors.white,
  },

  productgrading: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 15,
    color: colors.black,
  },

  /* Category */

  categories: {
    width: '90%',
    marginVertical: 20,
  },

  categorybody: {
    backgroundColor: colors.lightGrey,
    padding: 15,
    borderRadius: 15,
    width: 150,
    height: 100,
    overflow: 'hidden',
  },

  categorytext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 15,
    color: colors.black,
  },

  categorysort: {
    gap: 20,
  },

  categoryitem: {
    flexDirection: 'column',
    gap: 20,
  },

  categoryimage: {
    width: 150,
    height: 150,
    left: 30,
    bottom: 30,
  },

  /* Filter */

  filters: {
    backgroundColor: colors.white,
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  filterdrag: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },

  filter: {
    width: '99%',
    padding: 30,
  },

  filterheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    marginBottom: 20,
    alignItems: 'center',
  },

  filtertop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    alignItems: 'center',
  },

  filtertitle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 20,
    color: colors.black,
    marginRight: 220,
  },

  filtersubtitle: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: colors.black,
  },

  filtertext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.4)',
  },

  filtersubtext: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.4)',
  },
  
  filtersection: {
    marginBottom: 25,
  },

  filteroptions: {
    gap: 10,
    paddingVertical: 10,
  },
  
  filteroption: {
    backgroundColor: colors.gallery,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
  },

  filteroptiontext: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
  },

  filterprice: {
    width: '100%',
  },

  filterpriceinputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  filterpriceinput: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gallery,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '45%',
  },

  filterpricelabel: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 14,
    color: colors.black,
    marginRight: 5,
  },
  
  filterpricetext: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
    color: colors.black,
    flex: 1,
  },

  filterpriceslider: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  filteratings: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    gap: 5,
  },
  
  filterating: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 10,
    backgroundColor: colors.gallery,
  },
  
  filteratingoptions: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  
  filteratingoption: {
    width: 15,
    height: 15,
    marginHorizontal: 1,
  },
  
  filteratingtext: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
  },

  filterbutton: {
    padding: 20,
    width: '100%',
    backgroundColor: colors.green,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  filterbuttontext: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 12,
    color: colors.white
  },

  /* Selected */

  selectedrating: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  
  selectedcategory: {
    backgroundColor: colors.yellow,
  },

  selectedfilter: {
    backgroundColor: colors.emerald,
  },

  /* Pagination */

  pagination: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },

  dot: {
    height: 5,
    width: 5,
    borderRadius: 4,
    margin: 5,
  },

  active: {
    backgroundColor: colors.fresh,
    width: 30,
  },

  inactive: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },

  /* Add-Ons */

  close: {
    width: 25,
    height: 25,
    borderRadius: 20,
    backgroundColor: colors.black,
    justifyContent: 'center',
    alignItems: 'center',
  },

  /* Images */

  image: {
    height: 80,
    width: 80,
  },

  largeimage: {
    height: '100%',
    width: '100%',
  },

  /* Icons */

  icon: {
    height: 25,
    width: 25,
  },
  
  largeicon: {
    margin: 15,
    width: 90,
    height: 40,
  },

  mediumicon: {
    height: 20,
    width: 20,
    margin: 5,
  },

  smallicon: {
    height: 15,
    width: 15,
  },

  tinyicon: {
    height: 5,
    width: 5,
  },

});

export default Home;