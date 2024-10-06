const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,  // Ensure the email is unique
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6  // Ensure password is at least 6 characters long
    },
    favorites: {
        type: [String], // Store image IDs
        default: [] // Default to an empty array
    }
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
