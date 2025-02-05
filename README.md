# 🎓 Scholarship Management System (ScholarMS)

## 📌 Project Overview

ScholarMS is a **comprehensive scholarship management platform** designed to streamline the scholarship search and application process. Users can browse scholarships, apply for them, and track their applications in real time. The platform supports **role-based access** for users, moderators, and admins, enabling efficient scholarship management.

---

## [🚀 Visit The Site](https://scholarms.netlify.app)

---

## 🛠️ Technologies Used

### **Frontend:**

- **React.js** – Component-based UI development
- **React Router DOM** – Client-side routing
- **Tailwind CSS & DaisyUI** – Modern UI design
- **Framer Motion & Lottie React** – Smooth animations

### **Backend & Database:**

- **Node.js & Express.js** – Backend framework & API development
- **MongoDB** – NoSQL database for storing application data

### **Authentication & Security:**

- **Firebase Authentication** – Secure user login
- **JWT (JSON Web Tokens)** – Role-based authentication

### **Other Key Technologies:**

- **TanStack Query** – Efficient data fetching & caching
- **Stripe** – Secure payment processing
- **Axios** – API requests handling
- **dotenv & Cors** – Environment variables & security

---

## ✨ Core Features

### **User Interface**

- Fully responsive and optimized for mobile, tablet, and desktop.
- Smooth navigation with React Router.
- Dynamic, interactive components for an engaging user experience.

### **User Authentication**

- Secure login and registration system powered by Firebase Authentication.
- Role-based access control for different user types (users, admins, and moderators).

### **Scholarship Discovery**

- Browse available scholarships with powerful search and filter options.
- Display detailed scholarship information including eligibility, deadlines, and application process.

### **Application Process**

- Users can apply for scholarships directly from the website.
- Real-time updates of the application status, with notifications for success or failure.

### **Admin/Moderator Panel**

- Admins and moderators can create, update, and delete scholarships.
- Manage and review applications, with options to approve or reject them.

### **Real-Time Data Management**

- Utilizes TanStack Query for fetching data, real-time synchronization, and caching to ensure a smooth user experience.

### **Payment Gateway Integration**

- Secure payment processing for scholarship application fees through Stripe.

### **Responsive Design & UX**

- Tailwind CSS and DaisyUI provide a modern, clean, and responsive design.
- Framer Motion and Lottie animations for enhanced interactivity and smooth transitions.

### **Authentication & Authorization**

- Secure user login and registration powered by Firebase Authentication.
- JWT-based authentication to protect private routes and secure user sessions.

### **User Management**

- Different user roles: Users, Moderators, and Admins.
- Users can view and apply for scholarships, and view their application history.
- Admins and Moderators have the ability to manage scholarship data, user roles, and applications.

### **Scholarship Management**

- Admins can create, update, and delete scholarship opportunities.
- Scholarship data is stored in MongoDB and can be easily accessed and filtered.

### **Application Management**

- Users can apply for scholarships directly from the platform.
- Admins and Moderators can approve, reject, or view application statuses.

### **Review System**

- Moderators and Admins can review and approve/reject scholarship applications.

### **Real-time Updates**

- Uses **TanStack Query** to handle API data fetching, caching, and updates in real-time.
- Application status updates reflect immediately on the user interface.

### **Database Integration**

- MongoDB is used for storing all user, scholarship, and application data.
- Efficient API calls to fetch, create, update, and delete records.

### **Stripe Integration**

- Payment gateway integration for any scholarship fees (if applicable) using Stripe.

---

## 📦 Dependencies

- **tailwindcss**: Utility-first CSS framework for designing responsive user interfaces.
- **daisyui**: A component library built on top of Tailwind CSS for fast UI development.
- **@stripe/react-stripe-js**: React library to integrate Stripe for payment processing.
- **@tanstack/react-query**: For efficient data fetching, caching, and state management.
- **framer-motion**: Powerful library for creating animations and smooth transitions.
- **lottie-react**: To integrate Lottie JSON animations into the app.
- **react-router-dom**: For routing and navigation between different pages in the app.
- **axios**: Promise-based HTTP client for making API requests.
- **firebase**: To integrate Firebase Authentication and real-time database features.
- **react-hook-form**: For handling forms and form validation.
- **react-icons**: Easy-to-use icon library to enhance the user interface.
- **react-hot-toast**: A library for displaying sleek toast notifications and alerts.
- **react-tooltip**: Tooltip library for showing helpful information when users hover over elements.
- **swiper**: Library for creating interactive carousels and sliders.
- **react-countup**: For creating animated counters.
- **react-datepicker**: For selecting dates easily in forms.
- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **dotenv**: Loads environment variables from a `.env` file.
- **mongodb**: MongoDB driver to interact with the database.
- **jsonwebtoken**: Library to create and verify JWT tokens for authentication.
- **stripe**: Stripe API integration for handling payments.
- **cors**: Middleware to handle CORS (Cross-Origin Resource Sharing).

---

## 🛠️ How to Run the Project Locally

To get this project up and running on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/programmershakib1/scholarms.git
   cd scholarms
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env.local` file in the root directory.
   - Add the necessary variables for Firebase, imgbb api key, stripe public api key.

4. Start the project:

   ```bash
   npm run dev
   ```

---

Thank you for Exploring the Scholarship Manage System (ScholarMS)! 🚀
