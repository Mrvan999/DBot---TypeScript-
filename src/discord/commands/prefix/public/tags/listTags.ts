import { createEvent } from "#base";
import { brBuilder } from "@magicyan/discord";
import { db } from "../../../../../database/firestore.js";
import { commandPrefixLog } from "../../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { tagsCommandHelpContainer } from "../../../../containers/commands/prefix/public/tags/help.js";

createEvent({
    name: "listTagsPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith(`${dbcommands.prefixo.prefixo}${dbcommands.tags.nome}`)) return;

        await commandPrefixLog(message);

        const args = message.content.trim().split(/\s+/).slice(1);
        const arg = args[0];

        if (arg === "help") {
            await message.channel.send({
                flags: ["IsComponentsV2"],
                components: [tagsCommandHelpContainer()]
            });
            return;
        }

        if (args.length > 0 && arg !== "help") {
            await message.channel.send({
                content: `${icon.action_x} Nenhum argumento é necessário. Use \`${dbcommands.prefixo.prefixo}${dbcommands.tags.nome}\` para listar todas as tags.`
            });
            return;
        }

        const snapshot = await db.collection("tags").get();

        if (snapshot.empty) {
            await message.channel.send({
                content: `${icon.action_x} Não existem tags cadastradas.`
            });
            return;
        }

        const tagNames = snapshot.docs.map(doc => doc.id).join(", ");

        await message.channel.send({
            content: brBuilder(
                `${icon.other_terminal} **Tags disponíveis:**`,
                tagNames
            )
        });
    }
});
