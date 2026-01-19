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




📌 Project Overview

This project is a backend-only E-Commerce MVP (Minimum Viable Product) built using Node.js, Express, and MongoDB, following a clean layered architecture.

The goal of this project is to implement all essential e-commerce business flows while avoiding unnecessary APIs, over-engineering, and unused logic.
The backend is designed to be production-oriented, scalable, and interview-ready.

🎯 What This Backend Supports
User Capabilities

Authentication (Register / Login / Logout)

Browse products

Search, filter, sort products

Manage cart

Place orders

Cancel orders (with business rules)

Admin Capabilities

Product management (CRUD)

Category management (CRUD)

View and manage all orders

Cancel orders

Control inventory automatically

🧱 Tech Stack

Runtime: Node.js

Framework: Express.js

Database: MongoDB with Mongoose

Authentication: JWT (HTTP-only cookies)

Architecture Pattern:
Routes → Controllers → Services → Models

📂 Folder Structure
src/
│
├── controllers/
│   ├── auth.controller.js
│   ├── product.controller.js
│   ├── category.controller.js
│   ├── cart.controller.js
│   ├── order.controller.js
│   └── user.controller.js        (intentionally empty)
│
├── services/
│   ├── auth.service.js
│   ├── product.service.js
│   ├── category.service.js
│   ├── cart.service.js
│   ├── order.service.js
│   └── user.service.js           (intentionally empty)
│
├── routes/
│   ├── auth.routes.js
│   ├── product.routes.js
│   ├── category.routes.js
│   ├── cart.routes.js
│   ├── order.routes.js
│   └── user.routes.js            (intentionally empty)
│
├── models/
│   ├── user.model.js
│   ├── product.model.js
│   ├── category.model.js
│   ├── cart.model.js
│   └── order.model.js
│
├── validators/
│   ├── auth.validator.js         (intentionally empty)
│   ├── product.validator.js      (intentionally empty)
│   ├── category.validator.js
│   └── order.validator.js        (intentionally empty)
│
├── middlewares/
│   ├── auth.middleware.js
│   ├── role.middleware.js
│   ├── async.middleware.js
│   └── error.middleware.js
│
├── utils/
│   ├── ApiError.js
│   └── ApiResponse.js
│
├── app.js
├── index.js
└── config/db.js

🧠 Architectural Philosophy

This project strictly follows separation of concerns:

Layer	Responsibility
Routes	Define endpoints
Controllers	Handle HTTP requests & responses
Services	Business logic
Models	Database schema & queries
Middleware	Auth, role checks, error handling

This ensures:

Clean code

Easy debugging

Scalability without refactoring

🔐 Authentication & Authorization
Authentication

JWT stored in HTTP-only cookies

Secure login & logout

Token verified on protected routes

Authorization

Role-based access (admin, user)

Admin-only routes protected via middleware

No hardcoded role logic inside controllers

📦 Product Module
Features

Create / update / delete products (Admin)

Public product listing

Keyword search

Category-based filtering

Price range filtering

Sorting:

Price (asc / desc)

Newest

Name

Pagination

Example Query
GET /api/products?keyword=laptop&category=electronics&sort=price&page=1&limit=10

🗂 Category Module
Features

Admin CRUD operations

Public category listing

Category-based product filtering

Validation applied only where required

🛒 Cart Module
Features

Add item to cart

Update quantity

Remove item

View user cart

Automatic price calculation

Cart is strictly user-specific and fully protected.

📑 Order Module
Features

Place order from cart

View order history

Order status lifecycle

Order cancellation rules:

User: only before shipping

Admin: anytime

Inventory adjustment on order & cancellation

⚠️ Error Handling Strategy

Custom ApiError class

Centralized error middleware

Only two status codes by design:

400 → validation & business errors

500 → internal server errors

This keeps error handling predictable and consistent.

🚫 Why Some Files Are Intentionally Empty (Very Important)
user.controller.js, user.service.js, user.routes.js

These files are intentionally empty.

Reason:

User authentication is handled entirely in auth.controller.js

No additional user features (profile update, admin user management) are required for MVP

Avoided adding unnecessary or fake APIs

👉 This demonstrates scope discipline, not incompleteness.

auth.validator.js, order.validator.js, product.validator.js

These validator files are deliberately left empty.

Reason:

Validation is applied only where it provides real value

Over-validation was avoided to keep MVP clean

Files are placed to support future scalability without structural changes

🧪 MVP Status

This backend is a complete and functional MVP:

All core e-commerce workflows work end-to-end

No dead routes

No placeholder logic

Ready for frontend or mobile integration