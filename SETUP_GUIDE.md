# 🚀 Setup Guide - Product Review Application

Complete step-by-step guide to set up and run the Product Review Application from scratch.

---

## 📋 Prerequisites

Before starting, ensure you have the following installed:

- **Java 17 or higher** - [Download Java](https://adoptium.net/)
- **Maven 3.6+** - [Download Maven](https://maven.apache.org/download.cgi)
- **Node.js 16+ and npm** - [Download Node.js](https://nodejs.org/)
- **Git** - [Download Git](https://git-scm.com/downloads)
- **Android Studio** (for Android emulator) - [Download Android Studio](https://developer.android.com/studio)
- **(Optional) Expo Go app** on your mobile device - [iOS](https://apps.apple.com/app/expo-go/id982107779) | [Android](https://play.google.com/store/apps/details?id=host.exp.exponent)

---

## 🏗️ Project Structure

```
product-review-application/
├── backend/          # Spring Boot REST API
│   ├── src/
│   ├── pom.xml
│   └── README.md
├── mobile/           # React Native application
│   ├── screens/
│   ├── services/
│   ├── config/
│   ├── package.json
│   └── README.md
└── README.md         # Project overview
```

---

## ⚙️ Step 1: Backend Setup

### 1.1 Verify Prerequisites

Check if Java and Maven are installed:

```bash
java -version    # Should show Java 17 or higher
mvn --version    # Should show Maven 3.6 or higher
```

### 1.2 Navigate to Backend Directory

```bash
cd backend
```

### 1.3 Build the Project

```bash
mvn clean install
```

This will download all dependencies and compile the project. First build may take 2-5 minutes.

### 1.4 Run the Backend Server

```bash
mvn spring-boot:run
```

You should see output like:
```
Started ProductReviewApplication in X.XXX seconds
```

✅ **Backend is running at:** `http://localhost:8080`

### 1.5 Verify Backend is Running

Open your browser and navigate to:
```
http://localhost:8080/api/products
```

You should see a JSON response with product data. If you see JSON, the backend is working correctly!

**Keep this terminal window open** - the backend needs to keep running.

---

## 📱 Step 2: Mobile Application Setup

### 2.1 Open a New Terminal Window

Keep the backend terminal running, open a new terminal window/tab.

### 2.2 Navigate to Mobile Directory

```bash
cd mobile
```

### 2.3 Install Dependencies

```bash
npm install
```

This will install all required packages. First installation may take 2-5 minutes.

### 2.4 Configure API URL

Edit the file `mobile/config/api.js` and set the API URL based on how you want to run the app:

**Option A: Android Emulator**
```javascript
export const API_BASE_URL = 'http://10.0.2.2:8080';
```

**Option B: Expo Go (Physical Device)**
```javascript
export const API_BASE_URL = 'http://YOUR_COMPUTER_IP:8080';
```

To find your computer's IP address:
- **Windows:** Run `ipconfig` and look for "IPv4 Address" under "Wireless LAN adapter Wi-Fi"
- **Mac/Linux:** Run `ifconfig` or `ip addr` and look for your network interface IP

**Important:** For Expo Go, your phone and computer must be on the same Wi-Fi network.

### 2.5 Start the Development Server

```bash
npm start
```

You should see:
- A QR code in the terminal
- Options to press keys (a for Android, i for iOS, etc.)

---

## 🎯 Step 3: Run the Mobile App

You have three options to run the mobile app:

### Option 1: Android Emulator (Recommended for Development)

1. **Open Android Studio**
2. **Start an emulator:**
   - Click on "Device Manager" (or AVD Manager)
   - Click the play button next to an emulator (or create one if you don't have any)
   - Wait for the emulator to start (may take 1-2 minutes)

3. **In the terminal where `npm start` is running, press `a`**

4. The app will automatically open in the emulator! ✅

### Option 2: Expo Go on Physical Device

1. **Install Expo Go app** on your phone:
   - [iOS App Store](https://apps.apple.com/app/expo-go/id982107779)
   - [Google Play Store](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Make sure your phone and computer are on the same Wi-Fi network**

3. **In the terminal where `npm start` is running, you'll see a QR code**

4. **Open Expo Go app** on your phone and scan the QR code

5. The app will load on your phone! ✅

### Option 3: iOS Simulator (Mac only)

1. **Make sure Xcode is installed**

2. **In the terminal where `npm start` is running, press `i`**

3. The app will open in the iOS simulator! ✅

---

## 🧪 Step 4: Test the Application

Once the app is running, you should be able to:

1. **View Product List** - See a list of products with prices and ratings
2. **View Product Details** - Tap on any product to see details and reviews
3. **Add a Review** - Tap "Add Review" button, fill the form, and submit
4. **See Reviews** - View all reviews for a product

---

## 📦 Step 5: Build APK (Optional)

If you want to create an APK file for Android:

### Using EAS Build (Recommended)

1. **Install EAS CLI:**
```bash
npm install -g eas-cli
```

2. **Login to Expo (create free account if needed):**
```bash
eas login
```

3. **Configure build (first time only):**
```bash
eas build:configure
```

4. **Build APK:**
```bash
eas build --platform android --profile preview
```

5. **Wait for build to complete** (5-10 minutes)

6. **Download the APK** from the provided link

7. **Install on device or emulator:**
   - **Emulator:** Drag and drop the APK file onto the emulator window
   - **Physical device:** Transfer APK to device and install

---

## 🔧 Troubleshooting

### Backend Issues

**Problem: "mvn: command not found"**
- **Solution:** Install Maven and add it to your PATH
- Windows: Add Maven `bin` folder to System Environment Variables → Path
- Mac/Linux: Install via homebrew (`brew install maven`) or download from Apache

**Problem: "java: command not found"**
- **Solution:** Install Java 17+ and verify with `java -version`

**Problem: Port 8080 already in use**
- **Solution:** 
  - Stop the application using port 8080
  - Or change the port in `backend/src/main/resources/application.properties`: `server.port=8081`

**Problem: Backend starts but API returns 404**
- **Solution:** Make sure you're accessing `http://localhost:8080/api/products` (with `/api` prefix)

### Mobile App Issues

**Problem: "npm: command not found"**
- **Solution:** Install Node.js from nodejs.org

**Problem: "Cannot connect to backend"**
- **Solution:** 
  - Verify backend is running (`http://localhost:8080/api/products`)
  - Check API URL in `mobile/config/api.js`
  - For emulator: Use `http://10.0.2.2:8080`
  - For Expo Go: Use your computer's IP address (both devices on same Wi-Fi)

**Problem: Expo Go shows "Project is incompatible with this version of Expo Go"**
- **Solution:** The project uses Expo SDK 54. Make sure your Expo Go app is up to date. If the issue persists, update the project's Expo version or use an emulator.

**Problem: Build errors or dependency conflicts**
- **Solution:**
```bash
cd mobile
rm -rf node_modules package-lock.json
npm install
```

**Problem: Emulator not starting**
- **Solution:**
  - Open Android Studio → AVD Manager
  - Create a new virtual device if you don't have one
  - Make sure you have enough disk space (emulators need ~2GB)

---

## 📚 Additional Resources

### API Documentation

The backend provides the following endpoints:

**Products:**
- `GET /api/products` - List all products (supports pagination, sorting, filtering)
- `GET /api/products/{id}` - Get product details with reviews

**Reviews:**
- `POST /api/reviews` - Create a new review
- `GET /api/reviews/product/{productId}` - Get reviews for a product

### Database

By default, the application uses H2 in-memory database. Data is reset when the backend restarts.

To access H2 Console:
- URL: `http://localhost:8080/h2-console`
- JDBC URL: `jdbc:h2:mem:productreviewdb`
- Username: `sa`
- Password: (leave empty)

### Project Configuration

- **Backend port:** 8080 (configurable in `application.properties`)
- **API base path:** `/api`
- **Database:** H2 (development), PostgreSQL (production - see `application.properties`)

---

## ✅ Quick Start Checklist

- [ ] Java 17+ installed and verified
- [ ] Maven installed and verified
- [ ] Node.js installed and verified
- [ ] Backend dependencies installed (`mvn clean install`)
- [ ] Backend server running (`mvn spring-boot:run`)
- [ ] Backend API accessible (`http://localhost:8080/api/products`)
- [ ] Mobile dependencies installed (`npm install`)
- [ ] API URL configured in `mobile/config/api.js`
- [ ] Mobile development server running (`npm start`)
- [ ] App running on emulator or device
- [ ] Can view products, details, and add reviews

---

## 🎓 Next Steps

Once the application is running:

1. Explore the codebase structure
2. Try adding new features
3. Test on different devices/emulators
4. Build APK for distribution
5. Deploy backend to a cloud service (Heroku, AWS, etc.)

---

## 📝 Notes

- The backend uses an in-memory database by default. Data is lost when the server restarts.
- For production, configure PostgreSQL in `application.properties`
- CORS is enabled for all origins in development (configure for production)
- The mobile app uses Expo SDK 54

---

**Need help?** Check the individual README files in `backend/README.md` and `mobile/README.md` for more specific information.

