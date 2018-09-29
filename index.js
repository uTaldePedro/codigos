const Discord = require('discord.js');
const bot = new Discord.Client();
const config = require('./config.json');

function changing_status() {
    let status = ['na Rede Hazard', 'Desenvolvido por givebot.weebly.com']
    let random = status[Math.floor(Math.random() * status.length)]
    bot.user.setActivity(random)
  }
  
  bot.on("ready", () => {
    console.log( `${bot.user.username} Online` );
    setInterval(changing_status, 9000);
  })

  bot.on('message', async message => {

    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    if(!message.content.startsWith(config.prefix)) return;


    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const comando = args.shift().toLowerCase();

    if(comando === `anuncio`) {
        message.delete();
        if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply('Desculpe, você não tem permissão para isto')
        const sayMessage = args.join(" ");
        let anuncio = new Discord.RichEmbed()
        .setColor("#FFFF00")
        .addField("📢 Anúncio", `${sayMessage}`)
        .addField(':pencil: Anunciado por:', `${message.author}`)
        .setTimestamp()
        .setThumbnail(bot.user.displayAvatarURL)
        .setFooter(`Desenvolvido por givebot.weebly.com`, message.author.displayAvatarURL)
        message.channel.send(anuncio);
      }
  })
bot.login(config.token);
