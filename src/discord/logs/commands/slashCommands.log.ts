import { createEvent } from "#base";
import { commandSlashLog } from "../../../functions/utils/commandslogs.js";

createEvent({
    name: "slashCommandsEventLog",
    event: "interactionCreate",
    async run(interaction) {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.command?.name === "avaliar") return;

        await commandSlashLog(interaction);
    }
});