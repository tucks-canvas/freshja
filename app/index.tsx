import React, { useState, useEffect, useRef } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Tabs from './(tabs)/_layout';

const Stack = createStackNavigator();

const Index = () => {

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
};

export default Index;
