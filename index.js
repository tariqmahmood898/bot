const { send } = require('process');
const { Telegraf } = require('telegraf');
const BOT_TOKEN = 'copy past telegram bot api key'; 
const bot = new Telegraf(BOT_TOKEN);

const web_link = "https://celebrated-torte-184681.netlify.app/";
const userDataFile = 'user_data.json'; // Name of your JSON file

// Load user data from the JSON file (if it exists)
let users = {};
try {
  users = require('./' + userDataFile); 
} catch (err) {
  // If the file doesn't exist, create an empty object
  users = {};
}
bot.start(async (ctx) => {
  // Get user details
  const userId = ctx.from.id;
  const fullName = ctx.from.first_name + ' ' + ctx.from.last_name; // Assuming first and last name are available
  const username = ctx.from.username; 

  // Check if the user exists in the JSON file
  if (users[userId]) {
    // User already exists, skip saving
    console.log('User already exists:', userId);
  } else {
    // User is new, save their data to the JSON file
    users[userId] = { 
      fullName: fullName,
      username: username
    };

    // Write the updated user data to the file
    try {
      const fs = require('fs'); // Import the file system module
      fs.writeFileSync(userDataFile, JSON.stringify(users, null, 2)); // Write the updated JSON to file
      console.log('New user saved:', userId);
    } catch (err) {
      console.error('Error saving user data:', err);
    }
  }
  ctx.reply(`<b>Hi Dear  ${ctx.from.first_name} 🤝</b>\n\n<b>Welcome to digital 🪙 wallet! (${fullName})</b>\n\nAdvanced digital 🏦banking & 💰 earning infrastructure within the Telegram messenger For freelancer, business, traders. \nTON Banking is currently in BETA. For news and updates, follow us on Telegram.`, 
    {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [
            { text: " 🏛💸🪙 Launch Wallet Apps 🏛💸🪙 ", web_app: { url: web_link } },
          ],
          [
            { text: "📝 About Project", callback_data: 'about_project' },
            { text: "💸 Daily Earning", callback_data: 'daily_earning' },
          ],
          [
            { text: "🚀Our Business Vision🚀", callback_data: 'reffer_earning' },
          ],
        ]
      },
    }
  );

  // Add a listener for callback queries to handle button clicks
bot.on('callback_query', (ctx) => {
  const data = ctx.callbackQuery.data;

  if (data === 'about_project') {
    ctx.reply('About our project\n\nThis project provides you business to \n\nbusiness for freelancer, online trader.');
  } 
  
  
  else if (data === 'daily_earning') {
    ctx.reply('Every day you can earn money with 100% risk; \n\nwe will share evy profit from it.');
  } else if (data === 'reffer_earning') {
    ctx.reply ('share me our link and earn VPW token');
  }
}

);
  
  ;
  ;
});
bot.launch();
