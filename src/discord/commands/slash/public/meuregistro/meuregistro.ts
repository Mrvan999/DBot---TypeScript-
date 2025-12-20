import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import consultarHandler from "./consultar.js";

export default createCommand({
    name: "meuregistro",
    description: "Comandos de Meu Registro - Público",
    type: ApplicationCommandType.ChatInput,

    options: [
        {
            name: "consultar",
            description: "Consulta seu registro policial-militar.",
            type: ApplicationCommandOptionType.Subcommand,
            options: consultarHandler.options as any
        }
    ],

    async run(interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === "consultar") return consultarHandler.run(interaction);
    },

    async autocomplete(interaction) {
        const sub = interaction.options.getSubcommand();

        if (sub === "consultar") return consultarHandler.autocomplete(interaction);
    }
});
