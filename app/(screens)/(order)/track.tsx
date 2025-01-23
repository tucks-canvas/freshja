import React, { useState } from 'react';
import { useRouter } from 'expo-router';

// Import Supported Content
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const DeliveryTracking: React.FC = () => {
  
  const router = useRouter(); 

  const [showDetails, setShowDetails] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState({
    driverlocation: { latitude: 18.1096, longitude: -77.2975 },
    estimatedtime: '3-4 hours',
    orderStatus: 'Your order is on the way!',
  });

  return (
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

      <View style={styles.statuscard}>
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
            router.push('/');
          }}
        >
          <Text style={styles.buttonsub}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  map: {
    flex: 1,
  },

  statuscard: {
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
    fontWeight: 'bold',
    marginBottom: 10,
  },

  timetext: {
    fontSize: 16,
    color: '#666',
  },

  progressbar: {
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginVertical: 15,
  },

  progress: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 2,
    width: '60%',
  },

  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  button1: {
    backgroundColor: '#e3f4ed',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },

  buttontext: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },

  buttonsub: {
    color: '#147600',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DeliveryTracking;
