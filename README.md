<div align="center">
	<h1>GoBarber Mobile 💈</h1>
</div>

GoBarber Mobile Application to manage barbershop scheduling, developed copying the instructor coding during the [Rocketseat's](https://rocketseat.com.br) GoStack Course.

See the app on GooglePlay Store:

<div align="center" style="margin-bottom:40px">
  <a href="https://play.google.com/store/apps/details?id=dev.danielbackes.gobarber">
    <img alt="GoBarber android app" width="70px" src="readme/google-play-icon.svg"/>
  </a>
</div>

## 📱 Features
- Sign Up
- Password recovery
- Sign In
- Profile update
- Book appointment with hairdresser
- View appointments
- View app detail

<div align="center">
	<img src="readme/movie.gif" alt="mobile" style="max-width:100%"/>
</div>

## 🧰 Main languages and libraries

![Github top language](https://img.shields.io/github/languages/top/danielbackes/rocketseat-gobarber-api?style=for-the-badge)

![Github version lib](https://img.shields.io/github/package-json/dependency-version/danielbackes/rocketseat-gobarber-web/react?style=for-the-badge)
![Fixed lib](https://img.shields.io/badge/React_Native-0.63.2-blue?style=for-the-badge)
![Fixed lib](https://img.shields.io/badge/Styled_Components-^5.2.0-blue?style=for-the-badge)

## 🚀 Publishing

AppCenter Platform is being used to deploy and deliver the app on Google Play. See the status:

[![Build status](https://build.appcenter.ms/v0.1/apps/13b0a876-bb4d-44a7-9814-b60751c21e66/branches/master/badge)](https://appcenter.ms)

## ⚙️ Setup

1. Environment: [Install android emulator](https://react-native.rocketseat.dev)

2. Project
```
# clone this repo
$ git clone https://github.com/danielbackes/rocketseat-gobarber-mobile.git

# go to project folder
$ cd rocketseat-gobarber-mobile

# install dependencies
$ yarn install

# Config API address on src/services/api.ts

# Launching android emulator and install the app
$ yarn android

# Start React Native watcher
$ yarn start
```

## 📖 Main concepts that I learned in this project
  - Use react navigation, recovery route params, create stack, tab and drawer navigation.
  - Mobile application has Pixel Density concept, that need to each image 3 image with different resolution. The 1x image, named as <image-name>.png; the 2x image, named <image-name>@2x.png and the 3x image, named as <image-name>@3x.png. The Image component, from react-native, will choose the image that will be used depending on the smartphone density.
  - Use external fonts and how use icons.
  - There is the react-native-iphone-x-helper library to help create styles that better fit to IOS. Also exists the Platform component, inside of react-native library, that help create styles to each mobile platform.
  - React-native library has the KeyboardAvoidingView component to surround the components that should't be overlapping by the keyboard when it is shown.
  - Known some attributes and functions of the TextInput: KeyboardType, AutoCorrect, AutoCapitalize, ReturnKeyType, OnSubmitEdition.
  - UseImperativeHandle hook provides a way to change the ref object created by a father component inside a child component.
  - Learn how use the react-native-image-picker library to create an image selector, that allow select an image from the gallery or take photo with the camera.
  - Configure the jest library to execute test.
  - Configure Icon and Splash image.
  - Generate keystore and build Android App Bundle.
  - Create an app on Google Play Store.
  - Config the AppCenter Platform to deploy and deliver the app on Google Play.
