import { createEvent } from "#base";
import { brBuilder } from "@magicyan/discord";
import { commandPrefixLog } from "../../../../../functions/utils/commandslogs.js";
import { createTagDocument } from "../../../../../functions/utils/createTagDocument.js";
import { icon } from "../../../../../functions/utils/emojis.js";

createEvent({
    name: "createTagPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (!message.content.startsWith("!createtag")) return;

        await commandPrefixLog(message);

        const member = await message.guild?.members.fetch(message.author.id);

        if (!member?.roles.cache.has(dbroles.postos_roles.oficiaisSuperioresRoleId)) {
            await message.channel.send({
                content: `${icon.action_x} Você não possui as permissões necessárias para essa ação.`
            });
            return;
        }

        const content = message.content.trim();
        const withoutCommand = content.slice("!createtag".length).trim();

        if (!withoutCommand) {
            await message.channel.send({
                content: `${icon.action_x} Nenhum argumento fornecido.`
            });
            return;
        }

        const [tagName, ...rest] = withoutCommand.split(/\s+/);

        if (tagName === "--help") {
            await message.channel.send({
                content: brBuilder(
                    `${icon.other_terminal} **Comandos do !createtag**:`,
                    "",
                    "\`!createtag <nome> <mensagem>\` → Cria uma nova tag com o nome e mensagem especificados.",
                    "\`!createtag --help\` → Mostra esta ajuda."
                )
            });
            return;
        }

        if (rest.length === 0) {
            await message.channel.send({
                content: `${icon.action_x} É necessário informar a mensagem após o argumento.`
            });
            return;
        }

        const tagMessage = rest.join(" ");

        await createTagDocument(tagName, tagMessage);

        await message.channel.send({
            content: `${icon.action_check} Tag registrada.`
        });
    }
});
