This project is a react-native spin off version of (https://github.com/simonbates/c2lc-react)

## Required Tools
Expo Cli - https://docs.expo.io/versions/latest/workflow/expo-cli/  
Xcode - https://apps.apple.com/us/app/xcode/id497799835?mt=12 for iOS  
Android - https://developer.android.com/studio for Android  

## Set up

Assuming node is installed on your machine, move to root direcotry of the project. Expo-cli tool is required to run any expo commands.

### `npm install`

Downloads all support modules to run the code.

### `expo start --web`

This command will run the application on a web browser. 

### `expo start --ios`

This command requires Xcode and will run the application on iOS simulator on Expo Application.

### `expo start --android`

This command requires Android Studio and will run the application on Android simulator.

### `expo eject`

Run this command if you want to use more of the native packages than using Expo modules. 

## To run the application on iOS simulator without using the Expo application

Run expo build:ios -t simulator then it will prompt a link where you can download tarball of the application. Once you download the tarball, run tar -xvzf filename. After that run an iOS simulator then run xcrun simctl install booted <app path> and xcrun simctl install booted <app path>.

Refer to https://docs.expo.io/versions/latest/distribution/building-standalone-apps/ #5