import { createEvent } from "#base";
import { commandPrefixLog } from "../../../../../functions/utils/commandslogs.js";
import { createTagDocument } from "../../../../../functions/utils/createTagDocument.js";
import { icon } from "../../../../../functions/utils/emojis.js";
import { createtagCommandHelpContainer } from "../../../../containers/commands/prefix/private/createtag/help.js";

createEvent({
    name: "createTagPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (
            !message.content.startsWith(`${dbcommands.prefixo.prefixo}${dbcommands.createtag.nome}`) &&
            !(
                Array.isArray(dbcommands.createtag.sinonimo)
                    ? dbcommands.createtag.sinonimo.some(s =>
                        message.content.startsWith(`${dbcommands.prefixo.prefixo}${s}`)
                    )
                    : dbcommands.createtag.sinonimo !== "Nenhum Sinônimo." &&
                    message.content.startsWith(`${dbcommands.prefixo.prefixo}${dbcommands.createtag.sinonimo}`)
            )
        ) return;

        await commandPrefixLog(message);

        const member = await message.guild?.members.fetch(message.author.id);

        if (!member?.roles.cache.has(dbroles.postos_roles.oficiaisSuperioresRoleId)) {
            await message.channel.send({
                content: `${icon.action_x} Você não possui as permissões necessárias para essa ação.`
            });
            return;
        }

        const content = message.content.trim();
        const withoutCommand = content.slice(`${dbcommands.prefixo.prefixo}${dbcommands.createtag.nome}`.length).trim();

        if (!withoutCommand) {
            await message.channel.send({
                content: `${icon.action_x} Nenhum argumento fornecido.`
            });
            return;
        }

        const [tagName, ...rest] = withoutCommand.split(/\s+/);

        if (tagName === "help") {
            await message.channel.send({
                flags: ["IsComponentsV2"],
                components: [createtagCommandHelpContainer()]
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
