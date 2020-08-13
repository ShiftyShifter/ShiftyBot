const Discord = require('discord.js');
const {MessageAttachment, MessageEmbed } = require('discord.js');
const { prefix, token } = require('./config.json');
const client = new Discord.Client();
const PREFIX = '!';
if (typeof localStorage === "undefined" || localStorage === null)
{
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}   

const murqi = "737786524296282135";
const komutan = "397443899339309068";
const pleb = "401430400196411405";

var dice =
{
    sides: 6,
    roll: function ()
    {
      var randomNumber = Math.floor(Math.random() * this.sides) + 1;
      return randomNumber;
    },
    rps: function ()
    {
        var randomNumber2 = Math.floor(Math.random() * 3) + 1;
        if (randomNumber2 == 1)
        {
            return "taş";
        }
        if (randomNumber2 == 2)
        {
            return "kağıt";
        }
        else
        {
            return "makas";
        }
    }
}


client.once('ready', () =>
{
    console.log("ShiftyBot is online!");
});

client.on('message', message =>
{
    let args = message.content.substring(PREFIX.length).split(" ");
    switch(args[0])
    {
        case 'hi':
            message.react("🤔");
            //message.reply(message.author.displayAvatarURL());
            const attachment = new MessageAttachment('https://media.tenor.com/images/f047df15315c12e886d55b68a468e511/tenor.gif');
            message.reply(attachment);
            const embed = new MessageEmbed().setTitle('Commands').setColor(0xff0000).setDescription('mesajları temizlemek için !temizle');
            message.channel.send(embed);
            break;
        case 'bilgi':
            if(args[1] === "versiyon")
            {
                message.channel.send("Versiyon 1.0.1");
            }
            else{ message.channel.send(args[1] + " geçerli bir komut değil.");}
            break;
        case 'temizle':
            if(!args[1] || isNaN(args[1]))
            {
                return message.reply("Silinecek mesajın miktarını giriniz.");
            }
            message.channel.bulkDelete(args[1]);
            break;
        case 'ekle':
            if(args[1] === "pleb")
            {
                let member = message.mentions.members.first();
                member.roles.add(pleb);
            }
            else if(args[1] === "murqi")
            {
                let member = message.mentions.members.first();
                member.roles.add(murqi);
            }
            break;
        case 'zar':
            message.channel.send(dice.roll());
            break;
        case 'taşkağıtmakas':
            message.channel.send(dice.rps());
            break;
        case 'pin':
            let pinmessage;
            if(args[1] === pinmessage){
                message.pin(pinmessage);
            }   
    }
    //Message Tracker;
    var existing = localStorage.getItem('messagelogs');
    var data = existing ? existing + "ID: "+ message.author.username + " Content: " + message.content + " Date: " + message.createdAt+ "\n" : " ";
    localStorage.setItem('messagelogs', data);
});

client.login(token);



