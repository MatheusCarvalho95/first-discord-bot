import { Client, Intents, TextChannel } from "discord.js";

import { BOT_TOKEN, getRandomImage, getRandomJoke } from "./helpers";
import cron from "cron";

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

const startBot = async () => {
  client.login(BOT_TOKEN);
  const dailyApexReminder = new cron.CronJob("30 11 * * *", sendDailyMessage);
  dailyApexReminder.start();

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply(`Websocket heartbeat: ${client.ws.ping}ms.`);
    }
    if (interaction.commandName === "hello") {
      await interaction.reply("Oh, hello there!");
    }

    if (interaction.commandName === "play") {
      interaction.options;
    }

    if (interaction.commandName === "gif") {
      const query = interaction.options.getString("query", false);
      const image = await getRandomImage(query);
      await interaction.reply(image);
    }

    if (interaction.commandName === "joke") {
      const joke = await getRandomJoke();
      await interaction.reply(joke.setup);
      await interaction.followUp(joke.punchline);
    }

    if (interaction.commandName === "call") {
      await interaction.channel.send(
        "@here Lets play some Apex Legends, friends!",
      );
      await interaction.reply("I called your friends!");
    }
  });
};

export const sendDailyMessage = () => {
  const channel = client.channels.cache.get("877289658579578920");

  (channel as TextChannel).send("@here, it's time friends!");
};

export default startBot;
