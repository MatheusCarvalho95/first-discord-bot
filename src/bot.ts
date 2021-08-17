import { Client, Intents } from "discord.js";
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
import * as dotenv from "dotenv";
import { getRandomImage, getRandomJoke } from "./helpers";

dotenv.config();

const startBot = async () => {
  client.login(process.env.BOT_TOKEN);

  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
      await interaction.reply("Pong!");
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
      await interaction.reply("@here Lets play some Apex Legends");
      await interaction.followUp("@here");
    }
  });
};

export default startBot;
