const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const connectDB = require('./config/db');
const imageRoutes = require('./routes/imageRoutes');
const userRoutes = require('./routes/userRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();



const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(bodyParser.json()); // For parsing application/json
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 })); // Limit to 100 requests per 15 minutes

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/images', imageRoutes);
app.use('/api/users', userRoutes);

const crypto = require('crypto');
const secret = crypto.randomBytes(32).toString('hex');
console.log(secret);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

console.log('hi');
