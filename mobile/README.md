# Product Review Mobile App

React Native mobile application for the Product Review system.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure API URL in `config/api.js`:
   - For Android emulator: `http://10.0.2.2:8080`
   - For physical device on same network: `http://YOUR_COMPUTER_IP:8080`
   - For Expo Go: `http://localhost:8080` (if using tunnel)

3. Start the backend server first (see backend README)

4. Run the app:
```bash
npm start
```

Then press `a` for Android or `i` for iOS.

## Building APK

To build an APK for Android:

1. Install Expo CLI globally (if not already):
```bash
npm install -g expo-cli
```

2. Build APK:
```bash
npx expo build:android -t apk
```

Or use EAS Build (recommended):
```bash
npm install -g eas-cli
eas login
eas build:configure
eas build --platform android --profile preview
```

## Development

- The app uses React Navigation for screen navigation
- Axios is used for API calls
- All screens are in the `screens/` directory
- API configuration is in `config/api.js`
