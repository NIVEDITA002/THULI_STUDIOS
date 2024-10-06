const axios = require('axios');
const User = require('../models/User');

// Search images (open route)
exports.searchImages = async (req, res) => {
    try {
        console.log('Received query:', req.query);
        const { query } = req.query;
        const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: { query },
            headers: {
                Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
            },
        });
        res.json({ results: response.data.results });
    } catch (error) {
        console.error('Error fetching images:', error);
        res.status(500).json({ message: 'Error fetching images' });
    }
};

// Add favorite image
exports.addFavorite = async (req, res) => {
    try {
        console.log("fav 1");
        const user = await User.findById(req.userId);
        const { imageId } = req.body;
        
        console.log("fav 2");
        console.log('Received query:', imageId);
        console.log("test line");
        console.log('user.fav : ' ,user.favorites);  // Log to check the structure of the array

        if (user.favorites.includes(imageId)) {      
            console.log("fav 3");
            return res.status(400).json({ message: 'Image already in favorites' });
        }
        else
        {
            console.log("not fav 8");
        }
        
        console.log("fav 4");
        user.favorites.push(imageId);
        
        console.log("fav 5");
        await user.save();
        
        console.log("fav 6");
        res.status(200).json({ message: 'Added to favorites' });
        
        console.log("fav 7");
    } catch (error) {
        
        console.log("not fav 1");
        res.status(500).json({ message: 'Error adding favorite' });
    }
};
