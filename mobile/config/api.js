// API Configuration
// This file automatically detects the environment and sets the correct API base URL
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// ============================================================================
// CONFIGURATION INSTRUCTIONS:
// ============================================================================
// 
// For Android Emulator (default): No changes needed - uses 10.0.2.2:8080
// 
// For Physical Device (Expo Go): 
//   1. Find your computer's IP: Windows (ipconfig) or Mac/Linux (ifconfig)
//   2. Replace 'YOUR_COMPUTER_IP' below with your actual IP (e.g., '192.168.1.100')
//   3. Make sure phone and computer are on same Wi-Fi network
//
// For Production APK:
//   1. Update app.json: Set "extra.apiUrl" to your production backend URL
//   2. Rebuild APK: eas build --platform android --profile production
//
// ============================================================================

// Manual override for physical device testing (Expo Go)
// Set this to your computer's LAN IP address when testing on a physical device
const PHYSICAL_DEVICE_IP = '192.168.1.20'; // Your computer's IP address

// Determine API base URL based on environment
const getApiBaseUrl = () => {
  // PRIORITY 1: For production builds (APK), use URL from app.json
  // This takes precedence over everything else in production
  if (!__DEV__ && Constants.expoConfig?.extra?.apiUrl) {
    const prodUrl = Constants.expoConfig.extra.apiUrl;
    if (prodUrl && !prodUrl.includes('YOUR_PRODUCTION') && !prodUrl.includes('YOUR_')) {
      return prodUrl;
    }
  }
  
  // PRIORITY 2: If PHYSICAL_DEVICE_IP is configured, ALWAYS use it in development
  // This ensures Expo Go on physical devices works correctly
  // Check this BEFORE emulator detection to avoid conflicts
  if (__DEV__ && PHYSICAL_DEVICE_IP && !PHYSICAL_DEVICE_IP.includes('YOUR_') && !PHYSICAL_DEVICE_IP.includes('YOUR_COMPUTER')) {
    return `http://${PHYSICAL_DEVICE_IP}:8080`;
  }
  
  // PRIORITY 3: Check if running on emulator/simulator (for development)
  // This works for both Expo Go and APK in emulator
  const isEmulator = !Constants.isDevice;
  
  if (isEmulator) {
    if (Platform.OS === 'android') {
      // Android Emulator: Use special IP that maps to host machine's localhost
      // Works for both Expo Go and APK in emulator
      return 'http://10.0.2.2:8080';
    } else if (Platform.OS === 'ios') {
      // iOS Simulator can use localhost (Mac only)
      return 'http://localhost:8080';
    }
  }
  
  // PRIORITY 4: For production APK on physical device
  // If app.json apiUrl is not set, try to use PHYSICAL_DEVICE_IP as fallback
  // (This is useful if building APK for testing on same network)
  if (!__DEV__ && PHYSICAL_DEVICE_IP && !PHYSICAL_DEVICE_IP.includes('YOUR_') && !PHYSICAL_DEVICE_IP.includes('YOUR_COMPUTER')) {
    console.warn('⚠️  Using PHYSICAL_DEVICE_IP in production. Set app.json extra.apiUrl for production backend.');
    return `http://${PHYSICAL_DEVICE_IP}:8080`;
  }
  
  // Final fallback
  console.warn('⚠️  Using localhost fallback. If on physical device, set PHYSICAL_DEVICE_IP in mobile/config/api.js');
  return 'http://localhost:8080';
};

export const API_BASE_URL = getApiBaseUrl();

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  REVIEWS: '/api/reviews',
};

// Log the API URL in development for debugging
if (__DEV__) {
  console.log('API Base URL:', API_BASE_URL);
}


