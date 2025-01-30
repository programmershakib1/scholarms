# Scholarship Management System (ScholarMS)

## Purpose

ScholarMS is a comprehensive platform that simplifies the scholarship application process. It allows users to search for universities and scholarships, apply for scholarships, and manage their applications. Additionally, it provides a review system for applications. It supports various user roles, such as users, moderators, and admins, each with specific permissions and access to the platform’s features.

---

## [Visit The Site](https://assignment-12-batch-10.netlify.app)

---

## Key Features

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

---

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **React Router DOM**: For managing navigation and routing in the app.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **DaisyUI**: Component library for building beautiful UI with Tailwind CSS.
- **TanStack Query**: For fetching, caching, and managing data from the server.
- **Stripe**: For handling payment processes related to scholarship applications.
- **Framer Motion**: For animations and transitions to enhance the user experience.
- **Lottie React**: To integrate Lottie animations for a more engaging UI.
- **React Hook Form**: To manage form state and validation in a simple, easy-to-use manner.
- **React Icons**: For adding icons to improve UI and UX.
- **React Hot Toast**: For displaying notifications and alerts.

---

## NPM Packages Used

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

   - Create a `.env.local` file in the root directory.
   - Add the necessary variables for Firebase, imgbb api key, stripe public api key.

4. Start the project:

   ```bash
   npm run dev
   ```

---

Thank you for Exploring the Scholarship Manage System (ScholarMS)! 🚀
