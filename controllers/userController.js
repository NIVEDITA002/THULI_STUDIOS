const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Signup logic
exports.signup = async (req, res) => {
    // Log the received email and password in the console
    console.log('Received Email:', req.body.email);
    console.log('Received Password:', req.body.password);
    const email = req.body.email;
    const password = req.body.password;    
    console.log('Email:', email);
    console.log('Password:', password);
    // Check if all required fields are present
    if (!email || !password) {
        console.log('Error in 1');
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Error in 2');
            return res.status(400).json({ message: 'User already exists.' });
        }
        console.log('success in 1');
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log('success in 2');
        const newUser = new User({ email, password: hashedPassword , favorites:[] });
        console.log('success in 3');
        await newUser.save();
        console.log('success in 4');
        console.log('Request Body:', req.body);

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('success in 5');
        res.status(201).json({ token });
        console.log('success in 6');
    } catch (error) {
        console.log('Error in 3');
        res.status(500).json({ message: 'Error creating user' });
    }
};

// Login logic
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: 'User not found' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in' });
    }
};

exports.logout = (req, res) => {
    res.status(200).json({ message: 'Logged out successfully' });
};