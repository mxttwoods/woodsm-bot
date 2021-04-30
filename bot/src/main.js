// Discord Bot

const Discord = require('discord.js')
const fs = require('fs')
const util = require('util')
const client = new Discord.Client()

const {
  prefixCharacter,
  logDirectory,
  logName,
  botName
} = require('./properties.json')

require('dotenv').config()
client.commands = new Discord.Collection()
client.login(process.env.BOT_TOKEN)

/**
 * Logger
 *
 * 1. Name logging directory
 * 2. Create time stamp
 * 3. Check if logging directory exists
 * 4. Capture stdout
 * 5. Capture stderr
 * 6. Write stderr & stdout to file
 */
const timeStamp = `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory)
  console.log(`Made log folder at ${logDirectory}`)
}
const logFile = fs.createWriteStream(`${logDirectory}/${logName}`, {
  flags: 'a'
})
const logStdout = process.stdout
console.error = console.log
let count = 0

/**
 * Log Factory
 *
 * @function
 */
console.log = function logFactory () {
  count += 1
  logFile.write(
    `[${count}] ${timeStamp} -> ${util.format.apply(null, arguments)}\n`
  )
  logStdout.write(
    `[${count}] ${timeStamp} -> ${util.format.apply(null, arguments)}\n`
  )
}

// db connection
const mongoose = require('mongoose')

mongoose.connect(`${process.env.DB_URL}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Connected to MongoDB ... ')
})

const messageSchema = new mongoose.Schema({
  command: String,
  args: String,
  time: String
})

messageSchema.methods.log = function () {
  console.log('Record saved to MongoDB ... ')
}
const Log = mongoose.model('Log', messageSchema)

/**
 * Startup
 *
 * 1. Imports config object
 * 2. Starts new Discord.js client
 * 3. Init new client object
 * 4. Login with client object
 * 5. On !command get function from client.collection
 */
console.log(`Starting: ${botName} ... `)
if (client) {
  console.log('Starting Discord Client ... ')
}

client.on('shardReady', readyShard)
function readyShard () {
  console.log('Websockets connected ... ')
}

if (client.login) {
  console.log('Logging into Discord ... ')
}

client.on('ready', readyDiscord)
function readyDiscord () {
  console.log('Connected to Discord ... ')
}

const commandFiles = fs
  .readdirSync('./src/lib')
  .filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./lib/${file}`)
  client.commands.set(command.name, command)
}

/**
 * Global Message Handler
 * @function
 * @param {string} message - any message sent to the server
 */
client.on('message', (message) => {
  if (!message.content.startsWith(prefixCharacter) || message.author.bot) {
    return
  }

  const args = message.content.slice(prefixCharacter.length).trim().split(/ +/)
  const command = args.shift().toLowerCase()

  if (!client.commands.has(command)) return

  try {
    console.log(
      `A Command was issued ... \nCommand: ${command}, Arguments: ${args}`
    )

    /**
     * Main Thread
     *
     * @function
     * @param {string} message - any message sent to the server
     * @param {string} args - comma separated value string
     */
    client.commands.get(command).execute(message, args)

    const NewCommand = new Log({
      command: `${command}`,
      args: `${args}`,
      time: `${timeStamp}`
    })

    NewCommand.save((err, savedCommand) => {
      if (err) {
        return console.error(err)
      }
      savedCommand.log()
      console.log(savedCommand)
    })
  } catch (error) {
    console.error(error)
    message.reply(
      `I ran into a problem processing this command -> '!${command}'`
    )
  }

  // global error handling
  client.on('shardError', (error) => {
    console.error('A websocket connection encountered an error: ', error)
  })
  client.on('warn', (warning) => {
    console.error('WARN: ', warning)
  })
  process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection: ', error)
  })
})
