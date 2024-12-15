import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Image } from 'react-native';

// Import Tabs
import Home from './home';
import Like from './like';
import Cart from './cart';
import Profile from './profile';


// Import Images, Icons, and Colors
import { icons, images } from '../../constants';
import colors from '../../constants/colors';

const Tab = createBottomTabNavigator();

const TabIcon = ({ source, focused }) => (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Image
        source={source}
        style={{
          width: focused ? 23 : 20,
          height: focused ? 23 : 20,
          top: 20,
          backgroundColor: 'transparent',
          tintColor: focused ? 'rgba(0, 0, 0, 1)' : 'rgba(0, 0, 0, 0.3)',
        }}
      />
    </View>
);

const Tabs = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: 'rgba(255, 255, 255, 255)',
            position: 'absolute',
            height: '10%',
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            borderColor: 'transparent',
            elevation: 50,
            shadowColor: 'rgba(0, 0, 0, 0.4)',
        },
        tabBarIcon: ({ focused }) => {
          let iconSource;
          switch (route.name) {
            case 'Home':
              iconSource = icons.home;
              break;
            case 'Like':
              iconSource = icons.like;
              break;
            case 'Cart':
              iconSource = icons.cart;
              break;
            case 'Profile':
              iconSource = icons.profile;
              break;
            default:
              iconSource = icons.home;
          }
          return <TabIcon source={iconSource} focused={focused} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Like" component={Like} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default Tabs;
