const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

// Load models
const Product = require('./models/Product');

// Connect to DB
mongoose.connect(process.env.MONGODB_URI);

// Sample Data
const products = [
    {
        name: "Gourmet Frozen Samosa",
        description: "Handcrafted samosas with a spicy potato and pea filling.",
        price: 450,
        category: "Samosas",
        image: "samosa.png",
        stock: 50
    },
    {
        name: "Premium Beef Kabab",
        description: "Artisanal beef kababs seasoned with traditional spices.",
        price: 1200,
        category: "Kababs",
        image: "kabab.png",
        stock: 30
    },
    {
        name: "Classic Garlic Paratha",
        description: "Flaky, buttery paratha infused with fresh garlic.",
        price: 350,
        category: "Parathas",
        image: "pratha.png",
        stock: 100
    },
    {
        name: "Vegetable Spring Rolls",
        description: "Crispy rolls filled with fresh julienned vegetables.",
        price: 650,
        category: "Rolls",
        image: "roll.png",
        stock: 60
    }
];

// Import into DB
const importData = async () => {
    try {
        await Product.create(products);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

// Delete Data
const deleteData = async () => {
    try {
        await Product.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
