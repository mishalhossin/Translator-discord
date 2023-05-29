const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Keep alive');
});

app.listen(3000);

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

  // Remove emojis from the message content
  const contentWithoutEmojis = message.content.replace(/:[a-zA-Z]+:/g, '');

  // Ignore messages with a single word or without any content after removing emojis
  if (contentWithoutEmojis.split(' ').length === 1 || !contentWithoutEmojis.trim()) return;

  try {
    const result = await detectLanguageClient.detect(contentWithoutEmojis);
    const detectedSourceLanguage = result[0].language;

    if (detectedSourceLanguage !== 'en') {
      const { text } = await translate(contentWithoutEmojis, { to: 'en' });
      message.channel.send(`\`${message.author.username} said:\` ${text}`);
    }
  } catch (error) {
    console.error(error);
    message.channel.send('Error: Unable to translate the message.');
  }
});

client.login(token);
