const {Client,Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const {token} = require("./config.json");
const births = require("./births.js");
require('dotenv').config();
const fs = require('fs');
const head_link = "https://www.cbc.gov.tw/public/data/issue/money/images/50-new_1.jpg";
const tail_link = "https://www.cbc.gov.tw/public/data/issue/money/images/50-new_2.jpg";
let greatSadnessPoem = "南無喝囉怛那哆囉夜耶。南無阿唎耶。婆盧羯帝爍缽囉耶。菩提薩埵婆耶。摩訶薩埵婆耶。摩訶迦盧尼迦耶。唵。薩皤囉罰曳。數怛那怛寫。南無悉吉栗埵伊蒙阿唎耶。婆盧吉帝室佛囉楞馱婆。南無那囉謹墀。醯唎摩訶皤哆沙咩。薩婆阿他豆輸朋。阿逝孕。薩婆薩哆那摩婆伽。摩罰特豆。怛姪他。唵阿婆盧醯。盧迦帝。迦羅帝。夷醯唎。摩訶菩提薩埵。薩婆薩婆。摩囉摩囉。摩醯摩醯唎馱孕。俱盧俱盧羯蒙。度盧度盧罰闍耶帝。摩訶罰闍耶帝。陀囉陀囉。地唎尼。室佛囉耶。遮囉遮囉。麼麼罰摩囉。穆帝隸。伊醯移醯。室那室那。阿囉參佛囉舍利。罰沙罰參。佛囉舍耶。呼盧呼盧摩囉。呼盧呼盧醯利。娑囉娑囉。悉唎悉唎。蘇嚧蘇嚧。菩提夜菩提夜。菩馱夜菩馱夜。彌帝唎夜。那囉謹墀。地利瑟尼那。婆夜摩那。娑婆訶。悉陀夜。娑婆訶。摩訶悉陀夜。娑婆訶。悉陀喻藝。室皤囉夜。娑婆訶。那囉謹墀。娑婆訶。摩囉那囉。娑婆訶。悉囉僧阿穆佉耶。娑婆訶。娑婆摩訶阿悉陀夜。娑婆訶。者吉囉阿悉陀夜。娑婆訶。波陀摩羯悉哆夜。娑婆訶。那囉謹墀皤伽囉耶。娑婆訶。摩婆利勝羯囉夜。娑婆訶。南無喝囉怛那哆囉夜耶。南無阿利耶。婆羅吉帝。爍皤囉夜。娑婆訶。唵悉殿都。漫多囉。跋陀耶。娑婆訶。 ";
let heartpoem = "觀自在菩薩。行深般若波羅蜜多時。照見五蘊皆空。度一切苦厄。舍利子。色不異空。空不異色。色即是空。空即是色。受想行識。亦復如是。舍利子。是諸法空相。不生不滅。不垢不淨。不增不減。是故空中無色。無受想行識。無眼耳鼻舌身意。無色聲香味觸法。無眼界。乃至無意識界。無無明。亦無無明盡。乃至無老死。亦無老死盡。無苦集滅道。無智亦無得。以無所得故。菩提薩埵。依般若波羅蜜多故。心無罣礙。無罣礙故。無有恐怖。遠離顛倒夢想。究竟涅槃。三世諸佛。依般若波羅蜜多故。得阿耨多羅三藐三菩提。故知般若波羅蜜多。是大神咒。是大明咒。是無上咒。是無等等咒。能除一切苦。真實不虛。故說般若波羅蜜多咒。即說咒曰。揭諦揭諦　波羅揭諦　波羅僧揭諦　菩提薩婆訶";

let unhelp = "Do you think I will actually be this NICE to you by adding a help message? Of course not, I am the most evil being known to humankind. (Please laugh now) Figure out how to use me BY YOURSELF!!!";
let help = "`?!help` => display this message.\n`?!count` => count. provide start number and end number.\n`?!ping` => ping the bot.\n`?!error` => throw an error. Limited to the bot's author. \n`?!greatcompassionmantra` => print 大悲咒\n`?!heartsutra` => print 般若波羅蜜多\n`?!flip` => flip a virtual coin. provide a side of your choosing and how much you'd like to bet. \n`?!birth` => say happy birthday to anyone in my database. \n`?!addbirth` => add your birthday! Usage: ```?!addbirth year(in AD) month(1~12) day(1~31)```\n`?!spam` => send spam. provide the message and number of messages. people other than the author is limited to sending 20 messages.\n`?!optout` => Out-out of DMs. \n`?!listxp` => list your xp's across servers. \n`?!safelistxp` => list your xp in this server.";


let whitelist = ["1035160611077754910", "1033337146205012039", "978555497496076288"];

var optout = require('./optout.js');

let expData = {};
try {
  expData = require('./exp.json');
} catch (error) {
  console.error('Failed to load exp.json file:', error);
}

const getLevel = (xp) => {
  return Math.floor(xp / 150);
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.channels.cache.get('970458238199955479').send("我上線拉");
    client.channels.cache.get('980670536965316630').send("我上線拉");
});

client.on("message", msg => {
    const d = new Date();
    var commands = msg.content.split(' ');
    var command = commands[0];

    if (command === "?!ping") {
        msg.channel.send(`Pong! \nLatency is ${Date.now() - msg.createdTimestamp}ms, and API Latency is ${Math.round(client.ws.ping)}ms!`);

    } else if (command === "?!error") {
        if (msg.author.id == '931727225017999441') {
            msg.reply();
        } else {
            msg.reply("Permissions not sufficient. Only the bot's author can use this function.")
        }
    } else if (command === "?!heartsutra") {
        msg.reply(heartpoem);

    } else if (command === "?!greatcompassionmantra") {
        msg.reply(greatSadnessPoem);

    } else if (command === "?!help") {
        var ans = getRndInteger(1, 4);
        if (ans <= 3) {
            msg.reply(help);
        } else {
            msg.reply(unhelp);
        }
    } else if (command === "?!count") {

        var start = commands[1];
        var end = commands[2];
        var string = "";

        if (start < end) {
            for (var i = start; i <= end; i++) {
                
                if (string.length + i.toString.length <= 1800) {
                    string += ('' + i + '\n');
                } else {
                    msg.channel.send(string);
                    string = "" + i + "\n";
                }


                
            }
        }
        if (string != "") {
            msg.channel.send(string);
        } else {
            msg.reply("Input not expected. Usage: `?!count (start integer) (end integer)`");
        }
    } else if (command === "?!birth") {
        let month = d.getMonth() + 1;
        let date = d.getDate();
        let year = d.getFullYear();
        let age = year - 2009;

        var names = [];
        var ages = [];
        
        for(var i = 0; i < births.length; i++ ){
          if(month == births[i][2] && date == births [i][3]){
            

            names.push(String(births[i][0]));
            ages.push(String(year - births[i][1]));
          }
        }


        
        if (names.length >= 1) {
          if (names.length == 1){
            reply = "Happy birthday <@" + names + "> ! You're now " + ages + " years old!!!"
          } else {
            var reply = "";
            for(var i = 0; i < names.length; i++){
              
              reply += "Happy birthday <@" + names[i] + "> ! You're now " + ages[i] + " years old!!!\n"
              
              
            }
          }

          if (reply != ""){
            msg.reply(reply);
          } 
        } else {
            msg.reply("What are you doing here? Today is not anyone's birthday!!!\n\n\n(at least, that's what my database says. If your birthday is not listed, consider using `?!addbirth`. Usage: ```?!addbirth year(in AD) month(1~12) day(1~31)```Also, please do not scold the author a bit bc i already put it in ok?");
        }

    } else if (command === "?!flip") {

        var face = commands[1];
        var bet = commands[2];
        
        if ((face == 'h' || face == 't') && bet > 0 && bet % 2 == 0) {
            var result = getRndInteger(0, 1);
            if (result == 0) {
                result = 'h'
                msg.reply(head_link);
            } else {
                result = 't'
                msg.reply(tail_link);
            }
            if (face == result) {
                msg.reply("You won " + 0.5 * bet + " Yee$!!!");
            } else {
                msg.reply("You lost " + 0.5 * bet + " Yee$!!!");
            }
        } else {
            var result = getRndInteger(0, 1);
            if (result == 0) {
                result = 'h'
                msg.reply(head_link);
            } else {
                result = 't'
                msg.reply(tail_link);
            }
        }

    } else if (command == "?!spam") {
        var usr = commands[1];
        var times = commands[2];
        if (times == "") {
            times = 1;
        }
        if (msg.author.id == '931727225017999441' || times <= 20) {
            for (var i = 1; i <= times; i++) {
                msg.channel.send(usr);
            }
        } else {
            msg.reply("<@" + msg.author.id + "> Permissions not sufficient. People other than the bot author is limited to sending 20 messages.")
        }
    } else if (command == "?!modtest"){
        /*
        testABC.push("b");

        console.log(testABC);
        fs.writeFileSync('./test.js', "let test = " + JSON.stringify( testABC ) + ";\n\nmodule.exports =  test ;");
        var testDEF = require('./test.js');
        msg.reply("<@" + "931727225017999441" + "> ");*/

      
    } else if (command == "?!addbirth"){
        var useridisinlist = true;
        var userID = msg.author.id;
        for (var i = 0; i < births.length; i++){
          if (userID != births[i][0]){
            

            if (i == births.length - 1){
              
              useridisinlist = false;
              break;
            }
            if (i != births.length - 1){
              
            continue;} 
          } else{
            userisinlist = true;
            break;
          }
          useridisinlist = true;
        }
        console.log(useridisinlist);
        //births
        if (useridisinlist == true){
          msg.reply("you already entered your birthday");
        } else {
        var yearG = parseInt(commands[1]);
        var monthG = parseInt(commands[2]);
        var dayG = parseInt(commands[3]);
      
        births.push([userID, yearG, monthG, dayG]);

        

      
        fs.writeFileSync('./births.js', "let births = " + JSON.stringify( births ) + ";\n\nmodule.exports =  births ;");
        
        msg.reply("Successfully added");
        }
      
    } else if (command == "?!optout"){
        const user = msg.author;
        if (!optout.includes(user)){
          optout.push(user.id)
          //console.log(test);
          
          let fileContent = `let test = ${JSON.stringify(optout)};\n\nmodule.exports = test;`;
          fs.writeFileSync('./optout.js', fileContent);
          //fs.writeFileSync('./optout.js', "let test = " + JSON.stringify( optout ) + "," + user + ";\n\nmodule.exports =  test ;");
        
          msg.reply("<@" + msg.author.id + "> Successfully opted out of DMs. ");
        } else {
          msg.reply("Already opted out")
        }
    } else if (command == "?!listxp") {
      
      if (!expData[msg.author.id]) {
        msg.reply("You don't have any XP data.");
        return;
      }

      const user = msg.author;
      const guildXP = expData[msg.author.id];

      let response = `XP and Level in each guild:\n`;
      for (const guildId in guildXP) {
        const guild = client.guilds.cache.get(guildId);
        const guildName = guild.name;
        const xp = guildXP[guildId];
        const level = getLevel(xp);
        
        if (whitelist.includes(guildId) || msg.author.id == "931727225017999441"){
          
          response += `Guild: ${guildName}, XP: ${xp}, Level: ${level}\n`;
        }
      }

      msg.reply(response);
  

      
    } else if (command == "?!safelistxp") {
      
      if (!expData[msg.author.id]) {
        msg.reply("You don't have any XP data.");
        return;
      }

      const user = msg.author;
      const guildXP = expData[msg.author.id];

      let response = `XP and Level in this guild:\n`;
      for (const guildId in guildXP) {
        const guild = client.guilds.cache.get(guildId);
        const guildName = guild.name;
        const xp = guildXP[guildId];
        const level = getLevel(xp);
        
        if ([msg.guild.id].includes(guildId) && whitelist.includes(guildId)){
          
          response += `Guild: ${guildName}, XP: ${xp}, Level: ${level}\n`;
        }
      }

      msg.reply(response);
  

      
    } else if (command == "?!delete"){
      /*client.channels.fetch(1099586605578190918).then(channel => {
        channel.messages.delete(1099627579687849985);
      });*/



      
      //channel.messages.delete("1099627579687849985");
    } else {
        /*
        if (command[0] != '&'){
        // all other messages go here
        /*
        //Pseudocode
        
        //1. lookup the sender's ID
        var sender = msg.author.id;
        //2. create json, add 1
        var exp = require("./exp.txt");
        var list = exp.content.split('\n');
        var finalIteration;
        for (var i = 0; i < list.length ; i++){
          var currentIdAndScore = list[i].content.split(' ');
          if (currentIdAndScore[0] == sender){
            
            finalIteration = i;
            break;
            
          } else if(i == list.length - 1  ) {
            fs.appendFile('./exp.txt', sender + " 1" ,                 function (err) {
            if (err) throw err;
            console.log('Saved!');
          });

          }
        }
        var finalScore = list[finalIteration][1];
        //3. if json value % 10 == 0
        // if guild id == Konesons
        // 
        // return level in channel
        
        // 4. 
        
        
        }  */




  if (msg.author.bot || !msg.guild || command[0] == '&') {
    return;
  }

  if (typeof expData[msg.author.id] != 'undefined'){
    var oldLevel = getLevel(expData[msg.author.id][msg.guild.id] );
  } else {
    var oldlevel = 0;
  }

  if (typeof oldlevel == 'undefined'){
    oldlevel = 0;
  }
  // Generate a random XP value between 3 and 5
  const xp = Math.floor(Math.random() * 3) + 3;

  console.log(expData[msg.author.id][msg.guild.id]);
  // Add the user's ID, server's ID, and XP value to expData
  if (!expData[msg.author.id]) {
    expData[msg.author.id] = {};
  }
  if (!expData[msg.author.id][msg.guild.id]) {
    expData[msg.author.id][msg.guild.id] = 0;
  }
  expData[msg.author.id][msg.guild.id] += xp;

  // Check if level changed
  console.log(expData[msg.author.id][msg.guild.id]);
  const newLevel = getLevel(expData[msg.author.id][msg.guild.id]);
  if (newLevel > oldLevel) {
    // Send a DM to the user with level change information
    const user = msg.author;
    const guildName = msg.guild.name;
    const currentXP = expData[msg.author.id][msg.guild.id];
    const level = newLevel;
    //console.log("ok comparison");
    /*console.log(!optout.includes(parseInt(user.id)) || !optout.includes(user.id));
    console.log(user.id == 931727225017999500);
    console.log(optout);*/
    if ((!optout.includes(parseInt(user.id)) /* int */|| !optout.includes(user.id)/* string */) && whitelist.includes(msg.guild.id)/* in ok guild */){
      user.send(`Hello, ${user}!\nYou now have ${currentXP} XP in ${guildName}! You are now at Level ${level}! Opt-out of DMs by using ?!optout. `);
      console.log("ok send" + msg.author.tag + currentXP + "," + level);
    }
  }

  // Save expData to exp.json file
  fs.writeFile('./exp.json', JSON.stringify(expData, null, 2), (error) => {
    if (error) {
      console.error('Failed to save expData to exp.json file:', error);
    }
  });

    }
});



client.login(token);
