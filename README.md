# Discord Translator Bot

This is a Node.js application that uses the Discord.js library to translate messages sent to a Discord server from languages other than English, into English.

## Prerequisites

To use this application, you will need the following:

- A Discord bot token [Discord dev portal](https://discord.com/developers/applications)
- A Discord server where you have permission to add bots
- A DetectLanguage API key [DetectLangAPI](https://detectlanguage.com) # dont worry its free

## Installation

1. Clone this repository
2. Run `npm install` to install the required dependencies.
3. Create a `.env` file in the root directory of the application and add the following environment variables:

```
TOKEN=your_discord_bot_token
DETECTLANGUAGE_API_KEY=your_detectlanguage_api_key
```

4. Replace `your_discord_bot_token` with your [Discord bot token](https://discord.com/developers/applications), `your_detectlanguage_api_key` with your [DetectLanguage API key](https://detectlanguage.com)
5. Run `npm start` to start the application.

## Usage

To use the translator bot, add it to your Discord server and type a message in a language other than English. The bot will automatically detect the language of the message and translate it to English. This will ignore emojis :P

