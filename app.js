const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3000;

// Endpoint to retrieve prices of BTC and ETH from CoinGecko
app.get('/prices', async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.coingecko.com/api/v3/simple/price',
            {
                params: {
                    ids: 'bitcoin,ethereum, cardano',
                    vs_currencies: 'usd',
                },
            }
        );

        const btcPrice = response.data.bitcoin.usd;
        const ethPrice = response.data.ethereum.usd;

        console.log(`BTC: ${btcPrice}, ETH: ${ethPrice}`)
        res.json({ btcPrice, ethPrice });
    } catch (error) {
        console.log('error', error)
        res.status(500).json({ error: 'Failed to fetch prices from CoinGecko' });
    }
});

app.post('/webhook/tradingview', (req, res) => {
    try {
        // Extract the data from the request body
        const alertData = req.body;

        // Process the price alert data
        // For example, log the data or take appropriate action based on the alert

        console.log('Received TradingView price alert:');
        console.log(alertData);

        // Respond with a success message
        res.json({ message: 'Received TradingView price alert successfully' });
    } catch (error) {
        // Handle any errors
        res.status(500).json({ error: 'Failed to process the price alert' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
