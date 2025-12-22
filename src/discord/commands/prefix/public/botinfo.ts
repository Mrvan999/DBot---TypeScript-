import { createEvent } from "#base";
import { commandPrefixLog } from "../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { botinfoCommandHelpContainer } from "../../../containers/commands/prefix/public/botinfo/help.js";

createEvent({
    name: "botinfoPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith(`${dbcommands.prefixo.prefixo}${dbcommands.botinfo.nome}`)) return;

        await commandPrefixLog(message);

        const args = message.content.split(/\s+/).slice(1);
        const arg = args[0];

        if (!arg) {
            await message.channel.send({
                content: constants.botinfo.description
            });
            return;
        }

        if (arg === "version") {
            await message.channel.send({
                content: `${icon.clipboard} Atualmente estou na versão **${constants.botinfo.version}**`
            });
            return;
        }

        if (arg === "devs") {
            await message.channel.send({
                content: `${icon.user_users} Esses são meus desenvolvedores: **${constants.botinfo.devs}**`
            });
            return;
        }

        if (arg === "base") {
            await message.channel.send({
                content: `${icon.user_users} Eu uso a ${constants.botinfo.base} como base.`
            });
            return;
        }

        if (arg === "show-easteregg") {
            await message.channel.send({
                content: constants.botinfo.easteregg
            });
            return;
        }

        if (arg === "help") {
            await message.channel.send({
                flags: ["IsComponentsV2"],
                components: [botinfoCommandHelpContainer()]
            });
            return;
        }

        await message.channel.send({
            content: `${icon.action_x} Argumento desconhecido. Use \`${dbcommands.prefixo.prefixo}${dbcommands.botinfo.nome} help\`.`
        });
    }
});
