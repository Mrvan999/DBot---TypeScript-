import { createEvent } from "#base";
import { brBuilder } from "@magicyan/discord";
import { commandPrefixLog } from "../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../functions/utils/emojis.js";

createEvent({
    name: "botinfoPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith("?botinfo")) return;

        await commandPrefixLog(message);

        const args = message.content.split(/\s+/).slice(1);
        const arg = args[0];

        if (!arg) {
            await message.channel.send({
                content: constants.botinfo.description
            });
            return;
        }

        if (arg === "--version") {
            await message.channel.send({
                content: `${icon.clipboard} Atualmente estou na versão **${constants.botinfo.version}**`
            });
            return;
        }

        if (arg === "--devs") {
            await message.channel.send({
                content: `${icon.user_users} Esses são meus desenvolvedores: **${constants.botinfo.devs}**`
            });
            return;
        }

        if (arg === "--base") {
            await message.channel.send({
                content: `${icon.user_users} Eu uso a ${constants.botinfo.base} como base.`
            });
            return;
        }

        if (arg === "--show-easteregg") {
            await message.channel.send({
                content: constants.botinfo.easteregg
            });
            return;
        }

        if (arg === "--help") {
            await message.channel.send({
                content: brBuilder(
                    `${icon.other_terminal} **Comandos do ?botinfo**:`,
                    "",
                    "`?botinfo`               → Veja a descrição do bot",
                    "`?botinfo --version`     → Veja a versão atual do bot",
                    "`?botinfo --devs`        → Veja os desenvolvedores",
                    "`?botinfo --base`        → Veja a base do bot"
                )
            });
            return;
        }

        await message.channel.send({
            content: `${icon.action_x} Argumento desconhecido. Use \`!botinfo --help\`.`
        });
    }
});
