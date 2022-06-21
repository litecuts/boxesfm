const { MessageEmbed } = require('discord.js')
module.exports = {
  name: 'savatar',
  aliases: ['sav', 'serveravatar'],
  /**
   * @param {Client} client
   * @param {Message} message
   * @param {String[]} args
   */

  run: async (client, message, args) => {
    let mentionedMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find((u) => u.user.username.toLowerCase().includes(args.join(" ") || u.user.tag.toLowerCase() === args.join(" ")))
    if (!mentionedMember) mentionedMember = message.member;

    const embed = new MessageEmbed()
      .setTitle(`${mentionedMember.user.username}'s Server Avatar`)
      .setImage(mentionedMember.avatarURL({ dynamic: true, size: 1024 }))
      .setURL(mentionedMember.avatarURL({ dynamic: true, size: 512 }))
      .setColor("BLACK")

    message.reply({ embeds: [embed] })
  }
}