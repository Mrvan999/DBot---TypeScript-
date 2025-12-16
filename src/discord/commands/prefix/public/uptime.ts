import { BOT_START_TIME, createEvent } from "#base";
import { brBuilder } from "@magicyan/discord";
import { commandPrefixLog } from "../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { formatUptime } from "../../../../functions/utils/formatUptime.js";

createEvent({
    name: "uptimePrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith("?uptime")) return;

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

        if (arg === "--show-init") {
            const startedAt = new Date(BOT_START_TIME);
            await message.channel.send({
                content: `${icon.clock} Fui iniciado em **${startedAt.toLocaleString("pt-BR")}**`
            });
            return;
        }

        if (arg === "--help") {
            await message.channel.send({
                content: brBuilder(
                    `${icon.other_terminal} **Comandos do ?uptime**:`,
                    "",
                    "`?uptime`             → Veja a quanto tempo o bot está online",
                    "`?uptime --show-init` → Veja a data de inicialização do bot",
                    "`?uptime --help`      → Mostra esta ajuda"
                )
            });
            return;
        }

        await message.channel.send({
            content: `${icon.action_x} Argumento desconhecido. Use \`?uptime --help\`.`
        });
    }
});
