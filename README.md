# pwa-vue-capacitor

PWA test app with [Capacitor](https://capacitorjs.com) installed, based on Vue CLI project (can also be built for Android/iOS)

App utilizes a few basic Capacitor plugins & Firebase push notifications for web & mobile apps

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Capacitor configuration

1. Make own copies of `capacitor.config.json`, `src/firebase-messaging-sw.js` &
   `src/firebase.config.example.js` from example files placed beside them

2. Sign into Firebase with your Google account & create a new project (more info
   [here](https://firebase.google.com/docs/web/setup)) & copy credentials into `src/firebase-messaging-sw.js` &
   `src/firebase.config.example.js`
  - Firebase CLI will not be needed in here → skip this step

3. Run `yarn cap update` after filling the `capacitor.config.json` with your data

4. In order to PWA to work with service workers you need to build the app and not just serve it in
   dev environment
   - run `yarn build` to build the web app
   - run an HTTP server from `dist` directory inside of the project, for instance `python` has its
     own built-in HTTP server
     ```
     cd dist
     python -m http.server
     ```
     which would serve the content on 8000 port
   - in order to expose the app to the public use a tool like `ngrok`

5. In order to build the project for Android launch

```
yarn cap open android
```

This will open Android Studio with the project, you will need Android SDK Tools 26.0.1+ & Android
SDK Platform 21+
   - add Android app to Firebase project and download `google-services.json`
   - place `google-services.json` file in `android/app` directory
   - run `yarn build` to build the web app
   - run `yarn cap copy` to copy dist content to the Gradle project
   - app may require changing its ID & `MainActivity.java` location in order to function properly
   - run/debug app in Android studio (both emulator & connected devices should work)

6. In order to build the project for iOS launch

```
yarn cap open ios
```
This will open Xcode with the project, you will need Xcode 11+ & CocoaPods (more info
[here](https://firebase.google.com/docs/web/setup))
   - add iOS app to Firebase project and download `GoogleService-Info.plist`
   - place `GoogleService-Info.plist` file in root of Xcode project
   - run `yarn build` to build the web app
   - run `yarn cap copy` to copy dist content to the Xcode project
   - set `Push Notifications` to `ON` in `Capabilities` tab (push notifications may require paid
     developer account & a physical device)
   - run the project 

More info on push notifications configuration [here](https://capacitorjs.com/docs/apis/push-notifications)

More info on iOS Capacitor setup [here](https://capacitorjs.com/docs/ios)

7. In order to test the push notifications you can send a test notification from Firebase
   - run the application
   - click `Push notifications request` button
   - debug console will show `Token: XXXXXX....XXX` string if the configuration was successful → copy that into the clipboard
   - go to `Grow` > `Cloud Messaging` in Firebase console
   - click on `New Notification` and fill at least the `Notification text`
   - click `Send test message` button on the right, paste your token inside the input field, click
     the plus sign & `Test` button afterwards
   - the notification should appear shortly on your device
