require('dotenv').config();
const Discord = require('discord.js');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES"] });
const millisecondsInThreeDays = 3 * 24 * 60 * 60 * 1000;
const channelId = '1126987843940663336';


console.log(process.env.TOKEN);


client.on('messageReactionAdd', async (reaction, user) => {
    if (!user.bot) {
        let targetUser = await client.users.fetch(user.id);
        if (!targetUser) {
            return console.log('User not found');
        }

        // Send initial confirmation message
        targetUser.send('Your reminder has been set successfully! You will receive a message from me after 3 days.').catch(console.error);

        setTimeout(() => {
            targetUser.send('This is your message').catch(console.error);
        }, millisecondsInThreeDays);
    }
});

client.once('ready', async () => {
    console.log('Bot is ready!');
    const channel = await client.channels.fetch(channelId);
    channel.send('React to this message to set a reminder for 3 days later.').catch(console.error);
});

client.login(process.env.TOKEN);
