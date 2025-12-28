import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import consultarHandler from "./consultar.js";
import editarHandler from "./editar.js";
import criarHandler from "./criar.js";
import deletarHandler from "./deletar.js";

export default createCommand({
    name: "registro",
    description: "Comandos de Registro - DP",
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: "consultar",
            description: "Consulta um registro policial-militar.",
            type: ApplicationCommandOptionType.Subcommand,
            options: consultarHandler.options as any
        },
        {
            name: "editar",
            description: "Edita um registro policial-militar.",
            type: ApplicationCommandOptionType.Subcommand,
            options: editarHandler.options as any
        },
        {
            name: "criar",
            description: "Cria um registro policial-militar.",
            type: ApplicationCommandOptionType.Subcommand,
            options: criarHandler.options as any
        },
        {
            name: "deletar",
            description: "Deleta um registro policial-militar.",
            type: ApplicationCommandOptionType.Subcommand,
            options: deletarHandler.options as any
        }
    ],

    async run(interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === "consultar") return consultarHandler.run(interaction);
        if (sub === "editar") return editarHandler.run(interaction);
        if (sub === "criar") return criarHandler.run(interaction);
        if (sub === "deletar") return deletarHandler.run(interaction);
    },

    async autocomplete(interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === "consultar") return consultarHandler.autocomplete(interaction);
        if (sub === "editar") return editarHandler.autocomplete(interaction);
        if (sub === "criar") return criarHandler.autocomplete(interaction);
        if (sub === "deletar") return deletarHandler.autocomplete(interaction);
    }
});
