import { BOT_START_TIME, createEvent } from "#base";
import { commandPrefixLog } from "../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { formatUptime } from "../../../../functions/utils/formatUptime.js";
import { uptimeCommandHelpContainer } from "../../../containers/commands/prefix/public/uptime/help.js";

createEvent({
    name: "uptimePrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (
            !message.content.startsWith(`${dbcommands.prefixo.prefixo}${dbcommands.uptime.nome}`) &&
            !(
                Array.isArray(dbcommands.uptime.sinonimo)
                    ? dbcommands.uptime.sinonimo.some(s =>
                        message.content.startsWith(`${dbcommands.prefixo.prefixo}${s}`)
                    )
                    : dbcommands.uptime.sinonimo !== "Nenhum Sinônimo." &&
                    message.content.startsWith(`${dbcommands.prefixo.prefixo}${dbcommands.uptime.sinonimo}`)
            )
        ) return;

        await commandPrefixLog(message);

        const args = message.content.split(/\s+/).slice(1);
        const arg = args[0];

        if (!arg) {
            const uptimeMs = Date.now() - BOT_START_TIME;
            const uptimeFormatted = formatUptime(uptimeMs);

            await message.channel.send({
                content: `${icon.clock} Estou online a ${uptimeFormatted}.`
            });
            return;
        }

        if (arg === "show-init") {
            const startedAt = new Date(BOT_START_TIME);
            await message.channel.send({
                content: `${icon.clock} Fui iniciado em **${startedAt.toLocaleString("pt-BR")}**`
            });
            return;
        }

        if (arg === "help") {
            await message.channel.send({
                flags: ["IsComponentsV2"],
                components: [uptimeCommandHelpContainer()]
            });
            return;
        }

        await message.channel.send({
            content: `${icon.action_x} Argumento desconhecido. Use \`${dbcommands.prefixo.prefixo}${dbcommands.uptime.nome} help\`.`
        });
    }
});
