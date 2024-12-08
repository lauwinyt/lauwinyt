const { Client, GatewayIntentBits, PermissionsBitField, EmbedBuilder } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds, 
        GatewayIntentBits.GuildMessages, 
        GatewayIntentBits.MessageContent 
    ] 
});

const TOKEN = '';
const linkPatterns = [
    /https?:\/\//i,
    /www\./i,
    /discord\.gg/i,
    /discord\.com/i
];
const LinkRole = '';
const ANTI_LOG_ID = '';

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    
    const Anti_LOG = message.guild.channels.cache.get(ANTI_LOG_ID);
    const member = message.member;
    const BLOCK = new EmbedBuilder()
    .setColor('#ff0000')
    .setAuthor({ name: 'קישור נחסם בהצלחה!', iconURL: message.author.displayAvatarURL({ dynamic: true }) })
    .setDescription(`**${client.user.author} חסם בהצלחה קישור שנשלח על ידי ${message.author}**`)
    .addFields({ name: 'הקישור שנמחק', value: `\`${message.content}\`` }) // מציג את הקישור שנמחק
    .setFooter({ text: `Developed By lau_win`, iconURL: guild.iconURL() })
    .setTimestamp();


    if (
        member &&
        (member.roles.cache.has(LinkRole) || 
        member.permissions.has(PermissionsBitField.Flags.Administrator))
    ) {
        return;
    }

    if (linkPatterns.some(pattern => pattern.test(message.content))) {
        await message.delete();
        await Anti_LOG.send({ embeds: [BLOCK] });

        const warningMessage = await message.channel.send(`${message.author}, לינקים אינם מורשים כאן!`);
        setTimeout(() => warningMessage.delete(), 4500);
    }
});

client.login(TOKEN);
