import { createEvent } from "#base";
import { db } from "../../../../../database/firestore.js";
import { commandPrefixLog } from "../../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../../functions/utils/emojis.js";

createEvent({
    name: "deleteTagPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith("!deletetag")) return;

        await commandPrefixLog(message);

        const member = await message.guild?.members.fetch(message.author.id)

        if (!member?.roles.cache.has(dbroles.postos_roles.oficiaisSuperioresRoleId)) {
            await message.channel.send({
                content: `${icon.action_x} Você não possui as permissões necessárias para essa ação.`
            });
            return;
        };

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

            await docRef.delete();

            await message.channel.send({
                content: `${icon.action_check} Tag deletada.`
            })

            return;
        }

        await message.channel.send({
            content: `${icon.action_x} Nenhuma tag foi fornecida.`
        })
        return;
    }
});
