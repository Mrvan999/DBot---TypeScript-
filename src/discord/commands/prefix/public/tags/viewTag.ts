import { createEvent } from "#base";
import { db } from "../../../../../database/firestore.js";
import { commandPrefixLog } from "../../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../../functions/utils/emojis.js";

createEvent({
    name: "viewTagPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith("!tag")) return;

        await commandPrefixLog(message);

        const args = message.content
            .trim()
            .split(/\s+/)
            .slice(1);

        if (args.length > 1) {
            await message.channel.send({
                content: `${icon.action_x} Apenas um argumento é permitido.`
            })
            return;
        }

        if (args.length === 1) {
            const tag = args[0];
            const docRef = db.collection("tags").doc(tag);
            const doc = await docRef.get();

            if (!doc.exists) {
                await message.channel.send({
                    content: `${icon.action_x} Nenhuma tag encontrada com o nome "${tag}".`
                })
                return;
            }

            const data = doc.data();

            if (!data) {
                await message.channel.send({
                    content: `${icon.action_x} Os dados da tag estão vazios`
                })
                return;
            }

            await message.channel.send({
                content: data.message
            })

            return;
        }

        await message.channel.send({
            content: `${icon.action_x} Nenhuma tag foi fornecida.`
        })
        return;
    }
});
