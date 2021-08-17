import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

import commands from "./commands";
import { BOT_TOKEN, CLIENT_ID, GUILD_ID } from "./helpers";

const rest = new REST({ version: "9" }).setToken(BOT_TOKEN);

const registerCommands = async () => {
  try {
    console.log("Started refreshing application (/) commands.");

    await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
      body: commands,
    });

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error.rawError);
  }
};
export default registerCommands;
