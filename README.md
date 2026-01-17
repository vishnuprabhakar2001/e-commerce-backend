E-Commerce Backend API
Project Overview

This project is a secure, backend-only E-Commerce API built using Node.js, Express, and MongoDB (Mongoose).
It provides all the necessary backend functionality for an e-commerce platform, including user authentication, product management, cart and order handling, categories, and role-based access control.

The API is designed to be consumed by a frontend (web/mobile) or tested using Postman.

Features
User Authentication & Authorization

User signup and login

JWT-based authentication with tokens stored in HTTP-only cookies

Role-based access control (Admin / User)

Product Management

CRUD operations for products (Admin only)

Product categories and filtering

Inventory management

Cart & Orders

Add products to cart

Update cart items

Place orders

Order status lifecycle (Pending, Shipped, Delivered, etc.)

API Security & Best Practices

Input validation using express-validator

Error handling with custom messages

Secure password storage using bcryptjs

CORS and cookie configuration for frontend integration

API Routes
Auth

POST /api/auth/register – Register a new user

POST /api/auth/login – Login user and return JWT in cookies

POST /api/auth/logout – Logout user (clear cookie)

Users

GET /api/users/me – Get current user profile

PUT /api/users/me – Update current user profile

Products

GET /api/products – Get all products

GET /api/products/:id – Get a product by ID

POST /api/products – Create product (Admin only)

PUT /api/products/:id – Update product (Admin only)

DELETE /api/products/:id – Delete product (Admin only)

Categories

GET /api/categories – Get all categories

POST /api/categories – Create category (Admin only)

PUT /api/categories/:id – Update category (Admin only)

DELETE /api/categories/:id – Delete category (Admin only)

Cart

GET /api/cart – Get current user’s cart

POST /api/cart – Add item to cart

PUT /api/cart/:id – Update item quantity

DELETE /api/cart/:id – Remove item from cart

Orders

GET /api/orders – Get all orders (Admin only)

GET /api/orders/me – Get current user’s orders

POST /api/orders – Place an order

PUT /api/orders/:id – Update order status (Admin only)

Technologies & Tools

Node.js – Server-side runtime

Express – Backend framework

MongoDB & Mongoose – Database & ORM

JWT & Cookies – Authentication & session management

bcryptjs – Password hashing

express-validator – Input validation

Postman – API testing

Getting Started

Clone the repository

Run npm install to install dependencies

Create a .env file with MONGO_URI and PORT

Run npm run dev to start the development server

Future Enhancements

Implement payment gateway simulation

Add wishlist functionality

Implement product reviews and ratings

Implement email notifications




Folder and File Structure

E-Commerce_Backend/
│
├─ .env                    # Environment variables (not pushed)
├─ .gitignore              # Ignored files (node_modules, .env, package-lock.json)
├─ package.json            # Node project configuration
├─ package-lock.json       # Installed dependencies
├─ README.md               # Project description (this file)
│
├─ src/                    # Source code
│   ├─ index.js            # Entry point (server setup)
│   ├─ app.js              # Express app configuration (middleware, routes)
│   │
│   ├─ config/             # Configuration files
│   │   └─ db.js           # MongoDB connection setup
│   │
│   ├─ controllers/        # Route handlers (logic for requests)
│   │   ├─ auth.controller.js
│   │   ├─ user.controller.js
│   │   ├─ product.controller.js
│   │   ├─ category.controller.js
│   │   ├─ cart.controller.js
│   │   └─ order.controller.js
│   │
│   ├─ services/           # Business logic / services
│   │   ├─ auth.service.js
│   │   ├─ user.service.js
│   │   ├─ product.service.js
│   │   ├─ category.service.js
│   │   ├─ cart.service.js
│   │   └─ order.service.js
│   │
│   ├─ middlewares/        # Custom middleware
│   │   ├─ auth.middleware.js       # JWT auth verification
│   │   ├─ role.middleware.js       # Role-based access control
│   │   ├─ async.middleware.js      # Async wrapper for controllers
│   │   └─ error.middleware.js      # Custom error handling
│   │
│   ├─ models/             # Mongoose schemas
│   │   ├─ user.model.js
│   │   ├─ product.model.js
│   │   ├─ category.model.js
│   │   ├─ cart.model.js
│   │   └─ order.model.js
│   │
│   ├─ routes/             # Express routes
│   │   ├─ auth.routes.js
│   │   ├─ user.routes.js
│   │   ├─ product.routes.js
│   │   ├─ category.routes.js
│   │   ├─ cart.routes.js
│   │   ├─ order.routes.js
│   │   └─ index.js         # Route aggregator
│   │
│   ├─ utils/              # Utility/helper functions
│   │   ├─ ApiError.js
│   │   ├─ ApiResponse.js
│   │   
│   │  
│   │
│   └─ validators/         # Input validation
│       ├─ auth.validator.js
│       ├─ product.validator.js
│       ├─ order.validator.js
│       └─ category.validator.js
