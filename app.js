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

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
