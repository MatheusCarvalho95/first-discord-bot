import { Channel, Client, Intents, TextChannel } from "discord.js";

import {
  BOT_TOKEN,
  getMapRotation,
  getPlayerInfo,
  getRandomImage,
  getRandomJoke,
  getServerStatus,
  PREFIX,
} from "./helpers";
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
  });

  client.on("messageCreate", async ({ author, content, channel }) => {
    const itsTimeChannel = client.channels.cache.get("877289658579578920");
    if (author.bot) return;
    if (content === `${PREFIX}call`) {
      (itsTimeChannel as TextChannel).send(
        `@here, ${author.username} is calling you to play Apex Legends , lets play, friends!`,
      );
    }
    if (content.startsWith(`${PREFIX}user_info`)) {
      const query = content.split(" ", 2);
      if (!query[1]) return;
      channel.send("Okay friend, i'm gonna get some info for ya");
      const info = await getPlayerInfo(query[1]);
      channel.send(info);
    }
    if (content.startsWith(`${PREFIX}map_rotation`)) {
      channel.send("Okay friend, gunna scout sum maps");
      const info = await getMapRotation();
      channel.send(info);
    }

    if (content.startsWith(`${PREFIX}server_status`)) {
      channel.send("Okay friend, these are the server status:");
      const info = await getServerStatus();
      channel.send(info);
    }
  });
};

export const sendDailyMessage = () => {
  const itsTimeChannel = client.channels.cache.get("877289658579578920");
  (itsTimeChannel as TextChannel).send("@here, it's time friends!");
};

export default startBot;
