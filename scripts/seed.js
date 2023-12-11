// Import necessary models
import categoryModel from "../models/categoryModel.js";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import tagsModel from "../models/tagsModel.js";
import {  hashPassword } from "./../helpers/authHelper.js";

import connectDB from "../config/db.js"; // Assuming this file contains your database connection logic

console.log("im in seed.js");
// Connect to the database
connectDB();


const generateSlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '-');
};

// Seed data
const seedData = async () => {
  try {
          // Check if categories collection is empty
          const isCategoriesEmpty = await categoryModel.countDocuments() === 0;
      
          // Check if products collection is empty
          const isProductsEmpty = await productModel.countDocuments() === 0;
      
          // Check if users collection is empty
          const isUsersEmpty = await userModel.countDocuments() === 0;
      
          // Check if orders collection is empty
          const isOrdersEmpty = await orderModel.countDocuments() === 0;


          const isTagssEmpty = await tagsModel.countDocuments() === 0;
      
          // If any of the collections is not empty, do not seed data
          if (!isCategoriesEmpty || !isProductsEmpty || !isUsersEmpty || !isOrdersEmpty) {
            console.log("Database is not empty. Skipping seed data.");
            return;
          }
      
    // Seed categories
    
    const categories = await categoryModel.create([
      { name: "Luxury coatings", slug: generateSlug("Luxury coatings") },
      { name: "Interior", slug: generateSlug("Interior") },
      { name: "Exterior", slug: generateSlug("Exterior") },
      { name: "Wooden material", slug: generateSlug("Wooden material") },
      { name: "Surface preparation", slug: generateSlug("Surface preparation") },
    ]);

    // Seed tags
    const tags = await tagsModel.create([
        { name: "Bathroom" },
        { name: "Bedroom" },
        { name: "Diningroom" },
        { name: "Homeoffice" },
        { name: "Kitchen" },
        { name: "Livingroom" },
        // Add more tags as needed
      ]);

    // Seed products
    const products = await productModel.create([
      {
        name: "Product 1",
        description: "Description for Product 1",
        price: 19.99,
        category: categories[0]._id,
        tags: [tags[2]._id],
        color: "#3366FF",
        quantity: 123,
        slug: generateSlug("Product 1"),
        photos: [
          "https://dummyurl1.com/product1.jpg",
          "https://dummyurl2.com/product1.jpg",
        ],
        
        // Add more product data as needed
      },
      {
        name: "Product 2",
        description: "Description for Product 2",
        price: 29.99,
        category: categories[1]._id,
        tags: [tags[2]._id],
        color: "#3366FF",
        quantity: 123,
        slug: generateSlug("Product 2"),
        photos: [
          "https://dummyurl1.com/product1.jpg",
          "https://dummyurl2.com/product1.jpg",
        ]
        // A
      },
      {
        name: "Product 3",
        description: "Description for Product 3",
        price: 39.99,
        category: categories[2]._id,
        tags: [tags[3]._id],
        color: "#66FF33",
        quantity: 123,
        slug: generateSlug("Product 3"),
        photos: [
          "https://dummyurl1.com/product1.jpg",
          "https://dummyurl2.com/product1.jpg",
        ]
        // A
      },
      {
        name: "Product 4",
        description: "Description for Product 4",
        price: 49.99,
        category: categories[3]._id,
        tags: [tags[4]._id],
        color: "#FF3366",
        quantity: 123,
        slug: generateSlug("Product 4"),
        photos: [
          "https://dummyurl1.com/product1.jpg",
          "https://dummyurl2.com/product1.jpg",
        ]
        },
      {
        name: "Product 5",
        description: "Description for Product 5",
        price: 59.99,
        category: categories[4]._id,
        tags: [tags[5]._id],
        color: "#FF9933",
        quantity: 123,
        slug: generateSlug("Product 5"),
        photos: [
          "https://dummyurl1.com/product1.jpg",
          "https://dummyurl2.com/product1.jpg",
        ],
        // A
      },
      {
        name: "Product 6",
        description: "Description for Product 6",
        price: 69.99,
        category: categories[0]._id,
        tags: [tags[0]._id, tags[1]._id, tags[2]._id],
        color: "#9933FF",
        quantity: 123,
        slug: generateSlug("Product 6"),
        photos: [
          "https://dummyurl1.com/product1.jpg",
          "https://dummyurl2.com/product1.jpg",
        ],
        // A
      },
      {
        name: "Product 7",
        description: "Description for Product 7",
        price: 79.99,
        category: categories[1]._id,
        tags: [tags[3]._id, tags[4]._id],
        color: "#33FF99",
        quantity: 123,
        slug: generateSlug("Product 7"),
        photos: [
          "https://dummyurl1.com/product1.jpg",
          "https://dummyurl2.com/product1.jpg",
        ],       

      },

      // Add more products as needed
    ]);

    // Seed users
    const users = await userModel.create([
        {
          name: "Admin User",
          email: "admin@example.com",
          password: await hashPassword("adminpassword"),
          phone: "1234567890",
          address: {
            street: "123 Main St",
            city: "Cityville",
            state: "ST",
            zip: "12345",
          },
          answer: "adminanswer",
          role: 1, // Set role to 1 for admin
        },
        {
          name: "Regular User",
          email: "user@example.com",
          password: await hashPassword("userpassword"),
          phone: "9876543210",
          address: {
            street: "456 Side St",
            city: "Townsville",
            state: "TS",
            zip: "54321",
          },
          answer: "useranswer",
          role: 0, // Set role to 0 for regular user
        },
      ]);

    // Seed orders
    const orders = await orderModel.create([
        {
          user: users[0]._id,
          products: [products[0]._id],
          payment: {
            // Add payment details as needed
            method: "Credit Card",
            amount: 19.99,
            // Add more payment details as needed
          },
          status: "Processing",
        },
        {
          user: users[1]._id,
          products: [products[1]._id],
          payment: {
            method: "PayPal",
            amount: 29.99,
          },
          status: "Shipped",
        },
        {
          user: users[0]._id,
          products: [products[2]._id, products[3]._id],
          payment: {
            method: "Stripe",
            amount: 49.99,
          },
          status: "Processing",
        },
        {
          user: users[1]._id,
          products: [products[4]._id],
          payment: {
            method: "Cash on Delivery",
            amount: 39.99,
          },
          status: "Processing",
        },
        {
          user: users[0]._id,
          products: [products[5]._id, products[6]._id],
          payment: {
            method: "Bank Transfer",
            amount: 59.99,
          },
          status: "Not Process",
        },
      ]);
      
     
      
    console.log("Seed data successfully inserted:", { categories, products, users, orders });
  } catch (error) {
    console.error("Error seeding data:", error);
  } finally {
  
    // db.disconnect();
  }
};

// Run the seed function
seedData();
