const cron = require('node-cron');
const axios = require('axios');

// Define the cron schedule for fetching data every 15 seconds
const cronExpression = '*/15 * * * * *';

// Create the cron job
const cronJob = cron.schedule(cronExpression, async () => {
    try {
        const response = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const btcPrice = response.data.bitcoin.usd;
        console.log(`BTC price: $${btcPrice}`);
    } catch (error) {
        console.error('Error fetching BTC price:', error.message);
    }
});

// Start the cron job
cronJob.start();

// Optionally, stop the cron job after a certain time (e.g., 1 minute in this example)
setTimeout(() => {
    cronJob.stop();
    console.log('Cron job stopped.');
}, 60 * 1000); // 1 minute in milliseconds
