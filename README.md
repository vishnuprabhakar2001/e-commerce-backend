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