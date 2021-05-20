const fs = require('fs')
const util = require('util')
const mongoose = require('mongoose')
const Discord = require('discord.js')

// new database connection
const db = mongoose.connection

// new discord client
const client = new Discord.Client()

// time stamp
const time = `${new Date().toDateString()} ${new Date().toLocaleTimeString()}`

// command files
const lib = fs.readdirSync('./src/lib').filter((file) => file.endsWith('.js'))

// import bot properties
const { prefixCharacter, logDirectory, logName, botName } = require('./properties.json')

// write log file
const logFile = fs.createWriteStream(`${logDirectory}/${logName}`, { flags: 'a' })
let i = 0
console.log(`Starting: ${botName} ... `)

// new empty collection tuple
client.commands = new Discord.Collection()

// import node .env
require('dotenv').config()

// create log dir
if (!fs.existsSync(logDirectory)) { fs.mkdirSync(logDirectory) }

// wrap console.log
console.log = function () {
  i += 1
  const msg = `[${i}] ${time} ${util.format.apply(null, arguments)}\n`
  // write to log file
  logFile.write(msg)
  // print to console
  process.stdout.write(msg)
}

// import each command file into the collection
for (const file of lib) {
  const command = require(`./lib/${file}`)
  client.commands.set(command.name, command)
}

// database connection
mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })

// database messaging
db.on('error', () => console.error.bind(console, 'Database Connection Error: '))
db.once('open', () => console.log('Database is Ready ... '))

// mongo schema object
const logSchema = new mongoose.Schema({ command: String, args: String, time: String })
logSchema.methods.log = console.log('Record saved to MongoDB ... ')
const Log = mongoose.model('Log', logSchema)

// node messaging
process.on('unhandledRejection', (error) => console.error('Unhandled Promise Rejection Error: ', error))

// client messaging
client.login(process.env.BOT_TOKEN)
client.on('shardReady', () => console.log('Websockets are connected ... '))
client.on('ready', () => console.log('Connected to Discord ... '))
client.on('shardError', (error) => console.error('Websocket Error: ', error))
client.on('warn', (warning) => console.error('WARNING: ', warning))
client.on('message', (message) => {
  // if message doesnt have the prefix or is from another bot exit
  if (!message.content.startsWith(prefixCharacter) || message.author.bot) return
  // strip off the "!"
  const args = message.content.slice(prefixCharacter.length).trim().split(/ +/)
  // shift args to lower case
  const command = args.shift().toLowerCase()
  // if no command is found in the collection exit
  if (!client.commands.has(command)) return
  try {
    console.log(`A Command was issued ... \nCommand: ${command}, Arguments: ${args}`)
    // run the execute function on the module matching the command
    client.commands.get(command).execute(message, args)
    // create a new Log({}) object to be saved
    const cmd = new Log({ command: command, args: args, time: time })
    // save the object to mongodb
    cmd.save((err, savedCommand) => {
      savedCommand.log()
      if (err) { console.error(err) }
    })
  } catch (error) {
    console.error(error)
    // reply to the user
    message.reply(`I ran into a problem while processing this command -> '!${command}'`)
  }
})
