const Discord = require('discord.js')
module.exports = {
    name: 'invite',
    aliases: ['inv',],
    description: 'Invite bot to server',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async (client, message, args) => {
        const embed = new Discord.MessageEmbed()
        .setAuthor('Bot Invite', client.user.displayAvatarURL())
        .setDescription('**[Click Here](https://discord.com/api/oauth2/authorize?client_id=934162214594687026&permissions=8&scope=bot)**')
        .setColor('BLACK')
        message.reply({ embeds: [embed] })
    }
}