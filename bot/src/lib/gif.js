const fetch = require('node-fetch')

module.exports = {
  name: 'gif',
  description: 'Reply with a GIF from the TENOR Image API.',
  // args: true,
  execute (message, args) {
    async function getGif (tokens) {
      // catch all blank space for URL
      if (tokens.length > 0) {
        // if blank space re assign tokens without
        tokens = tokens.join(' ')
      }
      const url = `https://api.tenor.com/v1/search?q=${tokens}&key=${process.env.TENORKEY}`
      console.log(`Fetching: ${url}`)
      const response = await fetch(url)
      const json = await response.json()
      const index = Math.floor(Math.random() * json.results.length)
      message.channel.send(json.results[index].url)
      message.react('😄')
      message.reply('I found this GIF')
    }
    getGif(args)
  }
}
