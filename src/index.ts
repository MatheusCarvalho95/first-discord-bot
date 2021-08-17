import startBot from "./bot";
import registerCommands from "./register_commands";

const index = async () => {
  await registerCommands();
  await startBot();
};

index();
