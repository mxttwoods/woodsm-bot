// Discord Bot

// import prop file
const {
  prefixCharacter,
  logDirectory,
  logName,
  botName,
} = require('./properties.json');
// import client library
const Discord = require('discord.js');
// import node file system
const fs = require('fs');
// import node string util
const util = require('util');
// import config object from <project root>
require('dotenv').config();
// init new client
const client = new Discord.Client();
// init commands collection: <map>
client.commands = new Discord.Collection();
// login with BOT_TOKEN
client.login(process.env.BOT_TOKEN);

/**
 * Logger
 * 1. Name logging directory
 * 2. Create time stamp
 * 3. Check if logging directory exists
 * 4. Capture stdout
 * 5. Capture stderr
 * 6. Write stderr & stdout to file
 */
// init timestamp
const timeStamp = `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`;
// if log directory doesn't exist write one
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
  console.log(`Made log folder at ${logDirectory}`);
}
// init logfile and write to logging directory
const logFile = fs.createWriteStream(`${logDirectory}/${logName}`, {
  flags: 'a',
});
// wrap stdout
const logStdout = process.stdout;
// wrap stderr
console.error = console.log;
// line count
var count = 0;
/**
 * Log Factory
 * @function
 */
console.log = function logFactory() {
  // roll back line count
  count += 1;
  // write console stream
  logFile.write(
    `[${count}] ${timeStamp} -> ${util.format.apply(null, arguments)}\n`
  );
  // write process stream
  logStdout.write(
    `[${count}] ${timeStamp} -> ${util.format.apply(null, arguments)}\n`
  );
};

/**
 * Database Connection
 */
const mongoose = require('mongoose');
mongoose.connect(`${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// init connection
const db = mongoose.connection;
// logging
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB ... ');
});
// record schema
const messageSchema = new mongoose.Schema({
  command: String,
  args: String,
  time: String,
});
// methods for a record object
messageSchema.methods.log = function () {
  console.log('Record saved to MongoDB ... ');
};
// compile model
const Log = mongoose.model('Log', messageSchema);

/**
 * Main Runtime
 * 1. Imports config object
 * 2. Starts new Discord.js client
 * 3. Init new client object
 * 4. Login with client object
 * 5. On !command get function from client.collection
 */
// log on start
console.log(`Starting: ${botName} ... `);
// if client running
if (client) {
  console.log('Starting Discord Client ... ');
}
// if client ready for messages
client.on('shardReady', readyShard);
function readyShard() {
  console.log(`Websockets connected ... `);
}
// if client logged in
if (client.login) {
  console.log(`Logging into Discord ... `);
}
// if client ready for messages
client.on('ready', readyDiscord);
function readyDiscord() {
  console.log(`Connected to Discord ... `);
}
// read all .js files in ./lib
const commandFiles = fs
  .readdirSync('./src/lib')
  .filter((file) => file.endsWith('.js'));
// for each file set a command in the collection: <map>
for (const file of commandFiles) {
  const command = require(`./lib/${file}`);
  client.commands.set(command.name, command);
}

/**
 * Global Message Handler
 * @function
 * @param {string} message - any message sent to the server
 */
client.on('message', (message) => {
  // if message doesn't start with prefixCharacter or came from another bot -> return
  if (!message.content.startsWith(prefixCharacter) || message.author.bot)
    return;
  // slice args from message content
  const args = message.content.slice(prefixCharacter.length).trim().split(/ +/);
  // shift case of args to lower case
  const command = args.shift().toLowerCase();
  // if no commands in collection -> return
  if (!client.commands.has(command)) return;
  // try to dispatch command to matching .cjs module
  try {
    // log input
    console.log(
      `A Command was issued ... \nCommand: ${command}, Arguments: ${args}`
    );
    /**
     * Main Thread
     * @function
     * @param {string} message - any message sent to the server
     * @param {string} args - comma separated value string
     */
    client.commands.get(command).execute(message, args);
    // new record
    const NewCommand = new Log({
      command: `${command}`,
      args: `${args}`,
      time: `${timeStamp}`,
    });
    // save new record
    NewCommand.save((err, NewCommand) => {
      if (err) {
        return console.error(err);
      }
      // call record method
      NewCommand.log();
      // log record
      console.log(NewCommand);
    });
    // catch errors
  } catch (error) {
    console.error(error);
    // generic error reply
    message.reply(
      `I ran into a problem processing this command -> '!${command}'`
    );
  }

  /**
   * Global Error Handling
   * @function
   */
  // catch all network layer errors
  client.on('shardError', (error) => {
    console.error('A websocket connection encountered an error: ', error);
  });
  client.on('warn', (warning) => {
    console.error('WARN: ', warning);
  });
  // catch all API errors
  process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection: ', error);
  });
});
