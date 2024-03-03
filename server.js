require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

app.post('/api/chat', async (req, res) => {
    const { messages } = req.body;
    
    // Check if the messages array is provided and not empty
    if (!messages || !messages.length) {
        return res.status(400).json({ message: "No messages provided." });
    }

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: messages
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            }
        });
        
        // sends back the entire response from OpenAI
        res.json(response.data);
    } catch (error) {
        console.error('Error with ChatGPT', error);
        res.status(error.response?.status || 500).json({ message: "Error calling OpenAI API" });
    }
});
