import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import atualizarHandler from "./atualizar.js";
import editarHandler from "./editar.js";
import enviarHandler from "./enviar.js";

export default createCommand({
    name: "botinfo",
    description: "Comandos de Informações do Bot - DTIC.",
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: "atualizar",
            description: "Atualiza com base no banco de dados as informações do bot.",
            type: ApplicationCommandOptionType.Subcommand
        },
        {
            name: "editar",
            description: "Edita as informações do bot no banco de dados.",
            type: ApplicationCommandOptionType.Subcommand,
            options: editarHandler.options as any
        },
        {
            name: "enviar",
            description: "Envia o container com as informações do bot no banco de dados.",
            type: ApplicationCommandOptionType.Subcommand
        }
    ],

    async run(interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === "atualizar") return atualizarHandler.run(interaction);
        if (sub === "editar") return editarHandler.run(interaction);
        if (sub === "enviar") return enviarHandler.run(interaction);
    },

    async autocomplete(interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === "editar") return editarHandler.autocomplete(interaction);
    }
});
