# NodeJS Authentication System

## Overview
### This Project can be used to Bootstrap complex NodeJs projects which generally include Authentication using email and Google-Oauth

## Features
1. Sign Up using Email
2. Sign In using Email
3. Google login/Signup
4. Reset Password
5. Password Encryption while storing in Database
6. Flash Notifications
7. Google reCAPTCHA v3

## Setting up the Application
1. Replace **SITE-KEY** in `assets/js/captcha.js`, `views/user_sign_ip.ejs` and `user_sign_up.ejs` with the actual captcha site key which can be obtained from Google recaptcha [Admin console](https://www.google.com/recaptcha/intro/v3.html)
2. Similarly replace **SECRET-KEY** in `controllers/users_controller.js` with the actual captcha secret key
3. Replace **clientID** and **clientSecret** in `config/passport-google-oauth2-strategy.js` with actual values from [Google API Console](https://console.developers.google.com/apis/dashboard?project=nodejs-authentication-281706)

## Run the application
1. Clone or download the project as zip file.
2. Open New terminal and enter the command `npm install`
3. Start the application using `npm start`
4. Access it at *localhost:8000/*
