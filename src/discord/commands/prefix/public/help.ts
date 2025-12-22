import { createEvent } from "#base";
import { commandPrefixLog } from "../../../../functions/utils/commandslogs.js";
import { icon } from "../../../../functions/utils/emojis.js";
import { helpCommandContainer } from "../../../containers/commands/prefix/public/help/help.js";

createEvent({
    name: "helpPrefixCommand",
    event: "messageCreate",
    async run(message) {
        if (
            !message.content.startsWith(`${dbcommands.prefixo.prefixo}${dbcommands.help.nome}`) &&
            !(
                Array.isArray(dbcommands.help.sinonimo)
                    ? dbcommands.help.sinonimo.some(s =>
                        message.content.startsWith(`${dbcommands.prefixo.prefixo}${s}`)
                    )
                    : dbcommands.help.sinonimo !== "Nenhum Sinônimo." &&
                    message.content.startsWith(`${dbcommands.prefixo.prefixo}${dbcommands.help.sinonimo}`)
            )
        ) return;

        await commandPrefixLog(message);

        const args = message.content.split(/\s+/).slice(1);
        const arg = args[0];

        if (!arg || arg === "help") {
            const commandsList = Object.values(dbcommands)
                .map(command => `\`${dbcommands.prefixo.prefixo }${command.nome}\` - ${command.descricao}`)
                .join("\n");

            await message.channel.send({
                flags: ["IsComponentsV2"],
                components: [helpCommandContainer(commandsList)]
            });
            return;
        }

        await message.channel.send({
            content: `${icon.action_x} Argumento desconhecido. Use \`${dbcommands.prefixo.prefixo}${dbcommands.help.nome}\`.`
        });
    }
});
