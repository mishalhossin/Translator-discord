const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Keep alive')
})

app.listen(3000)

const dotenv = require('dotenv');
const Discord = require('discord.js');
const { translate } = require('@vitalets/google-translate-api');
const DetectLanguage = require('detectlanguage');

dotenv.config();
const client = new Discord.Client({ intents: [3276799] });

const apiKey = process.env.DETECTLANGUAGE_API_KEY;
const detectLanguageClient = new DetectLanguage(apiKey);

const token = process.env.TOKEN;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  // Ignore messages with a single word
  if (message.content.split(' ').length === 1) return;

  // Ignore messages containing emojis like :skull:
  if (message.content.match(/:[a-zA-Z]+:/)) return;

  try {
    const result = await detectLanguageClient.detect(message.content);
    const detectedSourceLanguage = result[0].language;

    if (detectedSourceLanguage !== 'en') {
      const { text } = await translate(message.content, { to: 'en' });
      message.channel.send(`\`${message.author.username} said:\` ${text}`);
    }
  } catch (error) {
    console.error(error);
    message.channel.send('Error: Unable to translate the message.');
  }
});

client.login(token);
