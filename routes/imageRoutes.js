// routes/imageRoutes.js
const express = require('express');
const { searchImages, addFavorite } = require('../controllers/imageController'); // Import the addFavorite function
const auth = require('../middleware/auth');  // Middleware for authentication
const router = express.Router();

// Public route for searching images
router.get('/search', searchImages);

// Protected route for adding to favorites (requires authentication)
router.post('/favorites', auth, addFavorite);

module.exports = router;
