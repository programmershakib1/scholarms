# Scholarship Management System (ScholarMS)

## Purpose

ScholarMS is a comprehensive platform that simplifies the scholarship application process. It allows users to search for universities and scholarships, apply for scholarships, and manage their applications. Additionally, it provides a review system for applications. It supports various user roles, such as users, moderators, and admins, each with specific permissions and access to the platform’s features.

---

## [Visit The Site](https://assignment-12-batch-10.netlify.app)

---

## Key Features

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

## Technologies Used

- **Node.js**: The server-side runtime environment.
- **Express.js**: Fast and minimal web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing scholarship data, user information, and applications.
- **JWT (JSON Web Tokens)**: For secure user authentication and protecting private routes.
- **Firebase**: Used for user authentication and real-time database management.
- **Stripe**: Integrated for handling payments if there are any fees associated with applications.
- **dotenv**: For managing environment variables securely.
- **Cors**: For handling cross-origin resource sharing and securing API requests.
- **axios**: For making HTTP requests to interact with external APIs and services.
- **TanStack Query**: For handling data fetching, caching, and synchronization.

---

## NPM Packages Used

- **express**: Fast, unopinionated, minimalist web framework for Node.js.
- **dotenv**: Loads environment variables from a `.env` file.
- **mongodb**: MongoDB driver to interact with the database.
- **jsonwebtoken**: Library to create and verify JWT tokens for authentication.
- **stripe**: Stripe API integration for handling payments.
- **cors**: Middleware to handle CORS (Cross-Origin Resource Sharing).
- **axios**: Promise-based HTTP client for making requests to external APIs.
- **tanstack-query**: Data fetching and state management library to handle API calls effectively.

---

## Running the Project Locally

To get this project up and running on your local machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/username/project.git
   cd project
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Configure the environment variables:

   - Create a `.env` file in the root directory.
   - Add the necessary variables for MongoDB, JWT, stripe api key.

4. Start the server:

   ```bash
   node index.js
   ```

---

Thank you for Exploring the Scholarship Manage System (ScholarMS)! 🚀
