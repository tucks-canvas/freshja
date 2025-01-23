import React from 'react';
import { useRouter } from 'expo-router';

// Import Supported Content
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

// Import Icons and Images
import { icons, images } from '../../../constants';

const PaymentSuccess = () => {
  
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/track'); 
  };

  return (
    <View style={styles.container}>
      <Image 
        source={icons.checkmark} 
        style={styles.checkmark} 
      />

      <Text style={styles.header}>Payment Successful!</Text>
      <Text style={styles.message}>Thank you for your purchase. Your order will be processed soon.</Text>
      
      <TouchableOpacity 
        style={styles.button} 
        onPress={handleGoHome}
      >
        <Text style={styles.buttontext}>Track My Order</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  checkmark: {
    width: 50, 
    height: 50, 
    marginBottom: 20,
  },
  
  header: {
    fontSize: 24,
    fontFamily: 'Nunito-Bold',
    marginBottom: 20,
  },
  
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
  },
  
  buttontext: {
    color: '#fff',
    fontSize: 18,
  },
});

export default PaymentSuccess;
