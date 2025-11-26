import { createCommand } from "#base";
import { ApplicationCommandOptionType, ApplicationCommandType } from "discord.js";
import { icon } from "../../../../functions/utils/emojis.js";


const prefixoInfo: Record<string, { modelo: string; opm: string; call: number }> = {
    "M-22000": {
        modelo: "Caminhonete L200 Triton",
        opm: "4º BPM",
        call: 1407933678230700158
    },
    "M-22100": {
        modelo: "Renault Duster",
        opm: "Polícia Civil",
        call: 1407933678230700157
    }
};


createCommand({
    name: "abrir",
    description: "Comandos de cautela",
    type: ApplicationCommandType.ChatInput,
    options: [
        {
            name: "cautela",
            description: "Registrar cautela de viatura",
            type: ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: "militares",
                    description: "Informe os militares que irão utilizar a viatura.",
                    type: ApplicationCommandOptionType.String,
                    required: true
                },
                {
                    name: "prefixo",
                    description: "Informe o prefixo da viatura.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                },
                {
                    name: "motivo",
                    description: "Informe o motivo da cautela.",
                    type: ApplicationCommandOptionType.String,
                    required: true,
                    autocomplete: true
                }
            ]
        }
    ],

    async run(interaction) {
        if (interaction.options.getSubcommand() !== "cautela") return;

        const militares = interaction.options.getString("militares")!;
        const prefixo = interaction.options.getString("prefixo")!;
        const motivo = interaction.options.getString("motivo")!;

        const timestamp = Math.floor(Date.now() / 1000);
        const dataHoraDiscord = `<t:${timestamp}:F>`;

        const info = prefixoInfo[prefixo] || {
            modelo: "Não informado",
            opm: "Não informado",
            call: "Não informado"
        };

        const cautelaChannel = await interaction.guild.channels.fetch(constants.channels.cautelaChannelId);
        if (!cautelaChannel?.isTextBased()) return;


        await interaction.reply({
            flags: ["Ephemeral"],
            content: `${icon.action_check} Cautela da viatura ${prefixo} registrada com sucesso!.`
        });
    },

    async autocomplete(interaction) {
        const focused = interaction.options.getFocused(true);

        if (focused.name === "prefixo") {
            const sugestões = Object.keys(prefixoInfo)
                .filter(s => s.toLowerCase().includes(focused.value.toLowerCase()));

            return interaction.respond(
                sugestões.map(s => ({ name: s, value: s }))
            );
        }
    }
});
