import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ProductListScreen from './screens/ProductListScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import AddReviewScreen from './screens/AddReviewScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <Stack.Navigator
          initialRouteName="ProductList"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#6200ee',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen 
            name="ProductList" 
            component={ProductListScreen}
            options={{ title: 'Products' }}
          />
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetailScreen}
            options={{ title: 'Product Details' }}
          />
          <Stack.Screen 
            name="AddReview" 
            component={AddReviewScreen}
            options={{ title: 'Add Review' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}


