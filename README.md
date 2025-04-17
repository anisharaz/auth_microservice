# Auth Microservice

This project is an authentication microservice built using [Auth.js](https://authjs.dev/) with JWT-based session management. It provides a robust authentication microservice solution for your applications.

## Features
- JWT-based session management
- Email-based signup and login
- Social login support
- Modular and reusable components
- Built with Next.js and Auth.js

## The main idea of how it works.
Jwt is stored in cookies. Imagine your application lives on `example.com` and your auth microservice lives on `auth.example.com`. When a user logs in by going to `auth.example.com`, the auth microservice will set a cookie with the jwt token. The cookie will be set for the domain `.example.com`, which make the cookies accessible from any sub-domain of `.example.com`. Now your application on your domain will have access to the auth cookies which `auth.example.com` set after authenticating the user. In this way your application can access the cookies and determine if the user is logged in or not.

## Login Flow 
![diagram-export-4-17-2025-2_58_39-PM](https://github.com/user-attachments/assets/92c8ca9c-a40b-439b-b4c6-462ae8eb371d)

