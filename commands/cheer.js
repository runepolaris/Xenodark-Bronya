module.exports = {
  exec: (client, message, content, args) => {
    if (args) message.send("Let's do this, " + args + "-[s]! You can do it!", "smile")
    else message.send("Good luck, Captain! You can do it!", "smile");
  }
}
