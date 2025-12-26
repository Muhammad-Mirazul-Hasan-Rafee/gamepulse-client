# 🎮 GamePulse — Frontend (React)

A modern, interactive game review platform where users can create, manage, and explore reviews with a dynamic UI, smooth animations, secure authentication, and real-time features.
Built for performance, clarity, and an engaging user experience.



## ✨ Core Features

### 🎨 **Beautiful Custom UI**

* Designed with **Tailwind CSS**, **DaisyUI**, and **Framer Motion**.
* Includes a **3D chopper model** (Three.js/React Three Fiber) for a more visually striking experience.
* Fully responsive layout optimized for all devices.



### 🔐 **Secure User Authentication**

* Firebase authentication (Email/Password, Google.).
* Login/logout managed through **Context API**.
* Password validation rules ensure safe account creation.



### 🚧 **Protected User Experience**

* Private routes implemented for authenticated-only pages.
* Restricts review creation/editing to logged-in users.



### 🛠 **Full CRUD Functionality**

Users can:

* Create reviews
* Read all reviews
* Update their own reviews
* Delete their reviews

All powered by a clean REST API connected to MongoDB.



### ❤️ **Real-Time Like System**

* Integrated like/unlike button with smooth UI interaction.
* **React Query** used for instant cache updates and background revalidation.
* “See More / See Less” functionality for long review descriptions.



### 🧩 **Profile Section**

A lightweight profile screen showing:

* User info
* User-created reviews
* Account management options



### 🗄 **MongoDB Integration**

* Reviews fetched from a Node/Express backend connected to MongoDB Atlas.
* Real-time updates reflected immediately in UI.



### 🔒 **Environment Variable Safety**

* `.env` used for Firebase keys and API endpoints.
* Prevents leakage of sensitive credentials.



## 📁 Project Structure


/src
 ├── components/
 ├── pages/
 ├── hooks/
 ├── context/
 ├── routes/
 ├── api/
 ├── assets/
 ├── App.jsx
 └── main.jsx




## 🚀 Tech Stack

| Technology                    | Purpose                        |
| ----------------------------- | ------------------------------ |
| **React**                     | Frontend framework             |
| **React Router**              | Routing & private routing      |
| **React Query**               | Real-time cache & server state |
| **Tailwind CSS**              | Styling                        |
| **DaisyUI**                   | UI components                  |
| **Framer Motion**             | Animations                     |
| **Firebase Auth**             | Secure authentication          |
| **MongoDB (via backend API)** | Review storage                 |
| **dotenv**                    | Secure environment variables   |

---

## ▶ How to Run the Project

1. Clone the repository
2. Install dependencies:

   
   npm install
   
3. Create a `.env` file:

   
   VITE_apiKey=yourKey
   VITE_authDomain=...
   VITE_backend_url=http://localhost:8000
   
4. Start the development server:

   
   npm run dev
   



## 🌐 Live Demo

https://gamepulse-user.vercel.app



## 📌 Summary

The GamePulse frontend is built for usability, performance, and visual delight. With secure authentication, real-time updates, and a refined UI, it delivers a smooth review-sharing experience for gamers.