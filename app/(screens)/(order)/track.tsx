import React, { useState } from 'react';
import { useRouter } from 'expo-router';

/* Import React-Native Content */
import { View, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

/* Import Other Supported Content */
import MapView, { Marker } from 'react-native-maps';

/* Import Icons, Colors, and Images */
import {icons, images} from '@/constants';
import colors from '@/constants/colors';

const Track: React.FC = () => {  
  const router = useRouter(); 

  const [showDetails, setShowDetails] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState({
    driverlocation: { latitude: 18.1096, longitude: -77.2975 },
    estimatedtime: '3-4 hours',
    orderStatus: 'Your order is on the way!',
  });

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content"  />

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: deliveryStatus.driverlocation.latitude,
              longitude: deliveryStatus.driverlocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={deliveryStatus.driverlocation}
              title="Driver Location"
            />
          </MapView>

          <View style={styles.status}>
            <Text style={styles.statustext}>{deliveryStatus.orderStatus}</Text>
            <Text style={styles.timetext}>Estimated Arrival Time: {deliveryStatus.estimatedtime}</Text>
            
            <View style={styles.progressbar}>
              <View style={styles.progress} />
            </View>
            
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setShowDetails(!showDetails);
                router.push('/');
              }}
            >
              <Text style={styles.buttontext}>Show Delivery Details</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button1}
              onPress={() => {
                setShowDetails(!showDetails);
                router.push('../../(tabs)/home');
              }}
            >
              <Text style={styles.buttonsub}>Back to Home</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
  },

  map: {
    flex: 1,
  },

  /* Status */

  status: {
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: -2 
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  statustext: {
    fontSize: 18,
    fontFamily: 'Gilroy-Bold',
    marginBottom: 10,
  },

  timetext: {
    fontSize: 16,
    color: colors.grey,
    fontFamily: 'Gilroy-Bold',
  },

  /* Progress */

  progressbar: {
    height: 5,
    backgroundColor: colors.backdrop,
    borderRadius: 2,
    marginVertical: 15,
  },

  progress: {
    height: '100%',
    backgroundColor: colors.fresh,
    borderRadius: 2,
    width: '60%',
  },

  /* Add-Ons */

  button: {
    backgroundColor: colors.fresh,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  button1: {
    backgroundColor: colors.black,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttontext: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
  },

  buttonsub: {
    color: colors.white,
    fontSize: 16,
    fontFamily: 'Gilroy-Bold',
  },
});

export default Track;
