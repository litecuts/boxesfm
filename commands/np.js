const { Message, Client, MessageEmbed } = require("discord.js");
var rp = require('request-promise');
const Discord = require("discord.js");
const Schema = require("./../models/lfsets")
const botconfig = require("../config.json");
const colorSchema = require("./../models/npcolor")
const styleSchema = require("./../models/lfstyle")

module.exports = {
    name: "np",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        try {
            const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
            const data = await Schema.findOne({ User: user.user.id });
            const npcolor = await colorSchema.findOne({ User: user.user.id });
            const color = npcolor.Color
            //Up Reaction
            const upReaction = await upSchema.findOne({ User: user.user.id });
            const up = upReaction.Up
            //Up Reaction
            const downReaction = await downSchema.findOne({ User: user.user.id });
            const down = downReaction.Down
            //Code 
            const lfstyle = await styleSchema.findOne({ User: user.user.id });
            const style = lfstyle.Style

            const username = data.LastFM
            var options = {
                uri: "http://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&extended=1",
                headers: {
                    'Connection': 'keep-alive',
                    'Accept-Encoding': '',
                    'Accept-Language': 'en-US,en;q=0.8',
                },
                json: true
            };
            rp(options)
                .then(function async(lastfm) {
                    var regex = /' '/gi;
                    var trackName = lastfm.recenttracks.track[0].name.replace(/ /g, "+");
                    var artistName = lastfm.recenttracks.track[0].artist.name.replace(' ', '+');
                    var trackURL = "http://ws.audioscrobbler.com/2.0/?method=track.getInfo&username=" + username + "&api_key=" + botconfig.apiKey + "&artist=" + artistName + "&track=" + trackName + "&format=json&autocorrect=1";
                    var options2 = {
                        uri: trackURL,
                        headers: {
                            'Connection': 'keep-alive',
                            'Accept-Encoding': '',
                            'Accept-Language': 'en-US,en;q=0.8',
                        },
                        json: true
                    };
                    rp(options2)
                        .then(function (song) {
                            try {
                                if (style === '0') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount
                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setColor(color)
                                            .addField('**Track**', "> **[" + track.name + "](" + track.url + ")**", false)
                                            .addField('**Artist**', "> **[" + artist.name + "](" + artist.url + ")**", false)
                                            .setFooter(plays + " plays | " + scrobbles + " total scrobbles" + ` | Album: ` + album)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }
                                } else if (style === '1') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount
                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setColor(color)
                                            .addField('**Track**', "> **[" + track.name + "](" + track.url + ")**", true)
                                            .addField('**Artist**', "> **[" + artist.name + "](" + artist.url + ")**", true)
                                            .setFooter(plays + " plays | " + scrobbles + " total scrobbles" + ` | Album: ` + album)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }
                                } else if (style === '2') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount

                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setColor(color)
                                            .addField('**Track**', `> **${track.name}**`)
                                            .addField('**Artist**', `> **${artist.name}**`)
                                            .addField('**Album**', `> **${album}**`)
                                            .setFooter(plays + " plays | " + scrobbles + " total scrobbles")
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }

                                } else if (style === '3') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]

                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setColor(color)
                                            .addField('**Artist**', `${artist.name} - ${album}`)
                                            .addField('**Track**', `${track.name}`)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }

                                } else if (style === '4') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount

                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setColor(color)
                                            .setDescription(`**[${track.name}](${track.url}) by [${artist.name}](${artist.url})**`)
                                            .setFooter(plays + "x | " + scrobbles + " total scrobbles" + ` | Album: ` + album)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }

                                } else if (style === '5') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount
                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setColor(color)
                                            .setDescription(`[${track.name}](${track.url}) by [${artist.name}](${artist.url}) on ${album}`)
                                            .setFooter(plays + "x | " + scrobbles + " total scrobbles")
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }

                                } else if (style === '6') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount

                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setDescription(`**${track.name}**\nby **${artist.name}**\n${plays}x ☆ ${scrobbles}`)
                                            .setColor(color)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }

                                } else if (style === '7') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount

                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setDescription(`**Artist:** ${artist.name}\n**Track:** ${track.name}\n**Album:** ${album}`)
                                            .setFooter(`${plays}x | ${scrobbles} total scrobbles`)
                                            .setColor(color)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }

                                } else if (style === '8') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount

                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setDescription(`**${track.name}** \`${plays}x\`\nby **${artist.name}** - **${album}**`)
                                            .setColor(color)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }

                                } else if (style === '9') {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                                    let plays = playCount
                                    const heartEmoji = [
                                        `💙`,
                                        `💚`,
                                        `💛`,
                                        `💜`,
                                        `🧡`,
                                        `🖤`,
                                        `🤍`,
                                        `❤`,];
                                    const diamondEmoji = [
                                        `♦`,
                                        `🔸`,
                                        `🔹`,];
                                    const heart = heartEmoji[Math.floor(Math.random() * heartEmoji.length)];
                                    const diamond = diamondEmoji[Math.floor(Math.random() * diamondEmoji.length)];

                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setDescription(`**${track.name}**\nby **${artist.name}** - **${album}**`)
                                            .setFooter(`${plays}x ${heart} · ${scrobbles} ${diamond}`)
                                            .setColor(color)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }
                                } else {
                                    try {
                                        var albumCount = 'None';
                                        if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                            albumCount = lastfm.recenttracks.track[0].album["#text"]
                                        }
                                        var playCount = '?';
                                        if (song.track.userplaycount != undefined) {
                                            playCount = song.track.userplaycount;
                                        }
                                    } catch (error) {
                                        playCount = '?';
                                    }
                                    let track = lastfm.recenttracks.track[0]
                                    let artist = lastfm.recenttracks.track[0].artist
                                    let album = lastfm.recenttracks.track[0].album["#text"]
                                    let scrobbles = lastfm.recenttracks['@attr'].total
                                    let plays = playCount

                                    try {
                                        const embed = new Discord.MessageEmbed()
                                            .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                            .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                            .setColor(color)
                                            .addField('**Track**', "> **[" + track.name + "](" + track.url + ")**")
                                            .addField('**Artist**', "> **[" + artist.name + "](" + artist.url + ")**")
                                            .setFooter(plays + " plays | " + scrobbles + " total scrobbles" + ` | Album: ` + album)
                                        message.reply({ embeds: [embed] }).then(embedMessage => {
                                            embedMessage.react(up)
                                            embedMessage.react(down);
                                        }).catch(e => console.log(e))
                                    } catch (e) {
                                        console.log(e)
                                    }
                                }
                            } catch (e) {
                                console.log(e)
                            }
                        });
                    (function (err) {
                        console.log(err);
                    });
                })
                .catch(function (err) {
                    message.channel.send("Couldn't retrieve your last track!")
                });
        }
        catch (error) {
            const usernameEmbed = new Discord.MessageEmbed()
                .setTitle(`❌ Invalid LastFM ID/Not Set`)
                .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                .setColor("RANDOM")
                .setFooter(`Box | LastFM`)
                .setTimestamp()
            console.log(error);
            message.reply({ embeds: [usernameEmbed] })
        }

    }
}