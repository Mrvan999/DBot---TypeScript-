import { createEvent } from "#base";
import { brBuilder } from "@magicyan/discord";
import { commandPrefixLog } from "../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../functions/utils/emojis.js";

const commandsList = [
    {
        command: "!help",
        description: "Mostra esta mensagem de ajuda."
    },
    {
        command: "!botinfo",
        description: "Mostra informações sobre o bot e seus desenvolvedores."
    },
    {
        command: "!uptime",
        description: "Mostra há quanto tempo o bot está online."
    },
    {
        command: "!tag",
        description: "Exibe uma mensagem salva no banco de dados."
    },
    {
        command: "!tags",
        description: "Exibe uma lista com todas as tags salvas no banco de dados."
    },
    {
        command: "!createtag",
        description: "Salva uma mensagem no banco de dados."
    },
    {
        command: "!deletetag",
        description: "Deleta uma mensagem no banco de dados."
    }
];

createEvent({
    name: "helpPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith("!help")) return;

        await commandPrefixLog(message);

        const args = message.content.split(/\s+/).slice(1);
        const arg = args[0];

        if (!arg || arg === "--help") {
            const helpMessage = commandsList.map(cmd => `\`${cmd.command}\` → ${cmd.description}`).join("\n");

            await message.channel.send({
                content: brBuilder(
                    "**Comandos disponíveis:**",
                    "",
                    helpMessage
                )
            });
            return;
        }
        
        await message.channel.send({
            content: `${icon.action_x} Argumento desconhecido. Use \`!help\`.`
        });
    }
});
