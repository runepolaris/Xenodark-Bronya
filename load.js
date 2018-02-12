var auth = require('./config.py');
constconst fs = require('fs');
module.exports = (client, callback) => {
  let commandList = fs.readdirSync('./commands/');
  client.commandRegex = [];
  client.commands = {};

  client.emote = { 
    "default": "http://houkai3rd.arthobbylab.com/wp-content/uploads/sites/2/2017/08/Bronya-10_thumb.png", 
    "serious": "http://houkai3rd.arthobbylab.com/wp-content/uploads/sites/2/2017/08/Bronya-11_thumb.png",
    "embarassed": "http://houkai3rd.arthobbylab.com/wp-content/uploads/sites/2/2018/02/bronya-one-year-anniversary_thumb.png", 
    "flustered": "http://houkai3rd.arthobbylab.com/wp-content/uploads/sites/2/2017/08/Bronya-10_thumb.png", 
    "smile": "http://houkai3rd.arthobbylab.com/wp-content/uploads/sites/2/2017/08/Bronya-12_thumb.png" 
  }

  loadTime = Date.now();
  for (i = 0; i < commandList.length; i++) {
    let item = commandList[i];
    if (item.match(/\.js$/)) {
      taken = Date.now() - loadTime;
      loadTime += taken;
      delete require.cache[require.resolve(`./commands/${item}`)];
      client.commands[item.slice(0, -3).replace(/-/g, ' ')] = require(`./commands/${item}`);
      client.commands[item.slice(0, -3).replace(/-/g, ' ')].count = 0;
      client.commandRegex.push(`\\b${item.slice(0, -3).replace(/-/g, ' ')}\\b`);
      console.log(`Command ${item.slice(0, -3)} loaded. Took ${taken}ms`);
    }
  }
  client.commandRegex = new RegExp(client.commandRegex.join('|'));
  callback();
}
