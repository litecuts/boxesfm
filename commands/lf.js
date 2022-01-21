const { Message, Client, MessageEmbed } = require("discord.js");
var rp = require('request-promise');
const Discord = require("discord.js");
const Schema = require("./../models/lfsets")
const botconfig = require("../config.json");
const colorSchema = require("./../models/npcolor")
const styleSchema = require("./../models/lfstyle")

module.exports = {
    name: "lf",
    aliases: ['fm'],
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        const subcmd = args[0]?.toLowerCase()
        const p = ','
        const user = message.member || message.mentions.members.first()

        if (!subcmd) {
            try {
                const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
                const data = await Schema.findOne({ User: user.user.id });
                const npcolor = await colorSchema.findOne({ User: user.user.id });
                const color = npcolor.Color
                //Reactions
                const up = '👍'
                const down = '👎'
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
                                            });
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
                                            });
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
                                            });
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
                                            });
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
                                            });
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
                                            });
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
                                            });
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
                                            });
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
                                            });
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
                                            });
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
                                            });
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
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'set') {
            const lfString = args.slice(1).join(' ')
            if (!lfString) return message.reply('Specify your LastFM')
            const embed2 = new Discord.MessageEmbed()
                .setAuthor(`Successfully set your LastFM username: ${lfString}`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor("50C878")
            Schema.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    data.LastFM = lfString;
                    data.save();
                } else {
                    new Schema({
                        User: message.author.id,
                        LastFM: lfString,
                    }).save();
                }
            })
            message.reply({ embeds: [embed2] })
            colorSchema.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    return;
                } else {
                    new colorSchema({
                        User: message.author.id,
                        Color: "RANDOM",
                    }).save();
                }
            })
            styleSchema.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    return;
                } else {
                    new styleSchema({
                        User: message.author.id,
                        Style: '0',
                    }).save();
                }
            })
        } else if (subcmd === 'album') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
                const username = data.LastFM
                var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&limit=10";
                var period = '';
                var title = "Top Albums (Overall)";
                if (args[1] == undefined) {
                    period = '';
                    title = "Top Albums (Overall)";
                } else if (args[1] == `7d`) {
                    period = "&period=7day";
                    title = "Top Albums (Weekly)";
                } else if (args[1] == "1m") {
                    period = "&period=1month";
                    title = "Top Albums (Last Month)";
                } else if (args[1] == "3m") {
                    period = "&period=3month";
                    title = "'Top Albums (Last 3 Months)";
                } else if (args[1] == "6m") {
                    period = "&period=6month";
                    title = "Top Albums (Last 6 Months)";
                } else if (args[1] == "12m" || args[1] == `y`) {
                    period = "&period=12month";
                    title = "Top Albums (Last Year)";
                }
                var options = {
                    uri: url + period,
                    json: true
                };
                rp(options)
                    .then(function (albums) {
                        const albumEmbed = new Discord.MessageEmbed()
                            .setAuthor(`${username} | ${title}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`\`1.\` ` + "**[" + albums.topalbums.album[0].name + "](" + albums.topalbums.album[0].url + ")**" + ` **by ${albums.topalbums.album[0].artist.name} [${albums.topalbums.album[0].playcount}]**\n` +
                                `\`2.\` ` + "**[" + albums.topalbums.album[1].name + "](" + albums.topalbums.album[1].url + ")**" + ` **by ${albums.topalbums.album[1].artist.name} [${albums.topalbums.album[1].playcount}]**\n` +
                                `\`3.\` ` + "**[" + albums.topalbums.album[2].name + "](" + albums.topalbums.album[2].url + ")**" + ` **by ${albums.topalbums.album[2].artist.name} [${albums.topalbums.album[2].playcount}]**\n` +
                                `\`4.\` ` + "**[" + albums.topalbums.album[3].name + "](" + albums.topalbums.album[3].url + ")**" + ` **by ${albums.topalbums.album[3].artist.name} [${albums.topalbums.album[3].playcount}]**\n` +
                                `\`5.\` ` + "**[" + albums.topalbums.album[4].name + "](" + albums.topalbums.album[4].url + ")**" + ` **by ${albums.topalbums.album[4].artist.name} [${albums.topalbums.album[4].playcount}]**\n` +
                                `\`6.\` ` + "**[" + albums.topalbums.album[5].name + "](" + albums.topalbums.album[5].url + ")**" + ` **by ${albums.topalbums.album[5].artist.name} [${albums.topalbums.album[5].playcount}]**\n` +
                                `\`7.\` ` + "**[" + albums.topalbums.album[6].name + "](" + albums.topalbums.album[6].url + ")**" + ` **by ${albums.topalbums.album[6].artist.name} [${albums.topalbums.album[6].playcount}]**\n` +
                                `\`8.\` ` + "**[" + albums.topalbums.album[7].name + "](" + albums.topalbums.album[7].url + ")**" + ` **by ${albums.topalbums.album[7].artist.name} [${albums.topalbums.album[7].playcount}]**\n` +
                                `\`9.\` ` + "**[" + albums.topalbums.album[8].name + "](" + albums.topalbums.album[8].url + ")**" + ` **by ${albums.topalbums.album[8].artist.name} [${albums.topalbums.album[8].playcount}]**\n` +
                                `\`10.\` ` + "**[" + albums.topalbums.album[9].name + "](" + albums.topalbums.album[9].url + ")**" + ` **by ${albums.topalbums.album[9].artist.name} [${albums.topalbums.album[9].playcount}]**\n`)
                            .setColor("RANDOM")
                            .setFooter(albums.topalbums['@attr'].total + " Total Album Scrobbles")
                        message.reply({ embeds: [albumEmbed] })
                    })
                    .catch(function (err) {
                        console.log("Unable to get album info \n" + err);
                    })
                    .finally(function () {
                    });
            } catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] });
            }
        } else if (subcmd === 'top') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
                const username = data.LastFM
                var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&limit=10";
                var period = '';
                var title = "Top Albums (Overall)";
                if (args[1] == undefined) {
                    period = '';
                    title = "Top Albums (Overall)";
                } else if (args[1] == `7d`) {
                    period = "&period=7day";
                    title = "Top Albums (Weekly)";
                } else if (args[1] == "1m") {
                    period = "&period=1month";
                    title = "Top Albums (Last Month)";
                } else if (args[1] == "3m") {
                    period = "&period=3month";
                    title = "'Top Albums (Last 3 Months)";
                } else if (args[1] == "6m") {
                    period = "&period=6month";
                    title = "Top Albums (Last 6 Months)";
                } else if (args[1] == "12m" || args[1] == `y`) {
                    period = "&period=12month";
                    title = "Top Albums (Last Year)";
                }
                var options = {
                    uri: url + period,
                    json: true
                };
                rp(options)
                    .then(function (albums) {
                        const albumEmbed = new Discord.MessageEmbed()
                            .setAuthor(`${username} | ${title}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`\`1.\` ` + "**[" + albums.topalbums.album[0].name + "](" + albums.topalbums.album[0].url + ")**" + ` **by ${albums.topalbums.album[0].artist.name} [${albums.topalbums.album[0].playcount}]**\n` +
                                `\`2.\` ` + "**[" + albums.topalbums.album[1].name + "](" + albums.topalbums.album[1].url + ")**" + ` **by ${albums.topalbums.album[1].artist.name} [${albums.topalbums.album[1].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`3.\` ` + "**[" + albums.topalbums.album[2].name + "](" + albums.topalbums.album[2].url + ")**" + ` **by ${albums.topalbums.album[2].artist.name} [${albums.topalbums.album[2].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`4.\` ` + "**[" + albums.topalbums.album[3].name + "](" + albums.topalbums.album[3].url + ")**" + ` **by ${albums.topalbums.album[3].artist.name} [${albums.topalbums.album[3].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`5.\` ` + "**[" + albums.topalbums.album[4].name + "](" + albums.topalbums.album[4].url + ")**" + ` **by ${albums.topalbums.album[4].artist.name} [${albums.topalbums.album[4].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`6.\` ` + "**[" + albums.topalbums.album[5].name + "](" + albums.topalbums.album[5].url + ")**" + ` **by ${albums.topalbums.album[5].artist.name} [${albums.topalbums.album[5].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`7.\` ` + "**[" + albums.topalbums.album[6].name + "](" + albums.topalbums.album[6].url + ")**" + ` **by ${albums.topalbums.album[6].artist.name} [${albums.topalbums.album[6].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`8.\` ` + "**[" + albums.topalbums.album[7].name + "](" + albums.topalbums.album[7].url + ")**" + ` **by ${albums.topalbums.album[7].artist.name} [${albums.topalbums.album[7].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`9.\` ` + "**[" + albums.topalbums.album[8].name + "](" + albums.topalbums.album[8].url + ")**" + ` **by ${albums.topalbums.album[8].artist.name} [${albums.topalbums.album[8].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`10.\` ` + "**[" + albums.topalbums.album[9].name + "](" + albums.topalbums.album[9].url + ")**" + ` **by ${albums.topalbums.album[9].artist.name} [${albums.topalbums.album[9].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n`)
                            .setColor("RANDOM")
                            .setFooter(albums.topalbums['@attr'].total + " Total Album Scrobbles")
                        message.reply({ embeds: [albumEmbed] })
                    })
                    .catch(function (err) {
                        console.log("Unable to get album info \n" + err);
                    })
                    .finally(function () {
                    });
            } catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] });
            }
        } else if (subcmd === 'tab') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
                const username = data.LastFM
                var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&limit=10";
                var period = '';
                var title = "Top Albums (Overall)";
                if (args[1] == undefined) {
                    period = '';
                    title = "Top Albums (Overall)";
                } else if (args[1] == `7d`) {
                    period = "&period=7day";
                    title = "Top Albums (Weekly)";
                } else if (args[1] == "1m") {
                    period = "&period=1month";
                    title = "Top Albums (Last Month)";
                } else if (args[1] == "3m") {
                    period = "&period=3month";
                    title = "'Top Albums (Last 3 Months)";
                } else if (args[1] == "6m") {
                    period = "&period=6month";
                    title = "Top Albums (Last 6 Months)";
                } else if (args[1] == "12m" || args[1] == `y`) {
                    period = "&period=12month";
                    title = "Top Albums (Last Year)";
                }
                var options = {
                    uri: url + period,
                    json: true
                };
                rp(options)
                    .then(function (albums) {
                        const albumEmbed = new Discord.MessageEmbed()
                            .setAuthor(`${username} | ${title}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`\`1.\` ` + "**[" + albums.topalbums.album[0].name + "](" + albums.topalbums.album[0].url + ")**" + ` **by ${albums.topalbums.album[0].artist.name} [${albums.topalbums.album[0].playcount}]**\n` +
                                `\`2.\` ` + "**[" + albums.topalbums.album[1].name + "](" + albums.topalbums.album[1].url + ")**" + ` **by ${albums.topalbums.album[1].artist.name} [${albums.topalbums.album[1].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`3.\` ` + "**[" + albums.topalbums.album[2].name + "](" + albums.topalbums.album[2].url + ")**" + ` **by ${albums.topalbums.album[2].artist.name} [${albums.topalbums.album[2].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`4.\` ` + "**[" + albums.topalbums.album[3].name + "](" + albums.topalbums.album[3].url + ")**" + ` **by ${albums.topalbums.album[3].artist.name} [${albums.topalbums.album[3].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`5.\` ` + "**[" + albums.topalbums.album[4].name + "](" + albums.topalbums.album[4].url + ")**" + ` **by ${albums.topalbums.album[4].artist.name} [${albums.topalbums.album[4].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`6.\` ` + "**[" + albums.topalbums.album[5].name + "](" + albums.topalbums.album[5].url + ")**" + ` **by ${albums.topalbums.album[5].artist.name} [${albums.topalbums.album[5].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`7.\` ` + "**[" + albums.topalbums.album[6].name + "](" + albums.topalbums.album[6].url + ")**" + ` **by ${albums.topalbums.album[6].artist.name} [${albums.topalbums.album[6].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`8.\` ` + "**[" + albums.topalbums.album[7].name + "](" + albums.topalbums.album[7].url + ")**" + ` **by ${albums.topalbums.album[7].artist.name} [${albums.topalbums.album[7].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`9.\` ` + "**[" + albums.topalbums.album[8].name + "](" + albums.topalbums.album[8].url + ")**" + ` **by ${albums.topalbums.album[8].artist.name} [${albums.topalbums.album[8].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n` +
                                `\`10.\` ` + "**[" + albums.topalbums.album[9].name + "](" + albums.topalbums.album[9].url + ")**" + ` **by ${albums.topalbums.album[9].artist.name} [${albums.topalbums.album[9].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}]**\n`)
                            .setColor("RANDOM")
                            .setFooter(albums.topalbums['@attr'].total + " Total Album Scrobbles")
                        message.reply({ embeds: [albumEmbed] })
                    })
                    .catch(function (err) {
                        console.log("Unable to get album info \n" + err);
                    })
                    .finally(function () {
                    });
            } catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] });
            }
        } else if (subcmd === 'artist') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
                const username = data.LastFM
                var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&limit=10";
                var period = '';
                var title = `| Top Artists (Overall)`;
                if (args[1] == undefined) {
                    period = '';
                    title = `| Top Artists (Overall)`;
                } else if (args[1] == `w`) {
                    period = "&period=7day";
                    title = "| Top Artists (Weekly)";
                } else if (args[1] == "1m") {
                    period = "&period=1month";
                    title = "| Top Artists (Last Month)";
                } else if (args[1] == "3m") {
                    period = "&period=3month";
                    title = "| Top Artists (Last 3 Months)";
                } else if (args[1] == "6m") {
                    period = "&period=6month";
                    title = "| Top Artists (Last 6 Months)";
                } else if (args[1] == "12m" || args[0] == `y`) {
                    period = "&period=12month";
                    title = "| Top Artists (Last Year)";
                }
                var options = {
                    uri: url + period,
                    json: true
                };
                rp(options)
                    .then(function (artists) {
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`${username} ${title}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`\`#1\` ` + "**[" + artists.topartists.artist[0].name + "](" + artists.topartists.artist[0].url + ")**" + " **(" + artists.topartists.artist[0].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#2\` ` + "**[" + artists.topartists.artist[1].name + "](" + artists.topartists.artist[1].url + ")**" + " **(" + artists.topartists.artist[1].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#3\` ` + "**[" + artists.topartists.artist[2].name + "](" + artists.topartists.artist[2].url + ")**" + " **(" + artists.topartists.artist[2].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#4\` ` + "**[" + artists.topartists.artist[3].name + "](" + artists.topartists.artist[3].url + ")**" + " **(" + artists.topartists.artist[3].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#5\` ` + "**[" + artists.topartists.artist[4].name + "](" + artists.topartists.artist[4].url + ")**" + " **(" + artists.topartists.artist[4].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#6\` ` + "**[" + artists.topartists.artist[5].name + "](" + artists.topartists.artist[5].url + ")**" + " **(" + artists.topartists.artist[5].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#7\` ` + "**[" + artists.topartists.artist[6].name + "](" + artists.topartists.artist[6].url + ")**" + " **(" + artists.topartists.artist[6].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#8\` ` + "**[" + artists.topartists.artist[7].name + "](" + artists.topartists.artist[7].url + ")**" + " **(" + artists.topartists.artist[7].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#9\` ` + "**[" + artists.topartists.artist[8].name + "](" + artists.topartists.artist[8].url + ")**" + " **(" + artists.topartists.artist[8].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#10\` ` + "**[" + artists.topartists.artist[9].name + "](" + artists.topartists.artist[9].url + ")**" + " **(" + artists.topartists.artist[9].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n")
                            .setColor("RANDOM")
                            .setFooter(artists.topartists['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " total scrobbles")
                        message.reply({ embeds: [embed] })
                    })
                    .catch(function (err) {
                        console.log("Unable to get artist info \n" + err);
                    })
                    .finally(function () {
                    });
            } catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'artists') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
                const username = data.LastFM
                var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&limit=10";
                var period = '';
                var title = `| Top Artists (Overall)`;
                if (args[1] == undefined) {
                    period = '';
                    title = `| Top Artists (Overall)`;
                } else if (args[1] == `w`) {
                    period = "&period=7day";
                    title = "| Top Artists (Weekly)";
                } else if (args[1] == "1m") {
                    period = "&period=1month";
                    title = "| Top Artists (Last Month)";
                } else if (args[1] == "3m") {
                    period = "&period=3month";
                    title = "| Top Artists (Last 3 Months)";
                } else if (args[1] == "6m") {
                    period = "&period=6month";
                    title = "| Top Artists (Last 6 Months)";
                } else if (args[1] == "12m" || args[0] == `y`) {
                    period = "&period=12month";
                    title = "| Top Artists (Last Year)";
                }
                var options = {
                    uri: url + period,
                    json: true
                };
                rp(options)
                    .then(function (artists) {
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`${username} ${title}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`\`#1\` ` + "**[" + artists.topartists.artist[0].name + "](" + artists.topartists.artist[0].url + ")**" + " **(" + artists.topartists.artist[0].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#2\` ` + "**[" + artists.topartists.artist[1].name + "](" + artists.topartists.artist[1].url + ")**" + " **(" + artists.topartists.artist[1].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#3\` ` + "**[" + artists.topartists.artist[2].name + "](" + artists.topartists.artist[2].url + ")**" + " **(" + artists.topartists.artist[2].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#4\` ` + "**[" + artists.topartists.artist[3].name + "](" + artists.topartists.artist[3].url + ")**" + " **(" + artists.topartists.artist[3].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#5\` ` + "**[" + artists.topartists.artist[4].name + "](" + artists.topartists.artist[4].url + ")**" + " **(" + artists.topartists.artist[4].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#6\` ` + "**[" + artists.topartists.artist[5].name + "](" + artists.topartists.artist[5].url + ")**" + " **(" + artists.topartists.artist[5].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#7\` ` + "**[" + artists.topartists.artist[6].name + "](" + artists.topartists.artist[6].url + ")**" + " **(" + artists.topartists.artist[6].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#8\` ` + "**[" + artists.topartists.artist[7].name + "](" + artists.topartists.artist[7].url + ")**" + " **(" + artists.topartists.artist[7].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#9\` ` + "**[" + artists.topartists.artist[8].name + "](" + artists.topartists.artist[8].url + ")**" + " **(" + artists.topartists.artist[8].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n" +
                                `\`#10\` ` + "**[" + artists.topartists.artist[9].name + "](" + artists.topartists.artist[9].url + ")**" + " **(" + artists.topartists.artist[9].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays)**\n")
                            .setColor("RANDOM")
                            .setFooter(artists.topartists['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " total scrobbles")
                        message.reply({ embeds: [embed] })
                    })
                    .catch(function (err) {
                        console.log("Unable to get artist info \n" + err);
                    })
                    .finally(function () {
                    });
            } catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'recent') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
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
                    .then(function (lastfm) {
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
                            .then(function (track) {
                                try {
                                    var playCount = '?';
                                    if (track.track.userplaycount != undefined) {
                                        playCount = track.track.userplaycount;
                                    }
                                } catch (error) {
                                    playCount = 'Can\'t find';
                                }
                                const embed = new Discord.MessageEmbed()
                                    .setAuthor(`${username} | Recent`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setDescription("> \`#1\` **[" + lastfm.recenttracks.track[0].name + "](" + lastfm.recenttracks.track[0].url + ") - [" + lastfm.recenttracks.track[0].artist.name + "](" + lastfm.recenttracks.track[0].artist.url + ")**\n> \`#2\` **[" + lastfm.recenttracks.track[1].artist.name + "](" + lastfm.recenttracks.track[1].artist.url + ") - [" + lastfm.recenttracks.track[1].name + "](" + lastfm.recenttracks.track[1].url + ")**\n> \`#3\` **[" + lastfm.recenttracks.track[2].artist.name + "](" + lastfm.recenttracks.track[2].artist.url + ") - [" + lastfm.recenttracks.track[2].name + "](" + lastfm.recenttracks.track[2].url + ")**\n> \`#4\`**[" + lastfm.recenttracks.track[3].artist.name + "](" + lastfm.recenttracks.track[3].artist.url + ") - [" + lastfm.recenttracks.track[3].name + "](" + lastfm.recenttracks.track[3].url + ")**\n> \`#5\` **[" + lastfm.recenttracks.track[4].artist.name + "](" + lastfm.recenttracks.track[4].artist.url + ") - [" + lastfm.recenttracks.track[4].name + "](" + lastfm.recenttracks.track[4].url + ")**\n> \`#6\` **[" + lastfm.recenttracks.track[5].artist.name + "](" + lastfm.recenttracks.track[5].artist.url + ") - [" + lastfm.recenttracks.track[5].name + "](" + lastfm.recenttracks.track[5].url + ")**\n> \`#7\` **[" + lastfm.recenttracks.track[6].artist.name + "](" + lastfm.recenttracks.track[6].artist.url + ") - [" + lastfm.recenttracks.track[6].name + "](" + lastfm.recenttracks.track[6].url + ")**\n> \`#8\` **[" + lastfm.recenttracks.track[7].artist.name + "](" + lastfm.recenttracks.track[7].artist.url + ") - [" + lastfm.recenttracks.track[7].name + "](" + lastfm.recenttracks.track[7].url + ")**\n> \`#7\` **[" + lastfm.recenttracks.track[6].artist.name + "](" + lastfm.recenttracks.track[6].artist.url + ") - [" + lastfm.recenttracks.track[6].name + "](" + lastfm.recenttracks.track[6].url + ")**\n> \`#9\` **[" + lastfm.recenttracks.track[8].artist.name + "](" + lastfm.recenttracks.track[8].artist.url + ") - [" + lastfm.recenttracks.track[8].name + "](" + lastfm.recenttracks.track[8].url + ")**\n> \`#10\` **[" + lastfm.recenttracks.track[9].artist.name + "](" + lastfm.recenttracks.track[9].artist.url + ") - [" + lastfm.recenttracks.track[9].name + "](" + lastfm.recenttracks.track[9].url + ")**")
                                    .setColor('RANDOM')
                                    .setFooter(playCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " scrobbles | " + lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " total scrobbles")
                                message.reply({ embeds: [embed] })
                            })
                            .catch(function (err) {
                                console.log(err);
                            });
                    })
                    .catch(function (err) {
                        message.reply("Couldn't retrieve your last track!")
                    });
            }
            catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'tracks') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
                const username = data.LastFM
                var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&limit=10";
                var period = '';
                var title = "| Top Tracks (Overall)";
                if (args[1] == undefined) {
                    period = '';
                    title = "| Top Tracks (Overall)";
                } else if (args[1] == `w`) {
                    period = "&period=7day";
                    title = "| Top Tracks (Weekly)";
                } else if (args[1] == "1m") {
                    period = "&period=1month";
                    title = "| Top Tracks (Last Month)";
                } else if (args[1] == "3m") {
                    period = "&period=3month";
                    title = "| Top Tracks (Last 3 Months)";
                } else if (args[1] == "6m") {
                    period = "&period=6month";
                    title = "| Top Tracks (Last 6 Months)";
                } else if (args[1] == "12m" || args[1] == `y`) {
                    period = "&period=12month";
                    title = "| Top Tracks (Last Year)";
                }
                var options = {
                    uri: url + period,
                    json: true
                };
                rp(options)
                    .then(function (tracks) {
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`${username} ${title}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setColor("RANDOM")
                            .setDescription(
                                "\`#1\` " + "**[" + tracks.toptracks.track[0].name + "](" + tracks.toptracks.track[0].url + ")**" + " **by " + tracks.toptracks.track[0].artist.name + "** \`" + tracks.toptracks.track[0].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#2\` " + "**[" + tracks.toptracks.track[1].name + "](" + tracks.toptracks.track[1].url + ")**" + " **by " + tracks.toptracks.track[1].artist.name + "** \`" + tracks.toptracks.track[1].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#3\` " + "**[" + tracks.toptracks.track[2].name + "](" + tracks.toptracks.track[2].url + ")**" + " **by " + tracks.toptracks.track[2].artist.name + "** \`" + tracks.toptracks.track[2].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#4\` " + "**[" + tracks.toptracks.track[3].name + "](" + tracks.toptracks.track[3].url + ")**" + " **by " + tracks.toptracks.track[3].artist.name + "** \`" + tracks.toptracks.track[3].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#5\` " + "**[" + tracks.toptracks.track[4].name + "](" + tracks.toptracks.track[4].url + ")**" + " **by " + tracks.toptracks.track[4].artist.name + "** \`" + tracks.toptracks.track[4].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#6\` " + "**[" + tracks.toptracks.track[5].name + "](" + tracks.toptracks.track[5].url + ")**" + " **by " + tracks.toptracks.track[5].artist.name + "** \`" + tracks.toptracks.track[5].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#7\` " + "**[" + tracks.toptracks.track[6].name + "](" + tracks.toptracks.track[6].url + ")**" + " **by " + tracks.toptracks.track[6].artist.name + "** \`" + tracks.toptracks.track[6].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#8\` " + "**[" + tracks.toptracks.track[7].name + "](" + tracks.toptracks.track[7].url + ")**" + " **by " + tracks.toptracks.track[7].artist.name + "** \`" + tracks.toptracks.track[7].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#9\` " + "**[" + tracks.toptracks.track[8].name + "](" + tracks.toptracks.track[8].url + ")**" + " **by " + tracks.toptracks.track[8].artist.name + "** \`" + tracks.toptracks.track[8].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#10\` " + "**[" + tracks.toptracks.track[9].name + "](" + tracks.toptracks.track[9].url + ")**" + " **by " + tracks.toptracks.track[9].artist.name + "** \`" + tracks.toptracks.track[9].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n"
                            )
                            .setFooter(tracks.toptracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " total scrobbles")
                            .setTimestamp(new Date())
                        message.reply({ embeds: [embed] })
                    })
                    .catch(function (err) {
                        console.log("Unable to get album info \n" + err);
                    })
                    .finally(function () {
                    });
            } catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'ttt') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
                const username = data.LastFM
                var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&limit=10";
                var period = '';
                var title = "| Top Tracks (Overall)";
                if (args[1] == undefined) {
                    period = '';
                    title = "| Top Tracks (Overall)";
                } else if (args[1] == `w`) {
                    period = "&period=7day";
                    title = "| Top Tracks (Weekly)";
                } else if (args[1] == "1m") {
                    period = "&period=1month";
                    title = "| Top Tracks (Last Month)";
                } else if (args[1] == "3m") {
                    period = "&period=3month";
                    title = "| Top Tracks (Last 3 Months)";
                } else if (args[1] == "6m") {
                    period = "&period=6month";
                    title = "| Top Tracks (Last 6 Months)";
                } else if (args[1] == "12m" || args[1] == `y`) {
                    period = "&period=12month";
                    title = "| Top Tracks (Last Year)";
                }
                var options = {
                    uri: url + period,
                    json: true
                };
                rp(options)
                    .then(function (tracks) {
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`${username} ${title}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setColor("RANDOM")
                            .setDescription(
                                "\`#1\` " + "**[" + tracks.toptracks.track[0].name + "](" + tracks.toptracks.track[0].url + ")**" + " **by " + tracks.toptracks.track[0].artist.name + "** \`" + tracks.toptracks.track[0].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#2\` " + "**[" + tracks.toptracks.track[1].name + "](" + tracks.toptracks.track[1].url + ")**" + " **by " + tracks.toptracks.track[1].artist.name + "** \`" + tracks.toptracks.track[1].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#3\` " + "**[" + tracks.toptracks.track[2].name + "](" + tracks.toptracks.track[2].url + ")**" + " **by " + tracks.toptracks.track[2].artist.name + "** \`" + tracks.toptracks.track[2].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#4\` " + "**[" + tracks.toptracks.track[3].name + "](" + tracks.toptracks.track[3].url + ")**" + " **by " + tracks.toptracks.track[3].artist.name + "** \`" + tracks.toptracks.track[3].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#5\` " + "**[" + tracks.toptracks.track[4].name + "](" + tracks.toptracks.track[4].url + ")**" + " **by " + tracks.toptracks.track[4].artist.name + "** \`" + tracks.toptracks.track[4].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#6\` " + "**[" + tracks.toptracks.track[5].name + "](" + tracks.toptracks.track[5].url + ")**" + " **by " + tracks.toptracks.track[5].artist.name + "** \`" + tracks.toptracks.track[5].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#7\` " + "**[" + tracks.toptracks.track[6].name + "](" + tracks.toptracks.track[6].url + ")**" + " **by " + tracks.toptracks.track[6].artist.name + "** \`" + tracks.toptracks.track[6].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#8\` " + "**[" + tracks.toptracks.track[7].name + "](" + tracks.toptracks.track[7].url + ")**" + " **by " + tracks.toptracks.track[7].artist.name + "** \`" + tracks.toptracks.track[7].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#9\` " + "**[" + tracks.toptracks.track[8].name + "](" + tracks.toptracks.track[8].url + ")**" + " **by " + tracks.toptracks.track[8].artist.name + "** \`" + tracks.toptracks.track[8].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n" +
                                "\`#10\` " + "**[" + tracks.toptracks.track[9].name + "](" + tracks.toptracks.track[9].url + ")**" + " **by " + tracks.toptracks.track[9].artist.name + "** \`" + tracks.toptracks.track[9].playcount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " plays\`\n"
                            )
                            .setFooter(tracks.toptracks['@attr'].total + " total scrobbles")
                            .setTimestamp(new Date())
                        message.reply({ embeds: [embed] })
                    })
                    .catch(function (err) {
                        console.log("Unable to get album info \n" + err);
                    })
                    .finally(function () {
                    });
            } catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'scrobbles') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
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
                            .then(function (track) {
                                try {
                                    var albumCount = 'None';
                                    if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                        albumCount = lastfm.recenttracks.track[0].album["#text"]
                                    }
                                    var playCount = '?';
                                    if (track.track.userplaycount != undefined) {
                                        playCount = track.track.userplaycount;
                                    }
                                } catch (error) {
                                    playCount = '?';
                                }
                                const embed = new Discord.MessageEmbed()
                                    .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setURL("https://www.last.fm/user/" + username)
                                    .setColor("RANDOM")
                                    .setDescription(`**You have ${lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} total scrobbles**`)
                                message.reply({ embeds: [embed] })
                            });
                        (function (err) {
                            console.log(err);
                        });
                    })
                    .catch(function (err) {
                        message.reply("Couldn't retrieve your last track!")
                    });
            }
            catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'plays') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
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
                            .then(function (track) {
                                try {
                                    var albumCount = 'None';
                                    if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                        albumCount = lastfm.recenttracks.track[0].album["#text"]
                                    }
                                    var playCount = '?';
                                    if (track.track.userplaycount != undefined) {
                                        playCount = track.track.userplaycount;
                                    }
                                } catch (error) {
                                    playCount = '0';
                                }
                                const embed = new Discord.MessageEmbed()
                                    .setAuthor(`LastFM User: ${username}`, message.author.displayAvatarURL({ dynamic: true }))
                                    .setThumbnail(lastfm.recenttracks.track[0].image[2]['#text'])
                                    .setDescription(`**You have ${playCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} plays for ${lastfm.recenttracks.track[0].name} by ${lastfm.recenttracks.track[0].artist.name}**`)
                                    .setURL("https://www.last.fm/user/" + username)
                                    .setColor("RANDOM")
                                    .setFooter(lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + " total scrobbles" + ` | Album: ` + albumCount)
                                message.reply({ embeds: [embed] })
                            });
                        (function (err) {
                            console.log(err);
                        });
                    })
                    .catch(function (err) {
                        message.reply("Couldn't retrieve your last track!")
                    });
            }
            catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'tar') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
                const username = data.LastFM
                var url = "http://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=" + username + "&api_key=" + botconfig.apiKey + "&format=json&limit=10";
                var period = '';
                var title = `| Top Artists (Overall)`;
                if (args[1] == undefined) {
                    period = '';
                    title = `| Top Artists (Overall)`;
                } else if (args[1] == `w`) {
                    period = "&period=7day";
                    title = "| Top Artists (Weekly)";
                } else if (args[1] == `7d`) {
                    period = "&period=7day";
                    title = "| Top Artists (Weekly)";
                } else if (args[1] == "1m") {
                    period = "&period=1month";
                    title = "| Top Artists (Last Month)";
                } else if (args[1] == "3m") {
                    period = "&period=3month";
                    title = "| Top Artists (Last 3 Months)";
                } else if (args[1] == "6m") {
                    period = "&period=6month";
                    title = "| Top Artists (Last 6 Months)";
                } else if (args[1] == "12m" || args[1] == `y`) {
                    period = "&period=12month";
                    title = "| Top Artists (Last Year)";
                }
                var options = {
                    uri: url + period,
                    json: true
                };
                rp(options)
                    .then(function (artists) {
                        const embed = new Discord.MessageEmbed()
                            .setAuthor(`${username} ${title}`, message.author.displayAvatarURL({ dynamic: true }))
                            .setDescription(`\`#1\` ` + "**[" + artists.topartists.artist[0].name + "](" + artists.topartists.artist[0].url + ")**" + " **(" + artists.topartists.artist[0].playcount + " plays)**\n" +
                                `\`#2\` ` + "**[" + artists.topartists.artist[1].name + "](" + artists.topartists.artist[1].url + ")**" + " **(" + artists.topartists.artist[1].playcount + " plays)**\n" +
                                `\`#3\` ` + "**[" + artists.topartists.artist[2].name + "](" + artists.topartists.artist[2].url + ")**" + " **(" + artists.topartists.artist[2].playcount + " plays)**\n" +
                                `\`#4\` ` + "**[" + artists.topartists.artist[3].name + "](" + artists.topartists.artist[3].url + ")**" + " **(" + artists.topartists.artist[3].playcount + " plays)**\n" +
                                `\`#5\` ` + "**[" + artists.topartists.artist[4].name + "](" + artists.topartists.artist[4].url + ")**" + " **(" + artists.topartists.artist[4].playcount + " plays)**\n" +
                                `\`#6\` ` + "**[" + artists.topartists.artist[5].name + "](" + artists.topartists.artist[5].url + ")**" + " **(" + artists.topartists.artist[5].playcount + " plays)**\n" +
                                `\`#7\` ` + "**[" + artists.topartists.artist[6].name + "](" + artists.topartists.artist[6].url + ")**" + " **(" + artists.topartists.artist[6].playcount + " plays)**\n" +
                                `\`#8\` ` + "**[" + artists.topartists.artist[7].name + "](" + artists.topartists.artist[7].url + ")**" + " **(" + artists.topartists.artist[7].playcount + " plays)**\n" +
                                `\`#9\` ` + "**[" + artists.topartists.artist[8].name + "](" + artists.topartists.artist[8].url + ")**" + " **(" + artists.topartists.artist[8].playcount + " plays)**\n" +
                                `\`#10\` ` + "**[" + artists.topartists.artist[9].name + "](" + artists.topartists.artist[9].url + ")**" + " **(" + artists.topartists.artist[9].playcount + " plays)**\n")
                            .setColor("RANDOM")
                        message.reply({ embeds: [embed] })
                    })
                    .catch(function (err) {
                        console.log("Unable to get artist info \n" + err);
                    })
                    .finally(function () {
                    });
            } catch (error) {
                const usernameEmbed = new Discord.MessageEmbed()
                    .setTitle(`❌ Invalid LastFM ID/Not Set`)
                    .setDescription(`**You didn\'t set/specify a username.\n\`${p}lfset\` to set your LastFM username\n[Click Here](https://www.last.fm/join) to create a LastFM Account**`)
                    .setColor("RANDOM")
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }
        } else if (subcmd === 'profile') {
            try {
                //Username
                const data = await Schema.findOne({ User: user.user.id });
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
                            .then(function (track) {
                                try {
                                    var albumCount = 'None';
                                    if (lastfm.recenttracks.track[0].album["#text"] != undefined) {
                                        albumCount = lastfm.recenttracks.track[0].album["#text"]
                                    }
                                    var playCount = '?';
                                    if (track.track.userplaycount != undefined) {
                                        playCount = track.track.userplaycount;
                                    }
                                } catch (error) {
                                    playCount = '?';
                                }
                                let registered;
                                const user = request.get(
                                    `http://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${username}&api_key=${botconfig.apiKey}&format=json`
                                );
                                user.then(res => {
                                    const user = res.body.user;
                                    let toDate = new Date(user.registered.unixtime * 1000);
                                    let registered = moment(toDate.toString()).format('LLLL')
                                    const embed = new Discord.MessageEmbed()
                                        .setAuthor('LastFM Profile', 'https://www.last.fm/static/images/lastfm_avatar_twitter.52a5d69a85ac.png')
                                        .setURL("https://www.last.fm/user/" + username)
                                        .setColor("BLACK")
                                        .setDescription(`**Last FM User:** \`${username}\`\n**Registered:** ${registered}\n**Current Playing Song: [${lastfm.recenttracks.track[0].name}](${lastfm.recenttracks.track[0].url}) by [${lastfm.recenttracks.track[0].artist.name}](${lastfm.recenttracks.track[0].artist.url})**\n**Total Scrobbles:** ${lastfm.recenttracks['@attr'].total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} `)
                                    message.reply({ embeds: [embed] })
                                })
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
                    .setFooter(`Moonlight | LastFM`)
                    .setTimestamp()
                console.log(error);
                message.reply({ embeds: [usernameEmbed] })
            }

        } else if (subcmd === 'color') {
            const color = args[1]
            const noColor = new Discord.MessageEmbed()
                .setAuthor(`Provide A Hexcode`, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter("Moonlight | LastFM")
            if (!color) return message.reply({ embeds: [noColor] })
            const embed = new Discord.MessageEmbed()
                .setColor(color)
                .setAuthor(`LastFM NP Embed Color Set To: ${color}`, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter("Moonlight | LastFM")
            colorSchema.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    data.Color = color;
                    data.save();
                } else {
                    new colorSchema({
                        User: message.author.id,
                        Color: color,
                    }).save();
                }
            })
            message.reply({ embeds: [embed] })
        } else if (subcmd === 'mode') {
            const style = args[1]
            if (!args[1]) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor('BLACK')
                    .setAuthor(`LastFM Embed Options`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription('**[Style 1](https://cdn.discordapp.com/attachments/859335350621962250/870873065066745926/unknown.png) | [Style 2](https://cdn.discordapp.com/attachments/859335350621962250/870873144175525948/unknown.png) | [Style 3](https://cdn.discordapp.com/attachments/859335350621962250/870873222298624030/unknown.png)\n[Style 4](https://cdn.discordapp.com/attachments/859335350621962250/870873312497115156/unknown.png) | [Style 5](https://cdn.discordapp.com/attachments/859335350621962250/870880030778081290/unknown.png) | [Style 6](https://cdn.discordapp.com/attachments/859335350621962250/870880152735871016/unknown.png)\n[Style 7](https://cdn.discordapp.com/attachments/859335350621962250/870880244192641034/unknown.png) | [Style 8](https://cdn.discordapp.com/attachments/859335350621962250/870880327810302012/unknown.png) | [Style 9](https://cdn.discordapp.com/attachments/859335350621962250/870880413218930768/unknown.png)**')
                    .setFooter("Moonlight | LastFM")]
            })
            if (isNaN(args[1])) return message.reply(`Not A Valid Option!`);
            const embed = new MessageEmbed()
                .setColor("BLACK")
                .setAuthor(`Successfully Made Now Playing Embed To Style ${args[1]}`, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter("Moonlight | LastFM")
            styleSchema.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    data.Style = style;
                    data.save();
                } else {
                    new styleSchema({
                        User: message.author.id,
                        Style: style,
                    }).save();
                }
            })
            message.reply({ embeds: [embed] })

        } else if (subcmd === 'style') {
            const style = args[1]
            if (!args[1]) return message.reply({
                embeds: [new MessageEmbed()
                    .setColor('BLACK')
                    .setAuthor(`LastFM Embed Options`, message.author.displayAvatarURL({ dynamic: true }))
                    .setDescription('**[Style 1](https://cdn.discordapp.com/attachments/859335350621962250/870873065066745926/unknown.png) | [Style 2](https://cdn.discordapp.com/attachments/859335350621962250/870873144175525948/unknown.png) | [Style 3](https://cdn.discordapp.com/attachments/859335350621962250/870873222298624030/unknown.png)\n[Style 4](https://cdn.discordapp.com/attachments/859335350621962250/870873312497115156/unknown.png) | [Style 5](https://cdn.discordapp.com/attachments/859335350621962250/870880030778081290/unknown.png) | [Style 6](https://cdn.discordapp.com/attachments/859335350621962250/870880152735871016/unknown.png)\n[Style 7](https://cdn.discordapp.com/attachments/859335350621962250/870880244192641034/unknown.png) | [Style 8](https://cdn.discordapp.com/attachments/859335350621962250/870880327810302012/unknown.png) | [Style 9](https://cdn.discordapp.com/attachments/859335350621962250/870880413218930768/unknown.png)**')
                    .setFooter("Moonlight | LastFM")]
            })
            if (isNaN(args[1])) return message.reply(`Not A Valid Option!`);
            const embed = new MessageEmbed()
                .setColor("BLACK")
                .setAuthor(`Successfully Made Now Playing Embed To Style ${args[1]}`, message.author.displayAvatarURL({ dynamic: true }))
                .setFooter("Moonlight | LastFM")
            styleSchema.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    data.Style = style;
                    data.save();
                } else {
                    new styleSchema({
                        User: message.author.id,
                        Style: style,
                    }).save();
                }
            })
            message.reply({ embeds: [embed] })

        } else if (subcmd === 'modereset') {
            styleSchema.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    data.Style = '0';
                    data.save();
                } else {
                    new styleSchema({
                        User: message.author.id,
                        Style: '0',
                    }).save();
                }
            })
            const resetEmbed = new MessageEmbed()
                .setAuthor(`Successfully Reset Your Now Playing Style`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('BLACK')
            message.reply({ embeds: [resetEmbed] })
        } else if (subcmd === 'stylereset') {
            styleSchema.findOne({ User: message.author.id }, async (err, data) => {
                if (data) {
                    data.Style = '0';
                    data.save();
                } else {
                    new styleSchema({
                        User: message.author.id,
                        Style: '0',
                    }).save();
                }
            })
            const resetEmbed = new MessageEmbed()
                .setAuthor(`Successfully Reset Your Now Playing Style`, message.author.displayAvatarURL({ dynamic: true }))
                .setColor('BLACK')
            message.reply({ embeds: [resetEmbed] })
        } else if (subcmd === 'unlink') {
            await Schema.findOneAndDelete({ User: message.author.id })
            const unlinkedembed = new MessageEmbed()
                .setAuthor(`Your LastFM Username Has Been Unlinked`, 'https://www.last.fm/static/images/lastfm_avatar_twitter.52a5d69a85ac.png')
                .setColor('#FF0000')
            message.reply({ embeds: [unlinkedembed] })
        } else if (subcmd === 'help') {
            const lastfm = new Discord.MessageEmbed()
                .setColor("BLACK")
                .setAuthor('🎧 ·  LastFM')
                .setFooter(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                .setDescription(`
**np** Shows current playing track
**top/tab** Top 10 overall albums
**tar/artist** Top 10 overall artists
**recent** Last 10 played tracks
**ttt/tracks** Top 10 overall tracks.
**scrobbles** Total account scrobbles
**plays** Total plays on current track
**profile** LastFM profile
**color** Set embed color for now playing
**set** Connect lastfm account
**mode/style** Set a style from given options
**modereset/stylereset** Reset style to default
**unlink** Disconnect lastfm account
`)
            message.reply({ embeds: [lastfm] })
        }
    }
};
