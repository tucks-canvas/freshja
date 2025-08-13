import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';

// Import Supported Content
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Image, StatusBar } from 'react-native';

// Import Add-Ons
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Platform } from 'react-native'; 

// Import Icons and Images
import { icons, images } from '../../../constants';
import colors from '../../../constants/colors';

const shipping = {
  street: '4 Marvic Close',
  city: 'Red Hills',
  state: 'St. Andrew',
  country: 'Jamaica.',
};

const cards = [
  {
    id: 1,
    type: 'mastercard',
    number: '1234 5678 9012 3456',
    cardholder: 'John Doe',
    expiry: '12/25',
  },
  {
    id: 2,
    type: 'visa',
    number: '1234 5678 9012 3456',
    cardholder: 'Jane Smith',
    expiry: '11/29',
  },
];

const timeslots = [
  {
    id: 1,
    title: '8 AM - 11 AM',
  },
  {
    id: 2,
    title: '11 AM - 12 PM',
  },
  {
    id: 3,
    title: '12 PM - 2 PM',
  },
  { 
    id: 4,
    title: '2 PM - 4 PM',
  },
  {
    id: 5,
    title: '4 PM - 6 PM',
  },
  {
    id: 6,
    title: '6 PM - 8 PM',
  },
];

const Checkout = () => {
  
  const router = useRouter();

  const [cart, setCart] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    phone: '',
    email: '',
  });
  
  const [selectedTimeSlot, setSelectedTimeSlot] = useState('11 AM - 12 PM');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [tempDate, setTempDate] = useState(new Date());

  const handleDateChange = (event, selectedate) => {
    const currentDate = selectedate || tempDate;
    
    setShowDatePicker(Platform.OS === 'ios');
    setTempDate(currentDate);

    if (Platform.OS === 'android' && event.type === 'set') {
      setDate(currentDate);
    }
  };

  const confirmDateSelection = () => {
    setDate(tempDate);
    setShowDatePicker(false);
  };

  const renderSavedCards = () => {
    return (
      <View style={styles.savedcards}>

        {cards.map(card => (
          <TouchableOpacity
            key={card.id}
            style={[
              styles.carditem,
              selectedCard?.id === card.id && styles.selectedcarditem
            ]}
            onPress={() => setSelectedCard(card)}
          >
            <View style={styles.cardetails}>
              <Image 
                source={card.type === 'mastercard' ? icons.mastercard : icons.visa}
                style={styles.cardtype}
              />

              <Text style={styles.cardno}>**** **** **** {card.number?.slice(-4)}</Text>
              
              <View style={styles.cardfooter}>
                <Text style={styles.cardholder}>{card.cardholder}</Text>
                <Text style={styles.cardexpiry}>{card.expiry}</Text>
              </View>

            </View>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.cardbutton}>
          <Text style={styles.cardbuttontext}>+</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderCartItems = () => {
    return (
      <View style={styles.cart}>
        {cart.map((item) => (
          <View 
            key={item.id} 
            style={styles.cartitem}
          >
            <Image
              source={item.image}
              style={styles.itemimage}
              resizeMode="cover"
            />

            <View style={styles.itemdetails}>
              <Text style={styles.itemtitle}>{item.title}</Text>

              <Text style={styles.itemprice}>
                JMD {item.price} × {item.quantity}
              </Text>
            </View>

            <Text style={styles.itemTotal}>
              JMD {(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      
      if (storedCart) 
      {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error('Error loading cart:', error);
    }
  };

  const calculateSubtotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateTotal = () => {
    return (400 + calculateSubtotal()).toFixed(2);
  };

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.verticalViewContent}
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headertext}>Payment</Text>            
            </View>
            
            <View style={styles.shippingaddress}>
              <Text style={styles.addresstext}>Delivery Address</Text>

              <View style={styles.addresscard}>
                <Text style={styles.addressub}>{shipping.street}</Text>

                <Text style={styles.addressub}>
                  {shipping.city}, {shipping.state}
                </Text>

                <Text style={styles.addressub}>{shipping.country}</Text>
              </View>
            </View>

            <View style={styles.carts}>
              <Text style={styles.cartext}>Items</Text>

              {renderCartItems()}
            </View>

            <View style={styles.delivery}>
              <Text style={styles.deliverytext}>Choose Delivery Date</Text>

              <TouchableOpacity
                style={styles.dates}
                onPress={() => setShowDatePicker(true)}
              >
                <Image 
                  source={icons.calendar} 
                  style={styles.subicon} 
                />

                <Text style={styles.selectedate}>
                  {date.toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </Text>
              </TouchableOpacity>

              <View style={styles.times}>
                <ScrollView 
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.horizontalViewContent}
                >
                  {timeslots.map((time) => (
                      <TouchableOpacity 
                        key={time.id} 
                        style={styles.time}
                      >
                        <Text style={styles.timetext}>{time.title}</Text>
                      </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>          
            </View>

            <View style={styles.payments}>
              <Text style={styles.paymentext}>Payment Methods</Text>

              <View style={styles.payment}>
                {renderSavedCards()}
              </View>
            </View>

            <View style={styles.summaries}>
              <View style={styles.summary}>
                <Text style={styles.summarytext}>Subtotal:</Text>
                <Text style={styles.summarysub}>JMD {calculateSubtotal().toFixed(2)}</Text>
              </View>

              <View style={styles.summary}>
                <Text style={styles.summarytext}>Delivery:</Text>
                <Text style={styles.summarysub}>JMD 400.00 </Text>
              </View>

              <View style={[styles.summary, styles.total]}>
                <Text style={styles.totaltext}>Total:</Text>
                <Text style={styles.totalsub}>JMD {calculateTotal()}</Text>
              </View>
            </View>
          </View>    
        </ScrollView>

        {showDatePicker && (
            <View style={styles.datepicker}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                onChange={handleDateChange}
                minimumDate={new Date()}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                textColor={colors.black}
              />
            </View>
        )}  
        
        <TouchableOpacity 
          style={styles.paybutton} 
          onPress={() => router.push('/paymentsuccess')}
        >
          <Text style={styles.paybuttontext}>Place Order</Text>
        </TouchableOpacity>
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
    padding: 20,
  },

  verticalViewContent: {

  },

  horizontalViewContent: {
    gap: 6,  
  },

  /* Header */

  header: {
    width: '100%',
    marginBottom: 20,
  },
  
  headertext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 25,
  },

  /* Shipping */
  
  shippingaddress: {
    marginBottom: 40,
  },
  
  addresscard: {
    flexDirection: 'column',
    gap: 5,
  },
  
  addresstext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    lineHeight: 24,
    color: colors.black,
    marginBottom: 12,
  },

  addressub: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
  },

  /* Cart */

  carts: {
    width: '100%',
    marginBottom: 30,
  },
  
  cart: {
    width: '100%',
    marginBottom: 20,
    backgroundColor: colors.white,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  cartext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    lineHeight: 24,
    color: colors.black,
  },
  
  cartitem: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.05)',
  },
  
  itemimage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  
  itemdetails: {
    flex: 1,
    marginLeft: 15,
  },
  
  itemtitle: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
  },
  
  itemprice: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
  },
  
  itemTotal: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 16,
  },

  /* Delivery */
  
  delivery: {
    marginBottom: 20,
  },
  
  deliverytext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    marginBottom: 10,
  },

  /* Dates */

  dates: {
    flexDirection: 'row',
    backgroundColor: Platform.OS === 'ios' ? '#f8f9fa' : '#e9ecef',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  
  dateselector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 20,
  },
  
  dateselectortext: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    color: '#6c757d',
  },

  datepicker: {
  },  

  /* Times */

  times: {
    width: '100%',
  },

  time: {
    backgroundColor: Platform.OS === 'ios' ? '#f8f9fa' : '#e9ecef',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
  },

  timetext: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: colors.black,
  },

  /* Payments */

  payments: {
    width: '100%',
  },

  payment: {
    width: '100%',
  },

  paymentext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    color: colors.black,
  },

  /* Cards */
  
  savedcards: {
    flexDirection: 'column',
    marginTop: 15,
    gap: 12,
  },
  
  carditem: {
    backgroundColor: Platform.OS === 'ios' ? '#f8f9fa' : '#e9ecef',
    padding: 20,
    borderRadius: 20,
    shadowColor: colors.grey,
    shadowOpacity: 0.05,
    elevation: 5,
  },
  
  cardetails: {
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 20,
  },

  cardtype: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  
  cardno: {
    fontFamily: 'Gilroy-Medium',
    fontSize: 16,
    letterSpacing: 9.35,
  },
  
  cardfooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  
  cardholder: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: '#6c757d',
  },
  
  cardexpiry: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 14,
    color: '#6c757d',
  },
  
  cardbutton: {
    backgroundColor: Platform.OS === 'ios' ? '#f8f9fa' : '#e9ecef',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
    borderStyle: 'dashed',
  },
  
  cardbuttontext: {
    fontSize: 24,
    color: '#6c757d',
  },

  /* Summaries */
  
  summaries: {
    backgroundColor: colors.white,
    marginVertical: 20,
    padding: 15,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  
  summarytext: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
  },
  
  summarysub: {
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
  },
  
  total: {
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.1)',
    paddingTop: 10,
    marginTop: 10,
  },
  
  totaltext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
  },

  totalsub: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    color: colors.emerald,
  },

  /* Button */
  
  paybutton: {
    backgroundColor: colors.emerald,
    padding: 15,
    borderRadius: 15,
    margin: 20,
    alignItems: 'center',
  },
  
  paybuttontext: {
    fontFamily: 'Gilroy-Bold',
    fontSize: 18,
    color: colors.white,
  },

  /* Selected */
  
  selectedate: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    color: colors.black,
  },

  selectedcarditem: {
    backgroundColor: '#f1f9f5',
    borderColor: colors.emerald,
  },

  /* Button */

  button: { 
    flexDirection: 'row', 
    justifyContent: 'flex-end', 
    marginTop: 10 
  },
  
  confirm: {
    backgroundColor: colors.emerald,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  
  confirmtext: {
    color: colors.white,
    fontFamily: 'Gilroy-SemiBold',
    fontSize: 16,
  },

  /* Icons and Images */

  subicon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
});

export default Checkout;