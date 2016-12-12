var TelegramBot  = require('node-telegram-bot-api');
var fs           = require('fs');
var Transmission = require('transmission');
var config       = require('config');

// replace the value below with the Telegram token you receive from @BotFather
var token = config.get('telegram.token');
var downloadFolder = config.get('downloadFolder');
var transmission = new Transmission({
  'host': config.get('transmission.host'),
  'port': config.get('transmission.port'),
  'username': config.get('transmission.username'),
  'password': config.get('transmission.password'),
});

// Create a bot that uses 'polling' to fetch new updates
var bot = new TelegramBot(token, { polling: true });

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('document', function (msg) {
  var chatId = msg.chat.id;

  console.log(msg);

  bot.downloadFile(msg.document.file_id, downloadFolder).then(function (filePath) {
    var absoluteFile = downloadFolder + '/' + msg.document.file_name;

    fs.rename(filePath, absoluteFile, function (err, response) {
      if (err) {
        return console.log(err);
      }

      console.log('File has been renamed');

      if (msg.document.mime_type === 'application/x-bittorrent') {
        transmission.addFile(absoluteFile, function (err, arg) {
          if (err) {
            bot.sendMessage(chatId, "An error occured when trying to add torrent to transmission %j");
            console.log(err.message);
          } else {
            bot.sendMessage(chatId, "File added to transmission");
          }
        })
      } else {
        bot.sendMessage(chatId, "Files has been downloaded");
      }
    });
  });

});
