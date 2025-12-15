import { BOT_START_TIME, createEvent } from "#base";
import { commandPrefixLog } from "../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { formatUptime } from "../../../../functions/utils/formatUptime.js";

createEvent({
    name: "uptimePrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith("!uptime")) return;

        await commandPrefixLog(message);

        const args = message.content.split(/\s+/).slice(1);
        
        if (args.includes("--show-init")) {
            const startedAt = new Date(BOT_START_TIME);

            await message.channel.send({
                content: `${icon.clock} Fui iniciado em **${startedAt.toLocaleString("pt-BR")}**`
            });
            return;
        }

        const uptimeMs = Date.now() - BOT_START_TIME;
        const uptimeFormatted = formatUptime(uptimeMs);

        await message.channel.send({
            content: `${icon.clock} Estou online a ${uptimeFormatted}.`
        });
    }
});
