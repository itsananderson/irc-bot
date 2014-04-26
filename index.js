var config = {
    channel : process.env.IRC_BOT_CHANNEL,
    server : "irc.freenode.net",
    botName : process.env.IRC_BOT_NAME,
    botOwner : process.env.IRC_BOT_OWNER,
    botOwnerPwd : process.env.IRC_BOT_OWNER_PWD
};

var irc = require("irc");

var bot = new irc.Client(config.server, config.botName, {autoConnect: false});

bot.connect(function() {
    bot.say('NickServ', 'IDENTIFY ' + config.botOwner + ' ' + config.botOwnerPwd);
    setTimeout(function() { bot.join(config.channel) }, 1000);
});

bot.on('message#', function(user, channel, text, message) {
    console.log(channel + " - " + user + ": " + text);
});

bot.on('notice', function(user, channel, text, message) { 
    console.log('NOTICE: ' + channel + " - "  + text);
});

bot.on('pm', function(user, channel, text, message) {
    console.log(channel + " - " + user + ": " + text);
});

module.exports = bot;
