const cron = require('node-cron');
const axios = require('axios');
require('dotenv').config();

cron.schedule('0 0 21 * * *', sendJoke, { timezone: 'Asia/Kolkata' });

async function sendJoke() {
    try {
        const chatUrl = process.env.CHAT_URL;
        if (chatUrl) {
            const joke = await axios.get('https://v2.jokeapi.dev/joke/Programming,Misc?format=txt');
            await axios.post(
                process.env.CHAT_URL, 
                {
                    text: joke.data
                }
            );
        }
    } catch (error) {
        console.log('error :>> ', error);
    }
}