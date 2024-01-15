# [mini-loan-app2](https://mini-loan-app2-deployed.vercel.app/)
Deployment link: [https://mini-loan-app2-deployed.vercel.app/](https://mini-loan-app2-deployed.vercel.app/)
It is an app that allows authenticated users to go through a loan application. It doesn’t have to contain too many fields, but at least “amount required” and “loan term.” All the loans will have a “weekly” repayment frequency. After the loan is approved, the user should be able to submit the weekly loan repayments. 

[YOUTUBE LINK](https://youtu.be/YzI-uuQYPaQ)



https://github.com/Indiana-S-coder/mini-loan-app2/assets/79374195/d344ea9b-d90e-4c70-b63f-4da8965123f2

## Features
**User Authentication**: Implemented user authentication using JWT (JSON Web Tokens) and localstorage, ensuring that only authenticated users can access and utilize the loan application features.

**Role-Based Access Control**: Designed and implemented role-based access control (RBAC) to distinguish between regular users and administrators. Admins can only change loan status.

**Admin Functionality**: Created an admin dashboard with the capability to view and manage loan applications, change loan statuses, and make informed decisions.

**API Integratio**: Interfaced with backend APIs for handling user authentication, loan application submission, and admin functionalities, ensuring seamless communication between the frontend and backend.

## Technologies used
MERN( MongoDB, Express, React, Nodejs), tailwindCSS, JWT authentication, Axios

## Getting started

To run on your local machine:

Clone the repository
`git clone "https://github.com/Indiana-S-coder/mini-loan-app2.git"`

install packages on both frontend and backend 
`cd frontend`
`npm i`

`cd backend`
`npm i`

Create .env file in backend folder and declare the following environment variables
```
MONGO_URL: "mongodb url to connect to database"
TOKEN_KEY: "you can create it using crypto or enter some random large string "
PORT: "4000 or other"
```
Run `npm run dev` in frontend then run `npm run dev` in backend

your app will run on `http://localhost:5173/`

### Admin Credentials
**email**: admin@gmail.com
**password**: password





