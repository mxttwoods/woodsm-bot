module.exports = {
  name: 'sum',
  description: 'Reply with the sum of the args in the message.',
  execute (message, args) {
    if (args === 0) {
      message.reply(`You didn't provide any arguments with -> '${message}'!`)
      return
    }
    const numArgs = args.map((x) => {
      return parseFloat(x)
    })
    const sum = numArgs.reduce((counter, x) => {
      return (counter += x)
    })
    if (!Number.isNaN(sum)) {
      message.reply(`The sum of all the arguments you provided is -> ${sum}!`)
    } else {
      message.reply(
        `You didn't provide any arguments with a valid typeof: <int> -> '${message}'!`
      )
    }
  }
}
